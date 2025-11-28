import React from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { cx } from "../../../utils/formatters";
import ExpandButton from "../../ui/ExpandButton/ExpandButton.jsx"; // Importando o novo botão

// Paleta de cores para os ícones de tipo de mídia
const palette = {
  filme: "bg-indigo-500",
  livro: "bg-emerald-500",
  jogo: "bg-fuchsia-500",
  album: "bg-amber-500",
};

export default function CollectionList({ collections, t }) {
  return (
    <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 min-h-[256px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <List className="w-4 h-4 text-neutral-500" />
          {t("section.collections")}
        </h3>

        {/* Botão padronizado (+) para ir à gestão de listas */}
        <ExpandButton to="/dashboard/lists" ariaLabel={t("action.manage")} />
      </div>

      <div className="flex flex-col gap-3">
        {(collections || []).map((collection) => (
          <motion.div
            key={collection.id}
            className="w-full text-left p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                {collection.title}
              </span>
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
        ))}
      </div>
    </div>
  );
}
