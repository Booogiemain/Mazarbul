import React from "react";
import MediaBadge from "../../ui/MediaBadge/MediaBadge";
import RatingStars from "../../ui/RatingStars/RatingStars";
import {
  cx,
  clamp10,
  roundToQuarter,
  formatScore,
} from "../../../utils/formatters";

// Paleta de cores para o gradiente da "capa" de cada tipo de mídia.
const palette = {
  filme: "from-indigo-500/25 via-indigo-500/10 to-transparent",
  livro: "from-emerald-500/25 via-emerald-500/10 to-transparent",
  jogo: "from-fuchsia-500/25 via-fuchsia-500/10 to-transparent",
  album: "from-amber-500/25 via-amber-500/10 to-transparent",
};

/**
 * Componente para exibir um card de review individual.
 * Este componente foi extraído do ReviewsPanel para ser reutilizável.
 */
export default function ReviewCard({ review, t }) {
  if (!review) {
    return null;
  }

  return (
    // MODIFICAÇÃO: Adicionado 'font-sans' para consistência da fonte
    <article className={cx("p-4", "font-sans")}>
      <div className="grid grid-cols-[112px_1fr] gap-4 items-start">
        {/* Imagem/Placeholder */}
        <div
          className={cx(
            "w-[112px] h-[112px] rounded-xl bg-gradient-to-br",
            palette[review.type],
          )}
        />

        {/* Conteúdo da Review */}
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <MediaBadge
              type={review.type}
              compact
              label={t(`badge.${review.type}`)}
            />
            <span>•</span>
            <span>{review.date}</span>
            <span className="ml-auto inline-flex items-center gap-1">
              <RatingStars score={review.score} />
              <span className="text-xs">
                {formatScore(roundToQuarter(clamp10(review.score)))}
              </span>
            </span>
          </div>
          <h4 className="mt-2 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {review.title}
          </h4>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
            {review.text}
          </p>
        </div>
      </div>
    </article>
  );
}
