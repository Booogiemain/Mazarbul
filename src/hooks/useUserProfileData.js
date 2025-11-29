import { useMemo } from "react";
// 1. Importar o hook para usar o Contexto
import { useUserDatabase } from "../contexts/UserDatabaseContext.jsx";

// ==========================
// LISTA MESTRA DE CONQUISTAS (NOVA)
// ==========================
export const MASTER_ACHIEVEMENTS_LIST = [
  // --- ANÉIS DE PODER ---
  { id: "the-one", tiers: [12, 25, 52], iconName: "book-open" },
  { id: "narya", tiers: [12, 25, 52], iconName: "music" },
  { id: "vilya", tiers: [12, 25, 52], iconName: "film" },
  { id: "nenya", tiers: [12, 25, 52], iconName: "gamepad" },

  // --- CONVERGÊNCIA HARMÔNICA ---
  { id: "life-universe-everything", tiers: [1, 6, 12], iconName: "rocket" },
  { id: "horror-business", tiers: [1, 6, 12], iconName: "skull" },
  { id: "wood-between-worlds", tiers: [1, 6, 12], iconName: "sword" },
  { id: "once-upon-time-west", tiers: [1, 6, 12], iconName: "sun" },
  { id: "kagemusha", tiers: [1, 6, 12], iconName: "sword-crossed" },
  { id: "help-me-eros", tiers: [1, 6, 12], iconName: "heart" },
  { id: "guernica", tiers: [1, 6, 12], iconName: "shield" },
  { id: "nighthawks", tiers: [1, 6, 12], iconName: "search" },

  // --- EXPLORAÇÃO E ANÁLISE ---
  { id: "perche-leggere-classici", tiers: [1, 6, 12], iconName: "hourglass" },
  { id: "zeitgeist", tiers: [6, 12, 25], iconName: "zap" },
  { id: "moritarnon", tiers: [1, 3, 6], iconName: "eye-off" },
  { id: "arda", tiers: [1, 3, 6], iconName: "globe" },
  { id: "rhun", tiers: [1, 3, 6], iconName: "compass" },
  { id: "khazad-dum", tiers: [1, 6, 12], iconName: "pickaxe" },

  // --- CRÍTICA E COLEÇÃO ---
  { id: "manwe", tiers: [1, 6, 12], iconName: "thumbs-up" },
  { id: "melkor", tiers: [1, 6, 12], iconName: "thumbs-down" },
  { id: "trivium", tiers: [1, 3, 6], iconName: "layers" },
  { id: "quadrivium", tiers: [1, 3, 6], iconName: "box" },
  { id: "dagor-dagorath", tiers: [1, 3, 6], iconName: "infinity" },
];

