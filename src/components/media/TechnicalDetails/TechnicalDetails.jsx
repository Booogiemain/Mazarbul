import React from "react";

// Componente para exibir a "Ficha Técnica" de uma mídia.
export default function TechnicalDetails({ details, type, t, lang }) {
  if (!details) {
    return null;
  }

  // Função para renderizar um par de chave-valor da ficha técnica
  const renderDetailItem = (labelKey, value) => {
    let displayValue = value;

    // A CORREÇÃO ESTÁ AQUI: Nova lógica para lidar com arrays (Gênero)
    if (Array.isArray(value)) {
      displayValue = value.map((key) => t(key)).join(", ");
    } else if (
      typeof value === "object" &&
      value !== null &&
      value[lang.toUpperCase()]
    ) {
      displayValue = value[lang.toUpperCase()];
    }

    return (
      <div
        key={labelKey}
        className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 py-3"
      >
        <dt className="text-sm text-neutral-500 dark:text-neutral-400">
          {t(labelKey)}
        </dt>
        <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-right">
          {displayValue}
        </dd>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
        {t("section.techDetails")}
      </h2>
      <dl>
        {type === "filme" && (
          <>
            {renderDetailItem("details.director", details.Diretor)}
            {renderDetailItem("details.duration", details.Duração)}
            {renderDetailItem("details.genre", details.Gênero)}
            {renderDetailItem("details.year", details.Ano)}
            {renderDetailItem("details.country", details.País)}
          </>
        )}
      </dl>
    </div>
  );
}
