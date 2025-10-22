import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Importando utilitários e componentes
import { cx } from "../../utils/formatters";
import { useUserProfileData } from "../../hooks/useUserProfileData.js";
import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import ProfileHeader from "../../components/user/ProfileHeader/ProfileHeader.jsx";
import BadgesRibbon from "../../components/user/BadgesRibbon/BadgesRibbon.jsx";
import FavoritesSection from "../../components/user/FavoritesSection/FavoritesSection.jsx";
import ReviewsPanel from "../../components/user/ReviewsPanel/ReviewsPanel.jsx";

// ==========================
// Componente da Página de Perfil VISITADO
// ==========================
export default function ProfilePage({ theme, setTheme, lang, setLang, t }) {
  const { handle } = useParams();

  // AQUI GARANTIMOS QUE SEMPRE BUSCAMOS O USUÁRIO DA URL
  const { profile, badges, favorites, reviews, dynamicTags } =
    useUserProfileData(handle || "maris"); // Usa 'maris' como fallback para garantir que não mostre Alex

  const leftRef = useRef(null);
  const [containerH, setContainerH] = useState(0);
  useEffect(() => {
    const measure = () => {
      const rect = leftRef.current?.getBoundingClientRect();
      if (rect) setContainerH(rect.height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (leftRef.current) ro.observe(leftRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

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
          <ProfileHeader profile={profile} tags={dynamicTags} t={t} />
          <div className="h-8" />
          <BadgesRibbon badges={badges} t={t} />
          <div className="h-8" />

          {/* LAYOUT DE 2 COLUNAS RESTAURADO */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start min-h-0">
            <div ref={leftRef} className="lg:col-span-7 min-h-0">
              <FavoritesSection items={favorites} t={t} />
            </div>
            <div className="lg:col-span-5 min-h-0">
              <ReviewsPanel
                reviews={reviews}
                t={t}
                containerHeight={containerH}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
