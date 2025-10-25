import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star as StarIcon,
  Clock,
  MessageSquare,
  Users,
  ChevronRight,
} from "lucide-react";

import {
  cx,
  formatScore,
  roundToQuarter,
  clamp10,
} from "../../utils/formatters";

import HeaderBar from "../../components/layout/HeaderBar/HeaderBar.jsx";
import SectionHeader from "../../components/layout/SectionHeader/SectionHeader.jsx";
import MediaCard from "../../components/ui/MediaCard/MediaCard.jsx";
import RatingStars from "../../components/ui/RatingStars/RatingStars.jsx";
import MediaBadge from "../../components/ui/MediaBadge/MediaBadge.jsx";
import AvatarStack from "../../components/ui/AvatarStack/AvatarStack.jsx";

// ==========================
// DADOS DE EXEMPLO (MOCK DATA)
// ==========================
const movies = [
  {
    id: "m1",
    type: "filme",
    title: "Duna: Parte Dois",
    year: 2024,
    score: 9.2,
  },
  {
    id: "m2",
    type: "filme",
    title: "Tudo em Todo Lugar ao Mesmo Tempo",
    year: 2022,
    score: 8.8,
  },
  { id: "m3", type: "filme", title: "Parasita", year: 2019, score: 9.0 },
  {
    id: "m4",
    type: "filme",
    title: "Mad Max: Estrada da Fúria",
    year: 2015,
    score: 8.5,
  },
  { id: "m5", type: "filme", title: "Oppenheimer", year: 2023, score: 9.0 },
  { id: "m6", type: "filme", title: "La La Land", year: 2016, score: 8.1 },
];
const books = [
  {
    id: "b1",
    type: "livro",
    title: "Ensaio Sobre a Cegueira (Saramago)",
    year: 1995,
    score: 9.1,
  },
  {
    id: "b2",
    type: "livro",
    title: "O Nome do Vento (Patrick Rothfuss)",
    year: 2007,
    score: 8.7,
  },
  {
    id: "b3",
    type: "livro",
    title: "1984 (George Orwell)",
    year: 1949,
    score: 9.3,
  },
  {
    id: "b4",
    type: "livro",
    title: "A Hora da Estrela (Clarice Lispector)",
    year: 1977,
    score: 8.9,
  },
];
const games = [
  {
    id: "g1",
    type: "jogo",
    title: "The Legend of Zelda: Tears of the Kingdom",
    year: 2023,
    score: 9.5,
  },
  { id: "g2", type: "jogo", title: "Elden Ring", year: 2022, score: 9.6 },
  { id: "g3", type: "jogo", title: "Hades", year: 2020, score: 9.1 },
  { id: "g4", type: "jogo", title: "Baldur's Gate 3", year: 2023, score: 9.7 },
];
const albums = [
  {
    id: "a1",
    type: "album",
    title: "Random Access Memories (Daft Punk)",
    year: 2013,
    score: 9.0,
  },
  {
    id: "a2",
    type: "album",
    title: "To Pimp a Butterfly (Kendrick Lamar)",
    year: 2015,
    score: 9.6,
  },
  {
    id: "a3",
    type: "album",
    title: "Abbey Road (The Beatles)",
    year: 1969,
    score: 9.4,
  },
  {
    id: "a4",
    type: "album",
    title: "Anima (Thom Yorke)",
    year: 2019,
    score: 8.7,
  },
];
const allItems = [...movies, ...books, ...games, ...albums];
const recentlyRated = [
  {
    id: "m5",
    type: "filme",
    title: "Oppenheimer",
    year: 2023,
    score: 9.0,
    ratedAt: "há 1 dia",
  },
  {
    id: "b3",
    type: "livro",
    title: "1984 (George Orwell)",
    year: 1949,
    score: 9.25,
    ratedAt: "há 2 dias",
  },
  {
    id: "g3",
    type: "jogo",
    title: "Hades",
    year: 2020,
    score: 9.0,
    ratedAt: "há 3 dias",
  },
  {
    id: "a1",
    type: "album",
    title: "Random Access Memories (Daft Punk)",
    year: 2013,
    score: 9.0,
    ratedAt: "há 5 dias",
  },
  {
    id: "m1",
    type: "filme",
    title: "Duna: Parte Dois",
    year: 2024,
    score: 9.25,
    ratedAt: "há 1 semana",
  },
  {
    id: "g4",
    type: "jogo",
    title: "Baldur's Gate 3",
    year: 2023,
    score: 9.75,
    ratedAt: "há 1 semana",
  },
  {
    id: "b1",
    type: "livro",
    title: "Ensaio Sobre a Cegueira (Saramago)",
    year: 1995,
    score: 9.0,
    ratedAt: "há 9 dias",
  },
  {
    id: "a4",
    type: "album",
    title: "Anima (Thom Yorke)",
    year: 2019,
    score: 8.75,
    ratedAt: "há 12 dias",
  },
];
const clubs = [
  {
    id: "c1",
    name: "Clube Sci‑Fi",
    about: "Acompanhamento mensal de clássicos da ficção científica.",
    members: ["Ana", "Leo", "Bruna", "Iuri"],
    next: "27/10 • 20:00",
  },
  {
    id: "c2",
    name: "Leitura Latino‑América",
    about: "Romances e contos do continente.",
    members: ["Helena", "Gustavo", "Rafa"],
    next: "02/11 • 19:30",
  },
  {
    id: "c3",
    name: "Indie Games",
    about: "Descobertas e debates sobre jogos independentes.",
    members: ["Nico", "Sofia", "Akira", "Lia", "Tom"],
    next: "10/11 • 21:00",
  },
];
const friendsFeed = [
  {
    id: "f1",
    who: "Marina",
    handle: "@maris",
    type: "filme",
    item: "Oppenheimer",
    score: 9.0,
    when: "há 2 h",
    note: "Roteiro e montagem impecáveis; Cillian Murphy gigantesco. As escolhas de som criam tensão contínua e a montagem mantém o ritmo mesmo nas cenas mais expositivas.",
  },
  {
    id: "f2",
    who: "Diego",
    handle: "@dgs",
    type: "album",
    item: "Random Access Memories",
    score: 9.0,
    when: "ontem",
    note: "Produção cristalina com arranjos que respiram. É um disco para fones e para pista, sempre achando novos detalhes a cada audição.",
  },
  {
    id: "f3",
    who: "Lívia",
    handle: "@livz",
    type: "jogo",
    item: "Hades",
    score: 9.2,
    when: "há 3 dias",
    note: "Loop perfeito: a narrativa cresce a cada run sem cansar. Combina desafio justo com recompensas constantes e personagens carismáticos.",
  },
  {
    id: "f4",
    who: "Caio",
    handle: "@caiod",
    type: "livro",
    item: "Ensaio Sobre a Cegueira",
    score: 9.4,
    when: "há 1 semana",
    note: "Assustador de tão atual, uma porrada necessária. A prosa do Saramago arrasta e hipnotiza, fazendo cada parágrafo pesar.",
  },
  {
    id: "f5",
    who: "Júlia",
    handle: "@ju",
    type: "filme",
    item: "Duna: Parte Dois",
    score: 9.1,
    when: "há 1 h",
    note: "Visual imersivo e trilha absurda. A escala épica não atropela os personagens, e a fotografia vende o deserto como algo vivo.",
  },
  {
    id: "f6",
    who: "Rafa",
    handle: "@raf",
    type: "jogo",
    item: "Elden Ring",
    score: 9.7,
    when: "há 4 h",
    note: "Mundo vivo, desafiador e honesto. Cada descoberta parece sua, e as lutas contam histórias próprias sem precisar de cutscenes.",
  },
  {
    id: "f7",
    who: "Nina",
    handle: "@nina",
    type: "album",
    item: "Anima",
    score: 8.6,
    when: "hoje",
    note: "Climas eletrônicos hipnóticos com texturas quase táteis. Um disco que pede silêncio e atenção para funcionar no máximo.",
  },
  {
    id: "f8",
    who: "Otávio",
    handle: "@tav",
    type: "livro",
    item: "1984",
    score: 9.2,
    when: "há 2 dias",
    note: "Distopia que nunca envelhece. Cada releitura revela outra camada do controle e da linguagem enquanto o mundo muda lá fora.",
  },
  {
    id: "f9",
    who: "Bia",
    handle: "@bia",
    type: "filme",
    item: "Parasita",
    score: 9.5,
    when: "há 5 h",
    note: "Equilíbrio perfeito de gêneros, com humor ácido e tensão real. A direção de arte trabalha como personagem silencioso.",
  },
  {
    id: "f10",
    who: "Iuri",
    handle: "@iuri",
    type: "album",
    item: "Abbey Road",
    score: 9.4,
    when: "há 3 dias",
    note: "Clássico circular, produção impecável e mistura de ideias ousada. O lado B segue sendo um manual prático de arranjos.",
  },
  {
    id: "f11",
    who: "Helena",
    handle: "@hel",
    type: "jogo",
    item: "Hades",
    score: 9.3,
    when: "há 6 h",
    note: "Gameplay redondo e narrativa progressiva. Mesmo falhando, você sente que aprendeu algo e quer tentar só mais uma vez.",
  },
  {
    id: "f12",
    who: "Gus",
    handle: "@gus",
    type: "livro",
    item: "A Hora da Estrela",
    score: 8.9,
    when: "há 8 h",
    note: "Delicado e cortante, curto e inesquecível. A narração desmonta expectativas e te deixa pensando nas entrelinhas.",
  },
  {
    id: "f13",
    who: "Tom",
    handle: "@tom",
    type: "filme",
    item: "La La Land",
    score: 8.2,
    when: "há 9 h",
    note: "Encantador e melancólico na medida certa. Coreografias funcionam como set pieces emocionais, não apenas visuais.",
  },
  {
    id: "f14",
    who: "Sofia",
    handle: "@sof",
    type: "album",
    item: "To Pimp a Butterfly",
    score: 9.7,
    when: "há 10 h",
    note: "Poético e urgente, com produção que mistura eras. Letras que ficam martelando e arranjos que seguram o peso com elegância.",
  },
  {
    id: "f15",
    who: "Akira",
    handle: "@aki",
    type: "jogo",
    item: "Baldur's Gate 3",
    score: 9.8,
    when: "há 11 h",
    note: "Liberdade absurda de escolhas sem quebrar a história. Companheiros reagem de forma crível e as missões se dobram às suas decisões.",
  },
  {
    id: "f16",
    who: "Lia",
    handle: "@lia",
    type: "livro",
    title: "O Nome do Vento",
    score: 8.8,
    when: "há 12 h",
    note: "Universo rico e envolvente, com magia que parece sistema e mito ao mesmo tempo. Dá vontade de morar nas páginas.",
  },
  {
    id: "f17",
    who: "Marcelo",
    handle: "@marc",
    type: "filme",
    item: "Mad Max: Estrada da Fúria",
    score: 8.6,
    when: "há 13 h",
    note: "Ação coreografada magistralmente e comunicação visual direta. Quase não precisa de diálogos para contar tudo.",
  },
  {
    id: "f18",
    who: "Ana",
    handle: "@ana",
    type: "album",
    item: "Random Access Memories",
    score: 9.0,
    when: "há 14 h",
    note: "Som analógico delicioso com groove elegante. Um tributo que vira algo novo, sem cair em nostalgia vazia.",
  },
  {
    id: "f19",
    who: "Leo",
    handle: "@leo",
    type: "jogo",
    item: "Zelda: TOTK",
    score: 9.6,
    when: "há 15 h",
    note: "Exploração sem fim com ferramentas que incentivam criatividade. O mapa antigo ganha vida nova com o vertical e o subterrâneo.",
  },
  {
    id: "f20",
    who: "Bruna",
    handle: "@bru",
    type: "livro",
    item: "Ensaio Sobre a Cegueira",
    score: 9.1,
    when: "há 16 h",
    note: "Perturbador e necessário; faz pensar em responsabilidade coletiva. Difícil parar e, quando termina, o silêncio pesa.",
  },
];

