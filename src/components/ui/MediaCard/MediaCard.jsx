import React from "react";
import { motion } from "framer-motion";
import MediaBadge from "../MediaBadge/MediaBadge";
import RatingStars from "../RatingStars/RatingStars";
import {
  cx,
  clamp10,
  roundToQuarter,
  formatScore,
} from "../../../utils/formatters";

// Paleta de cores para o gradiente de fundo de cada tipo de mídia
const palette = {
  filme: "from-indigo-500/25 via-indigo-500/10 to-transparent",
  livro: "from-emerald-500/25 via-emerald-500/10 to-transparent",
  jogo: "from-fuchsia-500/25 via-fuchsia-500/10 to-transparent",
  album: "from-amber-500/25 via-amber-500/10 to-transparent",
};

// Componente para exibir um card de mídia
function MediaCard({ item, onClick, wide = false, badgeLabel }) {
  const grad = palette[item.type] || palette.filme;

  // ***** INÍCIO DA CORREÇÃO *****
  // Verificamos se 'item.title' é um objeto. Se for, usamos a chave 'PT'.
  // Se for uma string simples, usamos ela mesma. Isso evita o erro.
  const displayTitle =
    typeof item.title === "object" && item.title !== null
      ? item.title.PT
      : item.title;
  // ***** FIM DA CORREÇÃO *****

  return (
    <motion.button
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cx(
        "group snap-start relative overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-neutral-900 text-left transition-transform duration-200 hover:z-10",
        wide ? "w-full" : "w-56 shrink-0", // A classe 'w-full' é aplicada se 'wide' for true
        "h-64 flex flex-col",
      )}
    >
      {/* Gradiente de fundo */}
      <div className={cx("h-32 w-full bg-gradient-to-br", grad)} />

      {/* Conteúdo do card */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <MediaBadge type={item.type} label={badgeLabel} />
          <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
            {item.year}
          </span>
        </div>
        <div className="font-medium leading-snug text-neutral-800 dark:text-neutral-100 line-clamp-2 min-h-[2.6em]">
          {/* A variável 'displayTitle' é usada aqui no lugar de 'item.title' */}
          {displayTitle}
        </div>
        <div className="mt-auto flex items-center gap-2 text-sm">
          <RatingStars score={item.score} />
          <span className="text-xs text-neutral-500">
            {formatScore(roundToQuarter(clamp10(item.score)))}
          </span>
        </div>
      </div>

      {/* Efeito de sombra sutil na base do card */}
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5" />
    </motion.button>
  );
}

export default MediaCard;