// ==========================
// BANCO DE DADOS DE CLUBES (NOVO)
// ==========================
const clubsDatabase = [
  {
    id: "c1",
    name: "Clube Sci-Fi",
    description: "Explorando o desconhecido, de Asimov a Cyberpunk.",
    membersCount: 142,
    nextMeeting: "27/10 • 20:00",
    tags: ["tag.scifi", "tag.futurismo", "tag.tecnologia"],
    coverGradient: "from-indigo-500 via-purple-500 to-pink-500",
    currentWork: { type: "livro", title: "Duna" },
  },
  {
    id: "c2",
    name: "Terror à Meia-Noite",
    description: "Dissecando o horror psicológico e slashers clássicos.",
    membersCount: 89,
    nextMeeting: "31/10 • 23:59",
    tags: ["tag.horror", "tag.cinema", "tag.suspense"],
    coverGradient: "from-red-900 via-red-600 to-orange-900",
    currentWork: { type: "filme", title: "Hereditário" },
  },
  {
    id: "c3",
    name: "Indie Games Corner",
    description:
      "Descobrindo joias escondidas e apoiando desenvolvedores independentes.",
    membersCount: 215,
    nextMeeting: "10/11 • 18:00",
    tags: ["tag.indie", "tag.jogos", "tag.art"],
    coverGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    currentWork: { type: "jogo", title: "Hollow Knight" },
  },
  {
    id: "c4",
    name: "Sociedade do Anel",
    description: "Para os amantes da alta fantasia e construção de mundos.",
    membersCount: 350,
    nextMeeting: "05/11 • 19:00",
    tags: ["tag.fantasia", "tag.rpg", "tag.literatura"],
    coverGradient: "from-amber-500 via-yellow-600 to-orange-500",
    currentWork: { type: "livro", title: "O Silmarillion" },
  },
  {
    id: "c5",
    name: "Cinephiles Noir",
    description: "Sombras, detetives e a estética do cinema preto e branco.",
    membersCount: 45,
    nextMeeting: "15/11 • 21:00",
    tags: ["tag.noir", "tag.cinema", "tag.classico"],
    coverGradient: "from-gray-900 via-gray-700 to-gray-500",
    currentWork: { type: "filme", title: "O Falcão Maltês" },
  },
  {
    id: "c6",
    name: "Vinil & Café",
    description: "Apreciação de álbuns completos, do Jazz ao Rock Progressivo.",
    membersCount: 120,
    nextMeeting: "Domingo • 10:00",
    tags: ["tag.musica", "tag.jazz", "tag.rock"],
    coverGradient: "from-amber-900 via-yellow-900 to-brown-800",
    currentWork: { type: "album", title: "Kind of Blue" },
  },
  {
    id: "c7",
    name: "Literatura Latino-Americana",
    description: "Realismo mágico e as vozes do nosso continente.",
    membersCount: 78,
    nextMeeting: "02/11 • 19:30",
    tags: ["tag.literatura", "tag.cultura", "tag.historia"],
    coverGradient: "from-green-600 via-yellow-500 to-blue-600",
    currentWork: { type: "livro", title: "Cem Anos de Solidão" },
  },
  {
    id: "c8",
    name: "Cyberpunk Netrunners",
    description:
      "High Tech, Low Life. Discussões sobre distopias tecnológicas.",
    membersCount: 156,
    nextMeeting: "Sexta • 22:00",
    tags: ["tag.scifi", "tag.ciberpunk", "tag.tecnologia"],
    coverGradient: "from-pink-600 via-purple-600 to-cyan-400",
    currentWork: { type: "jogo", title: "Cyberpunk 2077" },
  },
];

// ==========================
// SIMULAÇÃO DE BANCO DE DADOS (MOCK DB)
// ==========================

