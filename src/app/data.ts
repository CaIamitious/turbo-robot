export type Sport = { id: string; label: string; emoji: string };
export type Team = { id: string; name: string; sport: string; badge: string };
export type Player = { id: string; name: string; sport: string; country: string };

export type Match = {
  id: number;
  sport: string;
  competition: string;
  date: string; // ISO
  time: string;
  home: string;
  homeBadge: string;
  away: string;
  awayBadge: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "live" | "upcoming" | "finished";
  minute?: string;
  broadcasters?: string[];
  venue?: string;
};

export type Article = {
  id: number;
  sport: string;
  category: string;
  title: string;
  summary: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  tags: string[];
};

export const DEFAULT_SPORTS: Sport[] = [
  { id: "football", label: "Football", emoji: "⚽" },
  { id: "tennis", label: "Tennis", emoji: "🎾" },
  { id: "golf", label: "Golf", emoji: "⛳" },
  { id: "basketball", label: "Basketball", emoji: "🏀" },
  { id: "f1", label: "F1", emoji: "🏎️" },
  { id: "cricket", label: "Cricket", emoji: "🏏" },
  { id: "rugby", label: "Rugby", emoji: "🏉" },
  { id: "cycling", label: "Cycling", emoji: "🚴" },
];

export const MATCHES: Match[] = [
  {
    id: 1,
    sport: "Football",
    competition: "Premier League",
    date: "2026-05-28",
    time: "20:00",
    home: "Arsenal",
    homeBadge: "ARS",
    away: "Chelsea",
    awayBadge: "CHE",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    minute: "73'",
    broadcasters: ["Sky Sports", "NBC Sports"],
    venue: "Emirates Stadium, London",
  },
  {
    id: 2,
    sport: "Football",
    competition: "Champions League",
    date: "2026-05-28",
    time: "20:45",
    home: "Real Madrid",
    homeBadge: "RMA",
    away: "Bayern",
    awayBadge: "BAY",
    homeScore: 1,
    awayScore: 1,
    status: "live",
    minute: "45+2'",
    broadcasters: ["BT Sport", "CBS Sports"],
    venue: "Bernabéu, Madrid",
  },
  {
    id: 3,
    sport: "Tennis",
    competition: "Roland Garros · SF",
    date: "2026-05-28",
    time: "14:00",
    home: "C. Alcaraz",
    homeBadge: "ALC",
    away: "N. Djokovic",
    awayBadge: "DJO",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    minute: "Set 3",
    broadcasters: ["Eurosport", "Tennis Channel"],
    venue: "Court Philippe-Chatrier, Paris",
  },
  {
    id: 4,
    sport: "Football",
    competition: "Premier League",
    date: "2026-05-29",
    time: "20:00",
    home: "Man City",
    homeBadge: "MCI",
    away: "Liverpool",
    awayBadge: "LIV",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    broadcasters: ["Sky Sports", "NBCSN"],
    venue: "Etihad Stadium, Manchester",
  },
  {
    id: 5,
    sport: "Golf",
    competition: "The Open",
    date: "2026-05-29",
    time: "09:00",
    home: "R. McIlroy",
    homeBadge: "RMC",
    away: "T. Woods",
    awayBadge: "TWD",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    broadcasters: ["Sky Sports Golf", "NBC"],
    venue: "Royal St George's, Kent",
  },
  {
    id: 6,
    sport: "Tennis",
    competition: "Wimbledon · QF",
    date: "2026-05-30",
    time: "14:00",
    home: "C. Alcaraz",
    homeBadge: "ALC",
    away: "J. Sinner",
    awayBadge: "SIN",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    broadcasters: ["BBC", "ESPN"],
    venue: "Centre Court, Wimbledon",
  },
  {
    id: 7,
    sport: "Football",
    competition: "La Liga",
    date: "2026-05-31",
    time: "21:00",
    home: "Barcelona",
    homeBadge: "BAR",
    away: "Real Madrid",
    awayBadge: "RMA",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    broadcasters: ["La Liga TV", "ESPN+"],
    venue: "Spotify Camp Nou, Barcelona",
  },
  {
    id: 8,
    sport: "Football",
    competition: "Premier League",
    date: "2026-05-27",
    time: "FT",
    home: "Tottenham",
    homeBadge: "TOT",
    away: "Man Utd",
    awayBadge: "MUN",
    homeScore: 3,
    awayScore: 1,
    status: "finished",
    broadcasters: ["Sky Sports"],
    venue: "Tottenham Hotspur Stadium",
  },
  {
    id: 9,
    sport: "Football",
    competition: "La Liga",
    date: "2026-05-27",
    time: "FT",
    home: "Atletico Madrid",
    homeBadge: "ATM",
    away: "Sevilla",
    awayBadge: "SEV",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    broadcasters: ["La Liga TV"],
    venue: "Metropolitano, Madrid",
  },
  {
    id: 10,
    sport: "Tennis",
    competition: "Roland Garros · QF",
    date: "2026-05-27",
    time: "FT",
    home: "C. Alcaraz",
    homeBadge: "ALC",
    away: "H. Hurkacz",
    awayBadge: "HUR",
    homeScore: 3,
    awayScore: 1,
    status: "finished",
    broadcasters: ["Eurosport"],
    venue: "Court Philippe-Chatrier, Paris",
  },
  {
    id: 11,
    sport: "Football",
    competition: "Champions League · Final",
    date: "2026-06-01",
    time: "20:00",
    home: "Real Madrid",
    homeBadge: "RMA",
    away: "Arsenal",
    awayBadge: "ARS",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    broadcasters: ["BT Sport", "CBS Sports"],
    venue: "Allianz Arena, Munich",
  },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    sport: "Football",
    category: "Analysis",
    title: "Arsenal's title charge: what went right and wrong",
    summary: "After a season of high drama, we break down the tactical decisions that defined Arsenal's campaign.",
    author: "James Hartley",
    readTime: "6 min",
    date: "2h ago",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=500&fit=crop&auto=format",
    tags: ["Arsenal", "Premier League", "Football"],
  },
  {
    id: 2,
    sport: "Tennis",
    category: "Tennis",
    title: "Alcaraz vs Djokovic: a rivalry for the ages",
    summary: "The next generation has truly arrived. Carlos Alcaraz's semi-final win sets the stage for a thrilling Roland Garros final.",
    author: "Sophie Bernard",
    readTime: "4 min",
    date: "5h ago",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop&auto=format",
    tags: ["Alcaraz", "Djokovic", "Roland Garros", "Tennis"],
  },
  {
    id: 3,
    sport: "Golf",
    category: "Golf",
    title: "McIlroy shoots -8 to lead The Open after day one",
    summary: "Rory McIlroy produced a stunning opening round at Royal St George's, carding eight birdies.",
    author: "David Carr",
    readTime: "3 min",
    date: "8h ago",
    image: "https://images.unsplash.com/photo-1606443192517-919653213206?w=800&h=500&fit=crop&auto=format",
    tags: ["McIlroy", "The Open", "Golf"],
  },
  {
    id: 4,
    sport: "Football",
    category: "Preview",
    title: "Champions League final preview: Real Madrid vs Arsenal",
    summary: "Sunday's showpiece in Munich is arguably the most eagerly awaited European final in a decade.",
    author: "Mark Owens",
    readTime: "8 min",
    date: "12h ago",
    image: "https://images.unsplash.com/photo-1434648957308-5e6a859697e8?w=800&h=500&fit=crop&auto=format",
    tags: ["Real Madrid", "Arsenal", "Champions League", "Football"],
  },
  {
    id: 5,
    sport: "Tennis",
    category: "Analysis",
    title: "Why clay exposed weaknesses in Sinner's game",
    summary: "Despite a dominant hard-court season, Jannik Sinner's form on clay this spring has raised questions.",
    author: "Sophie Bernard",
    readTime: "5 min",
    date: "1d ago",
    image: "https://images.unsplash.com/photo-1545151414-8a948e1ea54f?w=800&h=500&fit=crop&auto=format",
    tags: ["Sinner", "Roland Garros", "Tennis"],
  },
  {
    id: 6,
    sport: "Football",
    category: "Transfer",
    title: "Man City eye €120m striker as Haaland future unclear",
    summary: "City are monitoring three forwards ahead of the summer window as uncertainty surrounds Erling Haaland's future.",
    author: "Tom Walsh",
    readTime: "4 min",
    date: "2d ago",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop&auto=format",
    tags: ["Man City", "Transfers", "Football"],
  },
];

