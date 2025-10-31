import React, { useEffect, useRef, useState } from "react";

// Importando componentes, hooks e utilitários
import { cx } from "../../utils/formatters";
import { useUserProfileData } from "../../hooks/useUserProfileData.js";
import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import ProfileHeader from "../../components/user/ProfileHeader/ProfileHeader.jsx";
import FavoritesSection from "../../components/user/FavoritesSection/FavoritesSection.jsx";
import BadgesRibbon from "../../components/user/BadgesRibbon/BadgesRibbon.jsx";
import ReviewsPanel from "../../components/user/ReviewsPanel/ReviewsPanel.jsx";
import ActivityCalendar from "../../components/dashboard/ActivityCalendar/ActivityCalendar.jsx";
import CollectionList from "../../components/dashboard/CollectionList/CollectionList.jsx";

// ==========================
// Componente da Página do Dashboard do USUÁRIO LOGADO
// ==========================
export default function DashboardPage({ theme, setTheme, lang, setLang, t }) {
  // Pega os dados do usuário logado (Alex) por padrão
  const { profile, badges, favorites, reviews, dynamicTags, collections } =
    useUserProfileData();

  // Lógica de sincronização de altura, baseada na coluna da direita
  const rightColumnRef = useRef(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (rightColumnRef.current) {
        setLeftColumnHeight(rightColumnRef.current.offsetHeight);
      }
    };

    const timer = setTimeout(measure, 100);

    const ro = new ResizeObserver(measure);
    if (rightColumnRef.current) {
      ro.observe(rightColumnRef.current);
    }
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      if (rightColumnRef.current) {
        ro.unobserve(rightColumnRef.current);
      }
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

        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col gap-8">
          <ProfileHeader profile={profile} tags={dynamicTags} t={t} />
          <BadgesRibbon badges={badges} t={t} />
          {/* MODIFICAÇÃO: Passando o 'handle' do perfil para a seção de favoritos */}
          <FavoritesSection items={favorites} t={t} handle={profile.handle} />

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <ReviewsPanel
                reviews={reviews}
                t={t}
                containerHeight={leftColumnHeight}
              />
            </div>
            <div
              ref={rightColumnRef}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              {/* ===== A ÚNICA ALTERAÇÃO ESTÁ AQUI ===== */}
              {/* Este 'div' com margem no topo empurra o calendário para baixo,
                  alinhando o topo do card do calendário com o topo do card de reviews.
                  A margem 'mt-9' (2.25rem) corresponde exatamente à altura do
                  título "Reviews recentes" mais sua margem inferior. */}
              <div className="mt-9">
                <ActivityCalendar reviews={reviews} t={t} />
              </div>

              <CollectionList collections={collections} t={t} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
