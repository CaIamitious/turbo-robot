import { useState } from "react";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { MATCHES, ARTICLES, DEFAULT_SPORTS } from "../data";
import { EditSportsModal } from "./EditSportsModal";
import { SearchModal } from "./SearchModal";

interface HomeScreenProps {
  followedSports: string[];
  onFollowedSportsChange: (sports: string[]) => void;
  onSelectFixture: (id: number) => void;
  onSelectArticle: (id: number) => void;
}

const SPORT_COLORS: Record<string, string> = {
  Football: "bg-green-100 text-green-700",
  Tennis: "bg-yellow-100 text-yellow-700",
  Golf: "bg-emerald-100 text-emerald-700",
  Basketball: "bg-orange-100 text-orange-700",
  F1: "bg-red-100 text-red-700",
  Cricket: "bg-lime-100 text-lime-700",
  Rugby: "bg-purple-100 text-purple-700",
  Cycling: "bg-blue-100 text-blue-700",
};

export function HomeScreen({ followedSports, onFollowedSportsChange, onSelectFixture, onSelectArticle }: HomeScreenProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showEditSports, setShowEditSports] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const myFilters = DEFAULT_SPORTS.filter((s) => followedSports.includes(s.id));

  // Matches filtered by sport selection
  const filteredMatches = MATCHES.filter((m) => {
    if (activeFilter === "all") return followedSports.includes(m.sport.toLowerCase());
    return m.sport.toLowerCase() === activeFilter;
  });

  const liveMatches = filteredMatches.filter((m) => m.status === "live");

  // When no live, show upcoming; when no upcoming either, show recent results
  const upcomingMatches = filteredMatches.filter((m) => m.status === "upcoming").slice(0, 4);
  const recentResults = filteredMatches.filter((m) => m.status === "finished").slice(0, 3);

  // Personalised articles — prioritise sports user follows
  const filteredArticles = ARTICLES.filter((a) => {
    if (activeFilter === "all") return followedSports.includes(a.sport.toLowerCase());
    return a.sport.toLowerCase() === activeFilter;
  });

  // Fallback to all articles if no match
  const articles = filteredArticles.length > 0 ? filteredArticles : ARTICLES;

  if (showSearch) {
    return (
      <SearchModal
        onClose={() => setShowSearch(false)}
        onSelectFixture={(id) => { setShowSearch(false); onSelectFixture(id); }}
        onSelectArticle={(id) => { setShowSearch(false); onSelectArticle(id); }}
      />
    );
  }

  if (showEditSports) {
    return (
      <EditSportsModal
        activeSports={followedSports}
        onSave={onFollowedSportsChange}
        onClose={() => setShowEditSports(false)}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <span className="text-lg font-medium text-foreground">SportsPulse</span>
        <button
          onClick={() => setShowSearch(true)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
        >
          <Search size={18} className="text-foreground" />
        </button>
      </div>

      {/* Sport filter pills */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 items-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm transition-colors ${
              activeFilter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            All
          </button>
          {myFilters.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setActiveFilter(sport.id)}
              className={`shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm transition-colors ${
                activeFilter === sport.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              <span className="text-xs">{sport.emoji}</span>
              {sport.label}
            </button>
          ))}
          <button
            onClick={() => setShowEditSports(true)}
            className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <SlidersHorizontal size={15} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Live section */}
      {liveMatches.length > 0 ? (
        <section className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium tracking-widest uppercase text-foreground">Live</span>
            </div>
            <button className="text-xs text-accent flex items-center gap-0.5">
              All <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
            {liveMatches.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectFixture(m.id)}
                className="shrink-0 w-52 bg-primary rounded-2xl p-3.5 text-primary-foreground text-left"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] opacity-55 uppercase tracking-wide truncate mr-2">{m.competition}</span>
                  <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full shrink-0">{m.minute}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-medium">
                      {m.homeBadge}
                    </div>
                    <span className="text-[10px] opacity-70 text-center leading-tight">{m.home}</span>
                  </div>
                  <div className="flex items-center gap-2 mx-2">
                    <span className="text-xl font-medium">{m.homeScore}</span>
                    <span className="text-base opacity-30">–</span>
                    <span className="text-xl font-medium">{m.awayScore}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-medium">
                      {m.awayBadge}
                    </div>
                    <span className="text-[10px] opacity-70 text-center leading-tight">{m.away}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : upcomingMatches.length > 0 ? (
        /* No live — show upcoming */
        <section className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-medium tracking-widest uppercase text-foreground">Upcoming</span>
          </div>
          <div className="flex flex-col divide-y divide-border rounded-2xl overflow-hidden border border-border bg-white">
            {upcomingMatches.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectFixture(m.id)}
                className="flex items-center px-4 py-3 gap-3 text-left"
              >
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${SPORT_COLORS[m.sport] ?? "bg-gray-100 text-gray-600"}`}>
                  {m.sport}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{m.home} <span className="text-muted-foreground">vs</span> {m.away}</p>
                  <p className="text-xs text-muted-foreground">{m.competition}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{m.time}</span>
              </button>
            ))}
          </div>
        </section>
      ) : recentResults.length > 0 ? (
        /* No live, no upcoming — show recent results */
        <section className="px-4 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-foreground mb-2.5">Recent Results</p>
          <div className="flex flex-col divide-y divide-border rounded-2xl overflow-hidden border border-border bg-white">
            {recentResults.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectFixture(m.id)}
                className="flex items-center px-4 py-3 gap-3 text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{m.home} <span className="text-muted-foreground">vs</span> {m.away}</p>
                  <p className="text-xs text-muted-foreground">{m.competition}</p>
                </div>
                <span className="text-sm font-medium text-foreground shrink-0">
                  {m.homeScore} – {m.awayScore}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {/* Personalised articles */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium tracking-widest uppercase text-foreground">For You</span>
          <button className="text-xs text-accent flex items-center gap-0.5">
            More <ChevronRight size={12} />
          </button>
        </div>

        {/* Featured article */}
        {articles[0] && (
          <button
            onClick={() => onSelectArticle(articles[0].id)}
            className="w-full rounded-2xl overflow-hidden border border-border bg-white mb-3 text-left"
          >
            <div className="relative">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-40 object-cover bg-muted"
              />
              <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                {articles[0].category}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-foreground leading-snug mb-1">{articles[0].title}</p>
              <p className="text-xs text-muted-foreground">{articles[0].author} · {articles[0].readTime} · {articles[0].date}</p>
            </div>
          </button>
        )}

        {/* Compact list */}
        <div className="flex flex-col gap-2">
          {articles.slice(1, 4).map((a) => (
            <button
              key={a.id}
              onClick={() => onSelectArticle(a.id)}
              className="flex gap-3 bg-white border border-border rounded-2xl p-3 text-left"
            >
              <img src={a.image} alt={a.title} className="w-16 h-16 rounded-xl object-cover bg-muted shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-[10px] text-accent font-medium">{a.category}</span>
                <p className="text-sm text-foreground leading-snug mt-0.5 line-clamp-2">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.readTime} · {a.date}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