// --- DADOS DE MÍDIA DETALHADOS ---
const mediaDatabase = {
  m1: {
    id: "m1",
    type: "filme",
    title: {
      PT: "Duna: Parte Dois",
      EN: "Dune: Part Two",
      ES: "Dune: Parte Dos",
    },
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1m02V5s5z03iV2lX3a1iV77F22i.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    sinopse: {
      PT: "Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança contra os conspiradores que destruíram sua família. Diante de uma escolha entre o amor de sua vida e o destino do universo conhecido, ele se esforça para evitar um futuro terrível que só ele pode prever.",
      EN: "Paul Atreides unites with Chani and the Fremen on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
      ES: "Paul Atreides se une a Chani y a los Fremen mientras emprende un camino de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo, se esfuerça por evitar un futuro terrible que solo él pode prever.",
    },
    details: {
      Diretor: "Denis Villeneuve",
      Duração: "2h 46min",
      Gênero: ["tag.scifi", "tag.aventura"],
      Ano: "2024",
      País: {
        PT: "Estados Unidos",
        EN: "United States",
        ES: "Estados Unidos",
      },
    },
    communityAverage: 9.18,
    communityReviews: [
      {
        id: "cr1",
        user: { name: "Júlia", handle: "@ju", avatar: "J" },
        score: 9.1,
        text: "Visual imersivo e trilha absurda...",
      },
    ],
  },
  "duna-livro": {
    id: "duna-livro",
    type: "livro",
    title: {
      PT: "Duna",
      EN: "Dune",
      ES: "Dune",
    },
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg",
    backdropUrl: "https://images.alphacoders.com/133/1333069.jpeg",
    sinopse: {
      PT: "Uma mistura de aventura e misticismo, ecologia e política, este romance premiado deu origem a um dos universos mais épicos da ficção científica.",
      EN: "A blend of adventure and mysticism, ecology and politics, this award-winning novel gave rise to one of the most epic universes in science fiction.",
      ES: "Una mezcla de aventura y misticismo, ecología y política, esta novela galardonada dio origen a uno de los universos más épicos de la ciencia ficción.",
    },
    details: {
      Autor: "Frank Herbert",
      Páginas: "688",
      Gênero: ["tag.scifi", "tag.fantasia", "tag.epica"],
      Ano: "1965",
      País: {
        PT: "Estados Unidos",
        EN: "United States",
        ES: "Estados Unidos",
      },
    },
  },
  "duna-1984": {
    id: "duna-1984",
    type: "filme",
    title: {
      PT: "Duna",
      EN: "Dune",
      ES: "Duna",
    },
    posterUrl:
      "https://image.tmdb.org/t/p/w500/a3nDwAnKAl0jsSmsGaen09F2s6G.jpg",
    backdropUrl:
      "https://media.wired.com/photos/5f97371a536952d793623916/master/pass/Culture_Dune_Lynch-10659730-Edit.jpg",
    sinopse: {
      PT: "Em um futuro distante, clãs nobres rivais lutam pelo controle do desértico planeta Arrakis, a única fonte da valiosa especiaria Melange. A família Atreides aceita a administração do planeta, mas é traída por seus inimigos, os Harkonnens.",
      EN: "In the distant future, rival noble clans fight for control of the desert planet Arrakis, the only source of the valuable spice Melange. The Atreides family accepts stewardship of the planet, but is betrayed by their enemies, the Harkonnens.",
      ES: "En un futuro lejano, clanes nobles rivales luchan por el control del planeta desértico Arrakis, la única fuente de la valiosa especia Melange. La familia Atreides acepta la administración del planeta, pero es traicionada por sus enemigos, los Harkonnen.",
    },
    details: {
      Diretor: "David Lynch",
      Duração: "2h 17min",
      Gênero: ["tag.scifi", "tag.aventura", "tag.acao"],
      Ano: "1984",
      País: {
        PT: "Estados Unidos",
        EN: "United States",
        ES: "Estados Unidos",
      },
    },
  },
  "portrait-2019": {
    id: "portrait-2019",
    type: "filme",
    aliases: ["Portrait de la jeune fille en feu"],
    title: {
      PT: "Retrato de uma Jovem em Chamas",
      EN: "Portrait of a Lady on Fire",
      ES: "Retrato de una mujer en llamas",
    },
    posterUrl:
      "https://image.tmdb.org/t/p/w500/s2C0QeCcrT1BwE7cW3H1a3q3uY1.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/w1280/g6PfZVLtYCaPiof5G3PEsIGV2cf.jpg",
    sinopse: {
      PT: "França, 1770. Marianne, uma pintora, é contratada para pintar o retrato de casamento de Héloïse, uma jovem que acaba de deixar o convento. Héloïse resiste ao seu destino, recusando-se a posar, então Marianne deve pintá-la em segredo.",
      EN: "France, 1770. Marianne, a painter, is commissioned to paint the wedding portrait of Héloïse, a young woman who has just left the convent. Héloïse resists her fate by refusing to pose, so Marianne must paint her in secret.",
      ES: "Francia, 1770. Marianne, una pintora, recibe el encargo de pintar el retrato de bodas de Héloïse, una joven que acaba de salir del convento. Héloïse se resiste a su destino negándose a posar, por lo que Marianne debe pintarla en secreto.",
    },
    details: {
      Diretor: "Céline Sciamma",
      Duração: "2h 2min",
      Gênero: ["tag.drama", "tag.romance", "tag.historia"],
      Ano: "2019",
      País: {
        PT: "França",
        EN: "France",
        ES: "Francia",
      },
    },
  },
};

