import React from "react";
import {
  BadgeCheck,
  BookOpen,
  Gamepad2,
  Users,
  Film,
  Star as StarIcon,
  ChevronRight,
} from "lucide-react";
import { cx } from "../../../utils/formatters";

const iconMap = {
  BookOpen,
  Gamepad2,
  Users,
  Film,
  StarIcon,
};

function BadgesRibbon({ badges, t }) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <BadgeCheck className="w-4 h-4" />
          <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
            {t("section.achievements")}
          </h3>
        </div>
        <div />
        <div className="justify-self-end">
          <button className="h-8 px-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm leading-none font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
            <span className="leading-none">{t("action.explore")}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 select-none">
        {badges.map((badge) => {
          const IconComponent = iconMap[badge.icon] || BadgeCheck;
          return (
            <div key={badge.id} className="relative group">
              <div
                className={cx(
                  "w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br",
                  badge.color,
                  "flex items-center justify-center",
                )}
              >
                <IconComponent className="w-6 h-6 text-neutral-800 dark:text-neutral-200" />
              </div>
              {/* AQUI ESTÁ A MUDANÇA: Usando t(badge.nameKey) para traduzir */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded-md text-xs bg-neutral-900 text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 shadow-md transition-opacity">
                {t(badge.nameKey)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BadgesRibbon;
