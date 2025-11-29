import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cx } from "../../utils/formatters";
import { useUserProfileData } from "../../hooks/useUserProfileData.js";

import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import ClubCard from "../../components/club/ClubCard/ClubCard.jsx";

export default function ClubsDiscoveryPage({
  theme,
  setTheme,
  lang,
  setLang,
  t,
}) {
  const { clubs } = useUserProfileData();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredClubs = useMemo(() => {
    if (!clubs) return [];

    return clubs.filter((club) => {
      // 1. Filtro de Texto
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Filtro de Categoria (Tags)
      let matchesCategory = true;
      if (activeFilter === "reading") {
        matchesCategory = club.tags.includes("tag.literatura");
      } else if (activeFilter === "cinema") {
        matchesCategory = club.tags.includes("tag.cinema");
      } else if (activeFilter === "gaming") {
        matchesCategory = club.tags.includes("tag.jogos");
      } else if (activeFilter === "music") {
        // Filtro de música adicionado
        matchesCategory = club.tags.includes("tag.musica");
      }

      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchQuery, activeFilter]);

  const renderFilters = () => {
    const filters = [
      { id: "all", label: t("clubs.filter_all") },
      { id: "reading", label: t("clubs.filter_reading") },
      { id: "cinema", label: t("clubs.filter_cinema") },
      { id: "gaming", label: t("clubs.filter_gaming") },
      { id: "music", label: t("clubs.filter_music") }, // Botão novo
    ];

    return (
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              activeFilter === f.id
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={cx(theme === "dark" ? "dark" : "", "font-sans")}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300">
        <HeaderBar
          theme={theme}
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
          t={t}
        />

        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                {t("clubs.title")}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xl">
                {t("clubs.subtitle")}
              </p>
            </div>
          </div>

          <div className="sticky top-20 z-30 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md py-4 mb-6 border-b border-neutral-200/50 dark:border-neutral-800/50 -mx-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-indigo-500 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("clubs.search_placeholder")}
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {renderFilters()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} t={t} />
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t("list.no_results")}
              </h3>
              <p className="text-neutral-500 mt-2">
                Tente buscar por outro termo ou mude o filtro.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
