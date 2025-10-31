import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Importando componentes e utilitários
import { getMediaDetails } from "../../hooks/useUserProfileData.js";
import { cx } from "../../utils/formatters";
import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import TechnicalDetails from "../../components/media/TechnicalDetails/TechnicalDetails.jsx";
import UserReviewEditor from "../../components/media/UserReviewEditor/UserReviewEditor.jsx";
import CommunityReviewsFeed from "../../components/media/CommunityReviewsFeed/CommunityReviewsFeed.jsx";

// ==========================
// Componente da Página de Detalhes da Mídia
// ==========================
export default function MediaDetailsPage({
  theme,
  setTheme,
  lang,
  setLang,
  t,
}) {
  const { mediaId } = useParams();
  const [mediaData, setMediaData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const data = getMediaDetails(mediaId);
    setMediaData(data);
  }, [mediaId]);

  if (!mediaData) {
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
          <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
            <p>Carregando...</p>
          </main>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const langKey = lang.toUpperCase();
  const titleText =
    mediaData.title && mediaData.title[langKey]
      ? mediaData.title[langKey]
      : typeof mediaData.title === "object"
        ? mediaData.title.PT
        : mediaData.title;
  const sinopseText =
    mediaData.sinopse && mediaData.sinopse[langKey]
      ? mediaData.sinopse[langKey]
      : typeof mediaData.sinopse === "object"
        ? mediaData.sinopse.PT
        : mediaData.sinopse;

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

        <main className="max-w-5xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-8">
          <section className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <img
              src={mediaData.backdropUrl}
              alt=""
              className="absolute w-full h-full object-cover object-center filter blur-lg scale-110"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-48 md:w-1/4 flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={mediaData.posterUrl}
                  alt={`Pôster de ${titleText}`}
                  className="w-full h-auto rounded-lg shadow-lg border-2 border-white/10"
                />
              </div>
              <div className="flex-1 text-white pt-0 md:pt-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {titleText}
                </h1>
                <p className="text-lg text-neutral-300 mt-1">
                  {mediaData.details?.Ano || ""}
                </p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  onClick={handleFavoriteClick}
                  className="mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm inline-flex"
                  aria-label="Adicionar aos favoritos"
                >
                  <Heart
                    className={cx(
                      "w-6 h-6 transition-colors",
                      isFavorited ? "text-red-500 fill-current" : "text-white",
                    )}
                  />
                </motion.button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {t("section.synopsis")}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {sinopseText}
                </p>
              </div>
              {mediaData.details && (
                <TechnicalDetails
                  details={mediaData.details}
                  type={mediaData.type}
                  t={t}
                  lang={lang}
                />
              )}
            </div>
            <div className="lg:col-span-5">
              {/* --- ALTERAÇÃO AQUI: Removida a condição para sempre mostrar a review do usuário --- */}
              <UserReviewEditor
                communityAverage={mediaData.communityAverage}
                t={t}
              />
            </div>
          </section>

          {/* --- ALTERAÇÃO AQUI: Removida a condição para sempre mostrar a seção de reviews da comunidade --- */}
          <CommunityReviewsFeed
            reviews={mediaData.communityReviews || []}
            t={t}
          />
        </main>
      </div>
    </div>
  );
}
