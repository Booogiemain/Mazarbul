import React, { createContext, useContext, useState, useMemo } from "react";
// Importamos os dados estáticos *originais*
import {
  staticUserDatabase,
  staticMediaDatabase,
  staticClubsDatabase, // Importando clubes estáticos
} from "../hooks/useUserProfileData.js";

// --- Definição do Contexto ---
const UserDatabaseContext = createContext(null);

// --- O Provedor (Componente que "abraça" a aplicação) ---
export function UserDatabaseProvider({ children }) {
  // Carregamos os dados estáticos para dentro de um estado
  // Esta é a nossa "memória" de sessão
  const [db, setDb] = useState(staticUserDatabase);
  const mediaDatabase = staticMediaDatabase; // Mídias são sempre estáticas

  // Estado para os Clubes (Inicia com os estáticos, mas permite adicionar novos)
  const [clubsDb, setClubsDb] = useState(staticClubsDatabase);

  // --- Funções para Modificar a "Memória" ---

  // LÓGICA DE FAVORITOS (usada pelo Coração e pela FavoritesPage)
  const toggleFavorite = (userId, mediaData) => {
    if (!mediaData) return;

    setDb((prevDb) => {
      const userHandle = userId.replace("@", "");
      const currentUser = prevDb[userHandle];
      if (!currentUser) return prevDb;

      const currentFavorites = currentUser.favorites || [];
      const isFavorited = currentFavorites.some(
        (fav) => fav.id === mediaData.id,
      );

      let newFavorites;

      if (isFavorited) {
        // Remover
        newFavorites = currentFavorites.filter(
          (fav) => fav.id !== mediaData.id,
        );
      } else {
        // Adicionar
        // Precisamos criar o objeto de favorito com a estrutura correta
        const newFavoriteItem = {
          id: mediaData.id,
          type: mediaData.type,
          title: mediaData.title,
          year: mediaData.details?.Ano || mediaData.year,
          score: mediaData.communityAverage || mediaData.score,
          tags: mediaData.details?.Gênero || mediaData.tags,
        };
        newFavorites = [...currentFavorites, newFavoriteItem];
      }

      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          favorites: newFavorites,
        },
      };
    });
  };

  // --- LÓGICA DE LISTAS (Collections) ---

  const createCollection = (userId, title, description) => {
    const userHandle = userId.replace("@", "");
    const newCollection = {
      id: `col_${Date.now()}`, // ID único simples
      title,
      description,
      items: [],
    };

    setDb((prevDb) => {
      const currentUser = prevDb[userHandle];
      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          collections: [...(currentUser.collections || []), newCollection],
        },
      };
    });
    return newCollection.id; // Retorna o ID da nova lista
  };

  const updateCollectionDetails = (
    userId,
    collectionId,
    newTitle,
    newDescription,
  ) => {
    const userHandle = userId.replace("@", "");
    setDb((prevDb) => {
      const currentUser = prevDb[userHandle];
      const newCollections = currentUser.collections.map((col) =>
        col.id === collectionId
          ? { ...col, title: newTitle, description: newDescription }
          : col,
      );
      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          collections: newCollections,
        },
      };
    });
  };

  const addMediaToCollection = (userId, collectionId, mediaId) => {
    const userHandle = userId.replace("@", "");
    const itemData = mediaDatabase[mediaId];
    if (!itemData) return; // Mídia não encontrada

    // Criamos o item *parcial* que vai para o array 'items' da coleção
    const newCollectionItem = {
      id: itemData.id,
      type: itemData.type,
      title: itemData.title.PT || "Título Desconhecido", // Padrão PT
    };

    setDb((prevDb) => {
      const currentUser = prevDb[userHandle];
      if (!currentUser) return prevDb;

      // 1. Adicionar à lista
      const newCollections = currentUser.collections.map((col) => {
        if (col.id === collectionId) {
          // Evita adicionar duplicados
          if (col.items.some((item) => item.id === mediaId)) return col;
          return { ...col, items: [...col.items, newCollectionItem] };
        }
        return col;
      });

      // 2. Garantir que o item também está nos favoritos (para "hidratação")
      const isFavorited = currentUser.favorites.some(
        (fav) => fav.id === mediaId,
      );
      let newFavorites = currentUser.favorites;
      if (!isFavorited) {
        const newFavoriteItem = {
          id: itemData.id,
          type: itemData.type,
          title: itemData.title,
          year: itemData.details?.Ano,
          score: itemData.communityAverage,
          tags: itemData.details?.Gênero,
        };
        newFavorites = [...currentUser.favorites, newFavoriteItem];
      }

      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          collections: newCollections,
          favorites: newFavorites,
        },
      };
    });
  };

  const removeMediaFromCollection = (userId, collectionId, mediaId) => {
    const userHandle = userId.replace("@", "");
    setDb((prevDb) => {
      const currentUser = prevDb[userHandle];
      const newCollections = currentUser.collections.map((col) => {
        if (col.id === collectionId) {
          const newItems = col.items.filter((item) => item.id !== mediaId);
          return { ...col, items: newItems };
        }
        return col;
      });
      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          collections: newCollections,
        },
      };
    });
  };

  const deleteCollection = (userId, collectionId) => {
    const userHandle = userId.replace("@", "");
    setDb((prevDb) => {
      const currentUser = prevDb[userHandle];
      const newCollections = currentUser.collections.filter(
        (col) => col.id !== collectionId,
      );
      return {
        ...prevDb,
        [userHandle]: {
          ...currentUser,
          collections: newCollections,
        },
      };
    });
  };

  // --- LÓGICA DE CLUBES (NOVO) ---
  const createClub = (ownerHandle, clubData) => {
    const newClub = {
      id: `c_${Date.now()}`, // ID único
      ownerHandle: ownerHandle.replace("@", ""), // Garante handle limpo
      membersCount: 1, // Começa com o dono
      ...clubData,
      activeWorks: [], // Começa vazio
      topics: [], // Começa vazio
      members: [
        {
          name: "Fundador", // (Idealmente pegaria do perfil do user, mas simplificado aqui)
          handle: ownerHandle,
          role: "owner",
          avatar: "F",
        },
      ],
    };

    setClubsDb((prevClubs) => [...prevClubs, newClub]);
    return newClub.id; // Retorna ID para redirecionamento
  };

  // Disponibiliza a "memória" e as funções para a aplicação
  const value = useMemo(
    () => ({
      db,
      mediaDatabase,
      clubsDb, // NOVO: Estado dinâmico de clubes
      toggleFavorite,
      createCollection,
      updateCollectionDetails,
      addMediaToCollection,
      removeMediaFromCollection,
      deleteCollection,
      createClub, // NOVO: Função para criar clube
    }),
    [db, clubsDb],
  );

  return (
    <UserDatabaseContext.Provider value={value}>
      {children}
    </UserDatabaseContext.Provider>
  );
}

// --- Hook customizado para usar o contexto facilmente ---
export function useUserDatabase() {
  const context = useContext(UserDatabaseContext);
  if (!context) {
    throw new Error(
      "useUserDatabase deve ser usado dentro de um UserDatabaseProvider",
    );
  }
  return context;
}