// --- DADOS DE USUÁRIO (MARINA) ---
const marisData = {
  profile: {
    name: "Marina Silva",
    handle: "@maris",
    bio: "Viciada em listas, sci‑fi e cafés gelados. Avalio tudo que assisto/leio/jogo para lembrar por que gostei.",
    avatarUrl: "https://i.pravatar.cc/200?img=5",
  },
  // PROGRESSO DAS CONQUISTAS (LIMPO E NOVO)
  badges: [
    { id: "the-one", progress: 60 }, // Ouro
    { id: "narya", progress: 5 }, // Nada
    { id: "vilya", progress: 26 }, // Prata
    { id: "nenya", progress: 12 }, // Bronze
    { id: "zeitgeist", progress: 8 },
    { id: "khazad-dum", progress: 2 },
  ],
  favorites: [
    {
      id: "g2",
      type: "jogo",
      title: "Baldur's Gate 3",
      year: 2023,
      score: 9.7,
      tags: ["tag.rpg", "tag.fantasia", "tag.estrategia"],
    },
    {
      id: "a2",
      type: "album",
      title: "To Pimp a Butterfly",
      year: 2015,
      score: 9.6,
      tags: ["tag.hiphop", "tag.jazz", "tag.funk", "tag.criticasocial"],
    },
    {
      id: "b1",
      type: "livro",
      title: "1984 (George Orwell)",
      year: 1949,
      score: 9.25,
      tags: ["tag.distopia", "tag.scifi", "tag.politica"],
    },
    {
      id: "m1",
      type: "filme",
      title: {
        PT: "Duna: Parte Dois",
        EN: "Dune: Part Two",
        ES: "Dune: Parte Dos",
      },
      year: 2024,
      score: 9.2,
      tags: ["tag.scifi", "tag.aventura"],
    },
    {
      id: "g1",
      type: "jogo",
      title: "Hades",
      year: 2020,
      score: 9.1,
      tags: ["tag.roguelike", "tag.mitologia", "tag.indie"],
    },
    {
      id: "m2",
      type: "filme",
      title: "Parasita",
      year: 2019,
      score: 9.0,
      tags: ["tag.drama", "tag.thriller", "tag.comedia"],
    },
    {
      id: "m4",
      type: "filme",
      title: "Blade Runner 2049",
      year: 2017,
      score: 8.9,
      tags: ["tag.scifi", "tag.noir", "tag.distopia"],
    },
    {
      id: "b2",
      type: "livro",
      title: "O Nome do Vento",
      year: 2007,
      score: 8.7,
      tags: ["tag.fantasia", "tag.epica"],
    },
  ],
  reviews: [
    {
      id: "r1",
      type: "filme",
      date: "12 Ago 2025",
      score: 9.25,
      title: "Duna: Parte Dois",
      tags: ["tag.scifi", "tag.aventura"],
      text: "Villeneuve mantém a grandiosidade sem perder os personagens de vista...",
    },
    {
      id: "r2",
      type: "livro",
      date: "08 Ago 2025",
      score: 9.0,
      title: "1984 (George Orwell)",
      tags: ["tag.distopia", "tag.politica"],
      text: "Revisita dolorosa e necessária...",
    },
    {
      id: "r3",
      type: "jogo",
      date: "03 Ago 2025",
      score: 9.5,
      title: "Baldur's Gate 3",
      tags: ["tag.rpg", "tag.fantasia"],
      text: "Liberdade real sem quebrar a narrativa...",
    },
    {
      id: "r4",
      type: "album",
      date: "26 Jul 2025",
      score: 8.75,
      title: "Random Access Memories",
      tags: ["tag.eletronica", "tag.disco"],
      text: "Produção analógica brilhante com espaço para respirar...",
    },
    {
      id: "r5",
      type: "filme",
      date: "20 Jul 2025",
      score: 9.0,
      title: "Oppenheimer",
      tags: ["tag.biografia", "tag.drama"],
      text: "Nolan de um jeito que nunca vimos: denso, dialógico e tenso...",
    },
    {
      id: "r6",
      type: "jogo",
      date: "15 Jul 2025",
      score: 9.2,
      title: "Hades",
      tags: ["tag.roguelike", "tag.mitologia"],
      text: "Combate viciante, com cada tentativa de fuga revelando mais da história...",
    },
    {
      id: "r7",
      type: "livro",
      date: "01 Jul 2025",
      score: 8.8,
      title: "O Nome do Vento",
      tags: ["tag.fantasia", "tag.epica"],
      text: "Construção de mundo e sistema de magia fascinantes...",
    },
    {
      id: "r8",
      type: "filme",
      date: "25 Jun 2025",
      score: 9.0,
      title: "Blade Runner 2049",
      tags: ["tag.scifi", "tag.noir"],
      text: "Visualmente deslumbrante e atmosférico...",
    },
  ],
  collections: [],
};

