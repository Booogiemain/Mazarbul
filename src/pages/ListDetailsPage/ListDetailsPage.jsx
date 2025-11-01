import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importando componentes, hooks e utilitários
import { cx } from "../../utils/formatters";
import { useUserProfileData } from "../../hooks/useUserProfileData.js";
import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import MediaCard from "../../components/ui/MediaCard/MediaCard.jsx";
import { List } from "lucide-react";

/**
 * Hook customizado para buscar os detalhes de uma coleção específica.
 * Ele encontra a coleção e depois "hidrata" os itens (que são parciais)
 * com os dados completos encontrados na lista de favoritos do usuário.
 */
function useCollectionDetails(handle, collectionId) {
  // Puxa todos os dados do usuário (incluindo 'favorites' que tem os dados completos)
  const { profile, collections, favorites } = useUserProfileData(handle);

  if (!profile || !collections || !favorites) {
    return { profile: null, collection: null, fullItems: [] };
  }

  // 1. Encontrar a coleção pelo ID
  const collection = collections.find((c) => c.id === collectionId);

  if (!collection) {
    return { profile, collection: null, fullItems: [] };
  }

  // 2. "Hidratar" os itens da coleção com os detalhes completos
  const fullItems = collection.items
    .map((item) => {
      // Encontrar o item correspondente na lista de favoritos
      // Esta é a etapa crucial que nos dá os dados completos (score, year, etc.)
      return favorites.find((fav) => fav.id === item.id);
    })
    .filter(Boolean); // Remover quaisquer itens não encontrados

  return { profile, collection, fullItems };
}

// ==========================
// Componente da Página de Detalhes da Lista
// ==========================
export default function ListDetailsPage({ theme, setTheme, lang, setLang, t }) {
  const { handle, collectionId } = useParams();
  const navigate = useNavigate();

  const { profile, collection, fullItems } = useCollectionDetails(
    handle,
    collectionId,
  );

  if (!profile || !collection) {
    return (
      <div className="text-center py-20">
        Lista ou utilizador não encontrado.
      </div>
    );
  }

  return (
    <div className={cx(theme === "dark" ? "dark" : "", "font-sans")}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <HeaderBar
          theme={theme}
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
          t={t}
        />

        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-8">
          {/* Cabeçalho da Lista */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              {collection.title}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              {collection.description}
            </p>
            {/* MODIFICAÇÃO: A linha "Lista de..." foi removida. */}
          </div>

          {/* Grelha de Itens da Lista */}
          {fullItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {fullItems.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/media/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <p className="text-neutral-500 dark:text-neutral-400">
                {t("list.empty_state")}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
