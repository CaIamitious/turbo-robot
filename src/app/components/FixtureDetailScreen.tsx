import { useState } from "react";
import { ChevronLeft, Tv, MapPin, Send } from "lucide-react";
import { MATCHES, LINEUPS, MATCH_STATS } from "../data";

interface FixtureDetailScreenProps {
  matchId: number;
  onBack: () => void;
}

type TabId = "overview" | "lineups" | "stats" | "comments";

const COMMENTARY = [
  { time: "73'", text: "GOAL! Arsenal take the lead! Saka cuts inside and fires into the bottom corner. 2–1!" },
  { time: "68'", text: "Close! Martinelli's low cross is just out of reach for Jesus." },
  { time: "55'", text: "Chelsea equalise through Nkunku — a fine header from a Chilwell cross. 1–1." },
  { time: "44'", text: "Yellow card for Chalobah after a late tackle on Havertz." },
  { time: "34'", text: "Arsenal open the scoring! Odegaard threads a brilliant pass to Jesus who slots home. 1–0." },
  { time: "20'", text: "Big chance for Chelsea — Jackson heads wide from close range." },
  { time: "8'", text: "Rice wins the ball back high up the pitch, Arsenal pressing from the off." },
  { time: "1'", text: "Kick-off at the Emirates. Packed house for this London derby." },
];

const INITIAL_COMMENTS = [
  { id: 1, user: "GoalMachine88", avatar: "G", text: "Saka has been unreal today. Completely unplayable on that right flank.", time: "2m ago" },
  { id: 2, user: "BlueIsTheColour", avatar: "B", text: "Chelsea need to make a change. This midfield isn't pressing at all.", time: "5m ago" },
  { id: 3, user: "FootballNerd", avatar: "F", text: "Rice's stats this season have been incredible. Proper midfield general.", time: "12m ago" },
];

export function FixtureDetailScreen({ matchId, onBack }: FixtureDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  const match = MATCHES.find((m) => m.id === matchId);
  if (!match) return null;

  const lineups = LINEUPS[matchId];
  const stats = MATCH_STATS[matchId];

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: match.status === "live" ? "Commentary" : "Overview" },
    { id: "lineups", label: "Lineups" },
    { id: "stats", label: "Stats" },
    { id: "comments", label: `Comments (${comments.length})` },
  ];

  const submitComment = () => {
    const text = commentText.trim();
    if (!text) return;
    setComments((prev) => [
      { id: Date.now(), user: "You", avatar: "Y", text, time: "Just now" },
      ...prev,
    ]);
    setCommentText("");
  };

  const statusColor =
    match.status === "live" ? "text-red-500" : match.status === "finished" ? "text-muted-foreground" : "text-accent";
  const statusLabel =
    match.status === "live" ? `LIVE · ${match.minute}` : match.status === "finished" ? "Full Time" : match.time;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{match.competition}</p>
          </div>
          {match.status === "live" && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Score block */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
              {match.homeBadge}
            </div>
            <span className="text-sm text-foreground text-center leading-tight">{match.home}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {match.homeScore !== null ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-medium text-foreground">{match.homeScore}</span>
                <span className="text-xl text-muted-foreground">–</span>
                <span className="text-3xl font-medium text-foreground">{match.awayScore}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl text-muted-foreground">vs</span>
              </div>
            )}
            <span className={`text-xs font-medium ${statusColor}`}>{statusLabel}</span>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-sm font-medium text-foreground">
              {match.awayBadge}
            </div>
            <span className="text-sm text-foreground text-center leading-tight">{match.away}</span>
          </div>
        </div>

        {/* Meta info */}
        {(match.venue || match.broadcasters) && (
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {match.venue}
              </span>
            )}
            {match.broadcasters && match.broadcasters.length > 0 && (
              <span className="flex items-center gap-1">
                <Tv size={11} />
                {match.broadcasters[0]}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-white overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 px-4 py-3 text-sm transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-foreground font-medium"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {/* Overview / Commentary */}
        {activeTab === "overview" && (
          <div className="px-4 py-4">
            {match.status === "live" && (
              <div className="flex flex-col gap-3">
                {COMMENTARY.map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-xs text-accent font-medium w-8 shrink-0 pt-0.5">{c.time}</span>
                    <p className="text-sm text-foreground leading-relaxed flex-1">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
            {match.status !== "live" && (
              <div>
                <div className="bg-secondary rounded-2xl p-4 mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Match Info</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Competition</span>
                      <span className="text-foreground">{match.competition}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground">{match.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kick-off</span>
                      <span className="text-foreground">{match.time}</span>
                    </div>
                    {match.venue && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Venue</span>
                        <span className="text-foreground text-right ml-4">{match.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
                {match.broadcasters && match.broadcasters.length > 0 && (
                  <div className="bg-secondary rounded-2xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Watch / Listen</p>
                    <div className="flex flex-col gap-2">
                      {match.broadcasters.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm text-foreground">
                          <Tv size={14} className="text-muted-foreground" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Lineups */}
        {activeTab === "lineups" && (
          <div className="px-4 py-4">
            {lineups ? (
              <div className="flex gap-4">
                {/* Home */}
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{match.home}</p>
                  <div className="flex flex-col gap-2">
                    {lineups.home.map((player, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-foreground">{player}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-4 mb-2">Subs</p>
                  <div className="flex flex-col gap-2">
                    {lineups.homeSubs.map((player, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-5 text-right">{11 + i + 1}</span>
                        <span className="text-sm text-muted-foreground">{player}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px bg-border" />

                {/* Away */}
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{match.away}</p>
                  <div className="flex flex-col gap-2">
                    {lineups.away.map((player, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
                        <span className="text-sm text-foreground">{player}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-4 mb-2">Subs</p>
                  <div className="flex flex-col gap-2">
                    {lineups.awaySubs.map((player, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-5 text-right">{11 + i + 1}</span>
                        <span className="text-sm text-muted-foreground">{player}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Lineups not yet available</p>
            )}
          </div>
        )}

        {/* Stats */}
        {activeTab === "stats" && (
          <div className="px-4 py-4">
            {stats ? (
              <div className="flex flex-col gap-4">
                {stats.map((stat, i) => {
                  const homeVal = parseFloat(String(stat.home));
                  const awayVal = parseFloat(String(stat.away));
                  const total = homeVal + awayVal || 1;
                  const homePct = (homeVal / total) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground font-medium">{stat.home}</span>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <span className="text-sm text-foreground font-medium">{stat.away}</span>
                      </div>
                      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
                        <div
                          className="rounded-l-full bg-primary transition-all"
                          style={{ width: `${homePct}%` }}
                        />
                        <div
                          className="rounded-r-full bg-secondary transition-all"
                          style={{ width: `${100 - homePct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Stats not yet available</p>
            )}
          </div>
        )}

        {/* Comments */}
        {activeTab === "comments" && (
          <div className="flex flex-col">
            <div className="px-4 pt-4 pb-2 flex flex-col gap-3">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1 bg-secondary rounded-2xl rounded-tl-sm px-3 py-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-foreground">{c.user}</span>
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Comment input */}
            <div className="sticky bottom-0 px-4 py-3 bg-background border-t border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2.5">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitComment()}
                  placeholder="Share your thoughts…"
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={submitComment}
                  disabled={!commentText.trim()}
                  className="text-accent disabled:text-muted-foreground transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
