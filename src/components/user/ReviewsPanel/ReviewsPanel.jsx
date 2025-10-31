import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronRight } from "lucide-react";

// MODIFICAÇÃO: Corrigido o caminho da importação para subir um nível de diretório
import ReviewCard from "../ReviewCard/ReviewCard.jsx";

// Componente para exibir o painel de reviews de um usuário.
function ReviewsPanel({ reviews, t, containerHeight, handle }) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section
      className="flex flex-col min-h-0"
      style={{ height: containerHeight || undefined }}
    >
      {/* Cabeçalho da Seção */}
      <div className="mb-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <MessageSquare className="w-4 h-4" />
          <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
            {t("section.reviews")}
          </h3>
        </div>

        {/* Link "Ver mais" adicionado */}
        {handle && (
          <div className="justify-self-end">
            <Link
              to={`/profile/${handle}/reviews`}
              className="h-8 px-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm leading-none font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <span className="leading-none">{t("action.see_more")}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        )}
      </div>

      {/* Contêiner Rôlavel */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex-1 min-h-0">
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 h-full overflow-y-auto">
          {reviews.map((review) => (
            // Código do card substituído pelo componente
            <ReviewCard key={review.id} review={review} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsPanel;