// ==========================
// Componente da Página
// ==========================
export default function HomePage({ theme, setTheme, lang, setLang, t }) {
  const [filterHigh, setFilterHigh] = useState("todos");
  const [filterRecent, setFilterRecent] = useState("todos");

  const startRef = useRef(null);
  const endRef = useRef(null);
  const [spanHeight, setSpanHeight] = useState(null);

  const highlights = useMemo(() => {
    return [...allItems]
      .filter((i) => (filterHigh === "todos" ? true : i.type === filterHigh))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [filterHigh, allItems]);

  const recents = useMemo(() => {
    return recentlyRated.filter((i) =>
      filterRecent === "todos" ? true : i.type === filterRecent,
    );
  }, [filterRecent]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const s = startRef.current?.getBoundingClientRect();
      const e = endRef.current?.getBoundingClientRect();
      if (!s || !e) return;
      setSpanHeight(e.bottom - s.top);
    };
    const timer = setTimeout(update, 50);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", update);
    };
  }, []);

  const renderCategoryChips = (current, setter) => {
    const chips = [
      { k: "todos", label: t("filter.all") },
      { k: "filme", label: t("filter.movies") },
      { k: "livro", label: t("filter.books") },
      { k: "jogo", label: t("filter.games") },
      { k: "album", label: t("filter.albums") },
    ];
    return (
      <>
        {" "}
        {chips.map((f) => (
          <button
            key={f.k}
            onClick={() => setter(f.k)}
            className={cx(
              "px-3 py-1.5 rounded-full border",
              current === f.k
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/60",
            )}
          >
            {f.label}
          </button>
        ))}{" "}
      </>
    );
  };

  return (
    <div className={cx(theme === "dark" ? "dark" : "", "font-sans")}>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <HeaderBar
          theme={theme}
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
          t={t}
        />

        <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            <div className="xl:col-span-8 flex flex-col gap-6 min-h-0">
              <div ref={startRef}>
                <SectionHeader
                  title={t("section.highlights")}
                  icon={<StarIcon className="w-4 h-4" />}
                  href="#"
                  filters={renderCategoryChips(filterHigh, setFilterHigh)}
                  t={t}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {highlights.map((m) => (
                    <Link to={`/media/${m.id}`} key={m.id}>
                      <MediaCard
                        item={m}
                        wide
                        badgeLabel={t(`badge.${m.type}`)}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader
                  title={t("section.recents")}
                  icon={<Clock className="w-4 h-4" />}
                  href="#"
                  filters={renderCategoryChips(filterRecent, setFilterRecent)}
                  t={t}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {recents.map((m) => (
                    <Link to={`/media/${m.id}`} key={`${m.id}-recent`}>
                      <MediaCard
                        item={m}
                        wide
                        badgeLabel={t(`badge.${m.type}`)}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div ref={endRef}>
                <SectionHeader
                  title={t("section.clubs")}
                  icon={<Users className="w-4 h-4" />}
                  href="#"
                  t={t}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clubs.map((c) => (
                    <motion.div
                      key={c.id}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 flex flex-col gap-3"
                    >
                      <div className="h-24 rounded-xl bg-gradient-to-br from-sky-500/20 via-purple-500/10 to-emerald-500/10" />
                      <div>
                        <h4 className="font-semibold leading-tight">
                          {c.name}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                          {c.about}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <AvatarStack names={c.members} />
                        <span className="text-xs text-neutral-500">
                          {t("label.next")}: {c.next}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <aside
              style={{ height: spanHeight ?? undefined }}
              className="xl:col-span-4 flex flex-col min-h-0 overflow-hidden"
            >
              <SectionHeader
                title={t("section.friends")}
                icon={<MessageSquare className="w-4 h-4" />}
                t={t}
              />
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800 flex-1 min-h-0 max-h-full overflow-y-auto">
                {friendsFeed.map((f) => (
                  <div key={f.id} className="p-4 flex items-start gap-3">
                    <Link
                      to={`/profile/${f.handle.substring(1)}`}
                      className="shrink-0"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center text-[11px] font-semibold text-neutral-700 dark:text-neutral-100">
                        {f.who.substring(0, 1)}
                      </div>
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Link
                          to={`/profile/${f.handle.substring(1)}`}
                          className="flex items-center gap-2 min-w-0"
                        >
                          <span className="font-medium truncate hover:underline">
                            {f.who}
                          </span>
                          <span className="text-neutral-500 truncate">
                            {f.handle}
                          </span>
                        </Link>
                        <MediaBadge
                          type={f.type}
                          compact
                          label={t(`badge.${f.type}`)}
                        />
                        <span className="ml-auto text-xs text-neutral-500 whitespace-nowrap">
                          {f.when}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {f.item}
                        </span>
                        <div className="ml-auto flex items-center gap-1">
                          <RatingStars score={f.score} />
                          <span className="text-xs text-neutral-500">
                            {formatScore(roundToQuarter(clamp10(f.score)))}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-200">
                        {f.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
