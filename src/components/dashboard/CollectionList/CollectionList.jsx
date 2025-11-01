import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Importado o Link
import { List, ChevronRight } from "lucide-react";
import { cx } from "../../../utils/formatters";

// Paleta de cores para os ícones de tipo de mídia
const palette = {
  filme: "bg-indigo-500",
  livro: "bg-emerald-500",
  jogo: "bg-fuchsia-500",
  album: "bg-amber-500",
};

// MODIFICAÇÃO: Adicionada a prop 'handle'
export default function CollectionList({ collections, t, handle }) {
  return (
    <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 min-h-[256px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <List className="w-4 h-4 text-neutral-500" />
          {/* MODIFICAÇÃO: Título traduzido */}
          {t("section.collections")}
        </h3>
        <button className="h-7 px-2 inline-flex items-center justify-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs leading-none font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
          {/* MODIFICAÇÃO: Botão traduzido */}
          {t("action.see_all")}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {(collections || []).map((collection) => (
          // MODIFICAÇÃO: O <motion.button> foi substituído por um <Link>
          // e o conteúdo interno por uma <motion.div> para manter a semântica e a animação.
          <Link
            to={`/profile/${handle}/list/${collection.id}`}
            key={collection.id}
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="w-full text-left p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800/60 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                  {collection.title}
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                {collection.description}
              </p>

              {/* Pilha de avatares de mídia */}
              <div className="flex -space-x-1.5 mt-2">
                {(collection.items || []).slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    title={item.title}
                    className={cx(
                      "w-5 h-5 rounded-full ring-2 ring-white dark:ring-neutral-900",
                      palette[item.type] || "bg-neutral-400",
                    )}
                  />
                ))}
                {(collection.items || []).length > 5 && (
                  <div className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-neutral-900 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[9px] text-neutral-600 dark:text-neutral-200">
                    +{(collection.items || []).length - 5}
                  </div>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
