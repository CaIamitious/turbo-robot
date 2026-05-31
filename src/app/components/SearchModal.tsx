import { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { MATCHES, ARTICLES, DEFAULT_SPORTS } from "../data";

interface SearchModalProps {
  onClose: () => void;
  onSelectFixture: (id: number) => void;
  onSelectArticle: (id: number) => void;
}

export function SearchModal({ onClose, onSelectFixture, onSelectArticle }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.toLowerCase().trim();

  const matchedMatches = q.length > 1
    ? MATCHES.filter(
        (m) =>
          m.home.toLowerCase().includes(q) ||
          m.away.toLowerCase().includes(q) ||
          m.competition.toLowerCase().includes(q) ||
          m.sport.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedArticles = q.length > 1
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchedSports = q.length > 1
    ? DEFAULT_SPORTS.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const hasResults = matchedMatches.length + matchedArticles.length + matchedSports.length > 0;

  return (
    <div className="absolute inset-0 bg-background z-50 flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-3 border-b border-border">
        <Search size={18} className="text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sports, teams, players…"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
        <button onClick={onClose}>
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {q.length < 2 && (
          <div className="px-5 pt-8 text-center text-muted-foreground text-sm">
            Search for sports, teams, players, fixtures or articles
          </div>
        )}

        {q.length >= 2 && !hasResults && (
          <div className="px-5 pt-8 text-center text-muted-foreground text-sm">
            No results for "{query}"
          </div>
        )}

        {matchedSports.length > 0 && (
          <section className="px-4 pt-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Sports</p>
            <div className="flex flex-col gap-1">
              {matchedSports.map((s) => (
                <button
                  key={s.id}
                  onClick={onClose}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-sm text-foreground">{s.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {matchedMatches.length > 0 && (
          <section className="px-4 pt-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Fixtures</p>
            <div className="flex flex-col gap-1">
              {matchedMatches.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { onSelectFixture(m.id); onClose(); }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                    {m.homeBadge}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{m.home} vs {m.away}</p>
                    <p className="text-xs text-muted-foreground">{m.competition}</p>
                  </div>
                  {m.status === "live" && (
                    <span className="text-xs text-red-500 font-medium shrink-0">{m.minute}</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {matchedArticles.length > 0 && (
          <section className="px-4 pt-5 pb-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Articles</p>
            <div className="flex flex-col gap-1">
              {matchedArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { onSelectArticle(a.id); onClose(); }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.readTime} · {a.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