export const LINEUPS: Record<number, { home: string[]; away: string[]; homeSubs: string[]; awaySubs: string[] }> = {
  1: {
    home: ["Raya", "White", "Saliba", "Gabriel", "Zinchenko", "Odegaard", "Rice", "Havertz", "Saka", "Martinelli", "Jesus"],
    away: ["Sanchez", "James", "Chalobah", "Colwill", "Chilwell", "Caicedo", "Fernandez", "Palmer", "Sterling", "Nkunku", "Jackson"],
    homeSubs: ["Turner", "Tomiyasu", "Kiwior", "Trossard", "Vieira"],
    awaySubs: ["Petrovic", "Hall", "Disasi", "Mudryk", "Madueke"],
  },
  2: {
    home: ["Courtois", "Carvajal", "Militao", "Alaba", "Mendy", "Valverde", "Tchouameni", "Kroos", "Bellingham", "Vinicius", "Rodrygo"],
    away: ["Neuer", "Kimmich", "Upamecano", "De Ligt", "Davies", "Goretzka", "Laimer", "Musiala", "Sane", "Coman", "Kane"],
    homeSubs: ["Lunin", "Vazquez", "Nacho", "Camavinga", "Joselu"],
    awaySubs: ["Ulreich", "Mazraoui", "Pavard", "Gnabry", "Tel"],
  },
};

export const MATCH_STATS: Record<number, { label: string; home: string | number; away: string | number }[]> = {
  1: [
    { label: "Possession", home: "58%", away: "42%" },
    { label: "Shots", home: 14, away: 9 },
    { label: "Shots on Target", home: 6, away: 3 },
    { label: "Corners", home: 7, away: 4 },
    { label: "Fouls", home: 10, away: 13 },
    { label: "Yellow Cards", home: 1, away: 2 },
    { label: "Pass Accuracy", home: "87%", away: "81%" },
  ],
  2: [
    { label: "Possession", home: "54%", away: "46%" },
    { label: "Shots", home: 11, away: 12 },
    { label: "Shots on Target", home: 4, away: 5 },
    { label: "Corners", home: 5, away: 6 },
    { label: "Fouls", home: 8, away: 11 },
    { label: "Yellow Cards", home: 2, away: 1 },
    { label: "Pass Accuracy", home: "89%", away: "84%" },
  ],
};
