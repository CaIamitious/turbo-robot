export type Sport = { id: string; label: string; emoji: string };
export type Team = { id: string; name: string; sport: string; badge: string };
export type Player = { id: string; name: string; sport: string; country: string };

export type Match = {
  id: number;
  sport: string;
  competition: string;
  date: string;
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

const SPORTSDB_BASE = "https://www.thesportsdb.com/api/v1/json/123";

async function fetchFootballMatches(): Promise<Match[]> {
  try {
    const leagues = [4328, 4335, 4331];
    const results: Match[] = [];
    for (const leagueId of leagues) {
      const res = await fetch(`${SPORTSDB_BASE}/eventspastleague.php?id=${leagueId}`);
      const data = await res.json();
      if (!data.events) continue;
      for (const e of data.events) {
        results.push({
          id: parseInt(e.idEvent),
          sport: "Football",
          competition: e.strLeague,
          date: e.dateEvent,
          time: e.strTime?.slice(0, 5) ?? "TBC",
          home: e.strHomeTeam,
          homeBadge: e.strHomeTeam.slice(0, 3).toUpperCase(),
          away: e.strAwayTeam,
          awayBadge: e.strAwayTeam.slice(0, 3).toUpperCase(),
          homeScore: e.intHomeScore ? parseInt(e.intHomeScore) : null,
          awayScore: e.intAwayScore ? parseInt(e.intAwayScore) : null,
          status: e.strStatus === "FT" ? "finished" : e.strStatus === "In Progress" ? "live" : "upcoming",
          venue: e.strVenue ?? undefined,
        });
      }
    }
    return results;
  } catch {
    return [];
  }
}

async function fetchTennisMatches(): Promise<Match[]> {
  try {
    const res = await fetch(`${SPORTSDB_BASE}/eventspastleague.php?id=4887`);
    const data = await res.json();
    if (!data.events) return [];
    return data.events.map((e: any, i: number) => ({
      id: 10000 + i,
      sport: "Tennis",
      competition: e.strLeague,
      date: e.dateEvent,
      time: e.strTime?.slice(0, 5) ?? "TBC",
      home: e.strHomeTeam,
      homeBadge: e.strHomeTeam.slice(0, 3).toUpperCase(),
      away: e.strAwayTeam,
      awayBadge: e.strAwayTeam.slice(0, 3).toUpperCase(),
      homeScore: e.intHomeScore ? parseInt(e.intHomeScore) : null,
      awayScore: e.intAwayScore ? parseInt(e.intAwayScore) : null,
      status: e.strStatus === "FT" ? "finished" : e.strStatus === "In Progress" ? "live" : "upcoming",
      venue: e.strVenue ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function fetchAllMatches(): Promise<Match[]> {
  const [football, tennis] = await Promise.all([
    fetchFootballMatches(),
    fetchTennisMatches(),
  ]);
  const all = [...football, ...tennis];
  return all.length > 0 ? all : MATCHES;
}

export const MATCHES: Match[] = [
  {
    id: 1,
    sport: "Football",
    competition: "Premier League",
    date: "2026-05-24",
    time: "15:00",
    home: "West Ham United",
    homeBadge: "WHU",
    away: "Leeds United",
    awayBadge: "LEE",
    homeScore: 3,
    awayScore: 0,
    status: "finished",
    venue: "London Stadium",
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
    status: "finished",
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
    status: "finished",
    venue: "Court Philippe-Chatrier, Paris",
  },
  {
    id: 4,
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
    title: "McIlroy shoots -8 t
