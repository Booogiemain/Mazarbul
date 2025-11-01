import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importando componentes, hooks e utilitários
import { cx } from "../../utils/formatters";
import { useUserProfileData } from "../../hooks/useUserProfileData.js";
import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import MediaCard from "../../components/ui/MediaCard/MediaCard.jsx";

// ==========================
// MOCK DE AUTENTICAÇÃO
// O utilizador logado está definido como 'alexl'.
const LOGGED_IN_USER_HANDLE = "alexl";
// ==========================

// ==========================
// Componente da Página de Favoritos
// ==========================
export default function FavoritesPage({ theme, setTheme, lang, setLang, t }) {
  const { handle } = useParams();
  const navigate = useNavigate();

  const { profile, favorites } = useUserProfileData(handle);

  const [localFavorites, setLocalFavorites] = useState(favorites || []);

  // Determina se o utilizador logado é o dono do perfil que está a ser visto.
  const isOwner = profile?.handle === `@${LOGGED_IN_USER_HANDLE}`;

  useEffect(() => {
    setLocalFavorites(favorites || []);
  }, [favorites]);

  const handleRemoveFavorite = (mediaIdToRemove) => {
    // Ação de remover só é permitida se o utilizador for o dono.
    if (!isOwner) return;

    setLocalFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== mediaIdToRemove),
    );
  };

  if (!profile) {
    return <div className="text-center py-20">Utilizador não encontrado.</div>;
  }

  // Lógica de Título Dinâmico
  const pageTitle = isOwner ? (
    t("favorites.my_title") // "Meus favoritos"
  ) : (
    <>
      {t("favorites.title_prefix")} {/* "Favoritos de" */}
      <span>{profile.name}</span> {/* "Marina Silva" */}
    </>
  );

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
          {/* CORREÇÃO: Título agora usa a lógica condicional */}
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            {pageTitle}
          </h1>

          {localFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {localFavorites.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/media/${item.id}`)}
                  onRemove={isOwner ? handleRemoveFavorite : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <p className="text-neutral-500 dark:text-neutral-400">
                Este utilizador ainda não adicionou favoritos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