// --- DADOS DE USUÁRIO (ALEX) ---
const alexlData = {
  profile: {
    name: "Alex Lima",
    handle: "@alexl",
    bio: "Explorando mundos de fantasia e futuros distópicos. Foco em RPGs, cinema de autor e álbuns conceituais.",
    avatarUrl: "https://i.pravatar.cc/200?img=12",
  },
  // PROGRESSO DAS CONQUISTAS (LIMPO E NOVO)
  badges: [
    { id: "the-one", progress: 14 },
    { id: "narya", progress: 55 },
    { id: "nenya", progress: 24 },
    { id: "wood-between-worlds", progress: 7 },
    { id: "zeitgeist", progress: 10 },
  ],
  favorites: [
    {
      id: "m1",
      type: "filme",
      title: {
        PT: "Duna: Parte Dois",
        EN: "Dune: Part Two",
        ES: "Dune: Parte Dos",
      },
      year: 2024,
      score: 9.2,
      tags: ["tag.scifi", "tag.aventura"],
    },
    {
      id: "al_fav1",
      type: "jogo",
      title: "The Witcher 3: Wild Hunt",
      year: 2015,
      score: 9.8,
      tags: ["tag.rpg", "tag.fantasia", "tag.epica"],
    },
    {
      id: "al_fav2",
      type: "filme",
      title: "Interestelar",
      year: 2014,
      score: 9.5,
      tags: ["tag.scifi", "tag.drama"],
    },
    {
      id: "al_fav3",
      type: "livro",
      title: "O Senhor dos Anéis",
      year: 1954,
      score: 10,
      tags: ["tag.fantasia", "tag.epica", "tag.aventura"],
    },
    {
      id: "al_fav4",
      type: "album",
      title: "The Dark Side of the Moon",
      year: 1973,
      score: 9.9,
      tags: ["tag.rock", "tag.conceitual"],
    },
    {
      id: "al_fav5",
      type: "jogo",
      title: "Cyberpunk 2077",
      year: 2020,
      score: 9.0,
      tags: ["tag.rpg", "tag.scifi", "tag.distopia"],
    },
    {
      id: "al_fav6",
      type: "filme",
      title: "Blade Runner",
      year: 1982,
      score: 9.1,
      tags: ["tag.scifi", "tag.noir"],
    },
    {
      id: "al_fav7",
      type: "livro",
      title: "Neuromancer",
      year: 1984,
      score: 9.3,
      tags: ["tag.ciberpunk"],
    },
    {
      id: "al_fav8",
      type: "album",
      title: "OK Computer",
      year: 1997,
      score: 9.7,
      tags: ["tag.rock", "tag.alternativo"],
    },
  ],
  reviews: [
    {
      id: "al_rev1",
      type: "jogo",
      date: "15 Out 2025",
      score: 9.8,
      title: "The Witcher 3",
      tags: ["tag.rpg", "tag.fantasia"],
      text: "Uma obra-prima da narrativa em jogos. Cada contrato de bruxo conta uma história.",
    },
    {
      id: "al_rev2",
      type: "filme",
      date: "10 Out 2025",
      score: 9.5,
      title: "Interestelar",
      tags: ["tag.scifi"],
      text: "Uma jornada emocional e visualmente espetacular. A trilha sonora de Hans Zimmer é icônica.",
    },
    {
      id: "al_rev3",
      type: "livro",
      date: "05 Out 2025",
      score: 9.3,
      title: "O Senhor dos Anéis",
      tags: ["tag.fantasia", "tag.epica"],
      text: "A base de toda a fantasia moderna. Uma leitura obrigatória que te transporta para outro mundo.",
    },
    {
      id: "al_rev4",
      type: "album",
      date: "01 Out 2025",
      score: 9.9,
      title: "The Dark Side of the Moon",
      tags: ["tag.rock", "tag.conceitual"],
      text: "Um marco na história da música. Atmosférico, filosófico e sonoramente perfeito.",
    },
    {
      id: "al_rev5",
      type: "jogo",
      date: "28 Set 2025",
      score: 9.0,
      title: "Cyberpunk 2077",
      tags: ["tag.rpg", "tag.scifi"],
      text: "Apesar de um lançamento turbulento, a história e o mundo de Night City são cativantes. Um RPG profundo.",
    },
    {
      id: "al_rev6",
      type: "filme",
      date: "20 Set 2025",
      score: 9.1,
      title: "Blade Runner",
      tags: ["tag.scifi", "tag.noir"],
      text: "Clássico atemporal que define o gênero cyberpunk. A atmosfera e as questões filosóficas são ainda relevantes.",
    },
    {
      id: "al_rev7",
      type: "livro",
      date: "15 Set 2025",
      score: 9.3,
      title: "Neuromancer",
      tags: ["tag.ciberpunk"],
      text: "O livro que deu origem ao cyberpunk. Leitura densa mas recompensadora, um mergulho em um futuro tecnológico e sombrio.",
    },
    {
      id: "al_rev8",
      type: "album",
      date: "10 Set 2025",
      score: 9.7,
      title: "OK Computer",
      tags: ["tag.rock", "tag.alternativo"],
      text: "Radiohead no seu auge. Melancólico e visionário, um álbum que captura a ansiedade da era digital.",
    },
    {
      id: "al_rev9",
      type: "jogo",
      date: "05 Set 2025",
      score: 9.6,
      title: "God of War (2018)",
      tags: ["tag.aventura", "tag.mitologia"],
      text: "Uma reinvenção brilhante de Kratos. Combate visceral e uma história emocionante de pai e filho.",
    },
    {
      id: "al_rev10",
      type: "filme",
      date: "01 Set 2025",
      score: 9.0,
      title: "Arrival",
      tags: ["tag.scifi", "tag.drama"],
      text: "Um sci-fi inteligente e comovente sobre linguagem e tempo. Amy Adams entrega uma performance memorável.",
    },
  ],
  collections: [
    {
      id: "col1",
      title: "Cyberpunk Completo",
      description: "Uma imersão no gênero, do livro ao jogo.",
      items: [
        { id: "al_fav7", type: "livro", title: "Neuromancer" },
        { id: "al_fav6", type: "filme", title: "Blade Runner" },
        { id: "al_fav5", type: "jogo", title: "Cyberpunk 2077" },
      ],
    },
    {
      id: "col2",
      title: "Filmes para ver em 2025",
      description: "Minha lista de filmes para assistir este ano.",
      items: [{ id: "m5", type: "filme", title: "Oppenheimer" }],
    },
    {
      id: "col3",
      title: "Clássicos da Fantasia",
      description: "As obras que definiram o gênero.",
      items: [
        { id: "al_fav3", type: "livro", title: "O Senhor dos Anéis" },
        { id: "g2", type: "jogo", title: "Baldur's Gate 3" },
      ],
    },
  ],
};

