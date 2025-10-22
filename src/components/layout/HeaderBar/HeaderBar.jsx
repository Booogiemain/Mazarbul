import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, User, Settings, Search as SearchIcon } from "lucide-react";

function HeaderBar({ theme, setTheme, lang, setLang, t }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function handleSearchSubmit(q) {
    alert(`Buscar por: ${q}`);
    setSearchOpen(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-20 bg-transparent">
      <div className="max-w-5xl mx-auto h-full px-4 flex items-center">
        <div className="w-full">
          <div className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur shadow-sm">
            {!searchOpen ? (
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 py-2">
                <button
                  aria-label={t("a11y.open_search")}
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center">
                  <Link to="/" className="font-semibold">
                    Mazarbul
                  </Link>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    aria-label="Alternar tema"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5" />
                    ) : (
                      <Sun className="w-5 h-5" />
                    )}
                  </button>
                  <div className="relative">
                    <button
                      aria-label="Language"
                      onClick={() => setLangOpen((v) => !v)}
                      className="h-9 px-3 inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm leading-none font-medium"
                    >
                      <span className="leading-none">{lang}</span>
                    </button>
                    {langOpen && (
                      <div className="absolute right-0 mt-1 w-16 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-md overflow-hidden">
                        {["PT", "EN", "ES"]
                          .filter((c) => c !== lang)
                          .map((c) => (
                            <button
                              key={c}
                              onClick={() => {
                                setLang(c);
                                setLangOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                            >
                              {c}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  <button
                    aria-label="Configurações"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  {/* A MUDANÇA ESTÁ AQUI: O link agora aponta para /dashboard */}
                  <Link
                    to="/dashboard"
                    aria-label="Meu perfil"
                    className="h-9 w-9 inline-flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchSubmit(query);
                }}
                className="flex items-center gap-2 px-3 py-2"
              >
                <SearchIcon className="w-5 h-5 text-neutral-500" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  className="flex-1 bg-transparent outline-none placeholder:text-neutral-400 text-sm py-2"
                  placeholder={t("search.placeholder")}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
