import React from "react";
import { ChevronRight } from "lucide-react";

// Componente para o cabeçalho de uma seção, com título, ícone e filtros.
function SectionHeader({ title, href, icon, filters }) {
  return (
    <div className="mb-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
      {/* Lado esquerdo: Ícone e Título */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        {icon}
        <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
      </div>

      {/* Centro: Filtros (opcional) */}
      <div className="justify-self-center">
        <div className="flex items-center gap-2 text-xs flex-wrap justify-center">
          {filters}
        </div>
      </div>

      {/* Lado direito: Botão "Explorar" (opcional) */}
      <div className="justify-self-end">
        {href ? (
          <button className="h-8 px-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm leading-none font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
            <span className="leading-none">Explorar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <span /> // Renderiza um elemento vazio se não houver 'href'
        )}
      </div>
    </div>
  );
}

export default SectionHeader;