// MODIFICAÇÃO: Exporta os dados estáticos para o Contexto
export const staticUserDatabase = { maris: marisData, alexl: alexlData };
export const staticMediaDatabase = mediaDatabase;
// Exportando a nova base de clubes
export const staticClubsDatabase = clubsDatabase;

// --- FUNÇÃO ANTIGA (ainda usada pelo Contexto para carregar dados iniciais) ---
function getUserData(handle) {
  const finalHandle = handle || "alexl";
  const userData = staticUserDatabase[finalHandle] || staticUserDatabase.alexl;
  return userData;
}

// --- FUNÇÃO ANTIGA (agora exportada para o Contexto) ---
export function getMediaDetails(mediaId) {
  return staticMediaDatabase[mediaId];
}

// ==========================
// NOVO HOOK (useUserProfileData)
// ==========================
export function useUserProfileData(handle) {
  // 2. Lê os dados do Contexto (a "memória" de sessão)
  const { db } = useUserDatabase();
  const finalHandle = handle || "alexl";
  const userData = db[finalHandle] || db.alexl;

  // A lógica de tags dinâmicas permanece a mesma, mas lendo do 'userData' do Contexto
  const dynamicTags = useMemo(() => {
    if (!userData) return [];

    const tagScores = new Map();
    const FAVORITE_WEIGHT = 4;
    const REVIEW_WEIGHT = 2;

    (userData.favorites || []).forEach((item) => {
      if (item.tags) {
        item.tags.forEach((tag) => {
          tagScores.set(tag, (tagScores.get(tag) || 0) + FAVORITE_WEIGHT);
        });
      }
    });

    (userData.reviews || []).forEach((item) => {
      if (item.tags) {
        item.tags.forEach((tag) => {
          tagScores.set(tag, (tagScores.get(tag) || 0) + REVIEW_WEIGHT);
        });
      }
    });

    const sortedTags = Array.from(tagScores.entries())
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .slice(0, 10)
      .map(([tag]) => tag);

    return sortedTags;
  }, [userData]);

  // Retornamos também 'clubs' para ser usado globalmente
  return { ...userData, dynamicTags, clubs: staticClubsDatabase };
}
