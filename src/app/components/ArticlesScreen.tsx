import { useState } from "react";
import { Search, Bookmark, Clock, Send, ChevronLeft, X } from "lucide-react";
import { ARTICLES, DEFAULT_SPORTS } from "../data";
import { SearchModal } from "./SearchModal";

interface ArticlesScreenProps {
  followedSports: string[];
  onSelectFixture: (id: number) => void;
  initialOpenId?: number | null;
}

const CATEGORIES = ["All", "Analysis", "Preview", "Transfer"];

const INITIAL_COMMENTS: Record<number, { id: number; user: string; avatar: string; text: string; time: string }[]> = {
  1: [
    { id: 1, user: "TacticsNerd", avatar: "T", text: "Really insightful breakdown. Rice has been the signing of the decade for Arsenal.", time: "1h ago" },
    { id: 2, user: "GunnerForever", avatar: "G", text: "The pressing stats this season have been incredible. Arteta's best work yet.", time: "3h ago" },
  ],
  2: [
    { id: 3, user: "TennisFan", avatar: "T", text: "Alcaraz on clay is something special. The way he handles Djokovic's serve is different.", time: "2h ago" },
  ],
};

export function ArticlesScreen({ followedSports, onSelectFixture, initialOpenId }: ArticlesScreenProps) {
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const [openArticleId, setOpenArticleId] = useState<number | null>(initialOpenId ?? null);
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState(INITIAL_COMMENTS);

  const filtered = ARTICLES.filter((a) => {
    const sportMatch = followedSports.includes(a.sport.toLowerCase()) || followedSports.length === 0;
    const catMatch = category === "All" || a.category === category;
    return sportMatch && catMatch;
  });
  const displayArticles = filtered.length > 0 ? filtered : ARTICLES.filter((a) => category === "All" || a.category === category);

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submitComment = (articleId: number) => {
    const text = commentText.trim();
    if (!text) return;
    setAllComments((prev) => ({
      ...prev,
      [articleId]: [
        { id: Date.now(), user: "You", avatar: "Y", text, time: "Just now" },
        ...(prev[articleId] ?? []),
      ],
    }));
    setCommentText("");
  };

  if (showSearch) {
    return (
      <SearchModal
        onClose={() => setShowSearch(false)}
        onSelectFixture={(id) => { setShowSearch(false); onSelectFixture(id); }}
        onSelectArticle={(id) => { setShowSearch(false); setOpenArticleId(id); }}
      />
    );
  }

  // Article detail view
  if (openArticleId !== null) {
    const article = ARTICLES.find((a) => a.id === openArticleId);
    if (!article) return null;
    const comments = allComments[openArticleId] ?? [];
    return (
      <div className="flex flex-col h-full">
        {/* Back bar */}
        <div className="flex items-center gap-3 px-4 pt-12 pb-3 bg-white border-b border-border">
          <button
            onClick={() => setOpenArticleId(null)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <span className="text-xs text-muted-foreground flex-1 truncate">{article.category}</span>
          <button onClick={() => toggleSave(article.id)}>
            <Bookmark
              size={18}
              className={saved.has(article.id) ? "fill-accent text-accent" : "text-muted-foreground"}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <img src={article.image} alt={article.title} className="w-full h-48 object-cover bg-muted" />
          <div className="px-5 py-4">
            <h2 className="text-foreground leading-snug mb-2">{article.title}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span>{article.author}</span>
              <span>·</span>
              <Clock size={11} />
              <span>{article.readTime}</span>
              <span>·</span>
              <span>{article.date}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-3">{article.summary}</p>
            <p className="text-sm text-foreground leading-relaxed mb-3">
              The tactical nuances of this season have been fascinating to observe. With pressing intensity reaching new heights and positional play becoming ever more sophisticated, the modern game continues to evolve at a rapid pace.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Looking ahead, the summer transfer window will be crucial in determining whether top clubs can maintain their competitive edge. Squad depth, tactical flexibility, and financial prudence will be the defining factors.
            </p>
          </div>

          {/* Comments section */}
          <div className="px-5 pb-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Comments ({comments.length})</p>
            <div className="flex flex-col gap-3 mb-3">
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
                    <p className="text-sm text-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Be the first to comment</p>
              )}
            </div>
          </div>
        </div>

        {/* Comment input */}
        <div className="px-4 py-3 bg-background border-t border-border">
          <div className="flex items-center gap-2 bg-secondary rounded-2xl px-4 py-2.5">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitComment(openArticleId)}
              placeholder="Share your thoughts…"
              className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={() => submitComment(openArticleId)}
              disabled={!commentText.trim()}
              className="text-accent disabled:text-muted-foreground transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <span className="text-lg font-medium text-foreground">Articles</span>
        <button
          onClick={() => setShowSearch(true)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
        >
          <Search size={18} className="text-foreground" />
        </button>
      </div>

      {/* Category pills */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm transition-colors ${
                category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {displayArticles[0] && (
        <div className="px-4 mb-4">
          <button
            onClick={() => setOpenArticleId(displayArticles[0].id)}
            className="w-full rounded-2xl overflow-hidden border border-border bg-white text-left"
          >
            <div className="relative">
              <img src={displayArticles[0].image} alt={displayArticles[0].title} className="w-full h-44 object-cover bg-muted" />
              <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                {displayArticles[0].category}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-foreground leading-snug mb-1.5">{displayArticles[0].title}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{displayArticles[0].author}</span>
                  <span>·</span>
                  <Clock size={10} />
                  <span>{displayArticles[0].readTime}</span>
                  <span>·</span>
                  <span>{displayArticles[0].date}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(displayArticles[0].id); }}
                  className="transition-colors"
                >
                  <Bookmark
                    size={16}
                    className={saved.has(displayArticles[0].id) ? "fill-accent text-accent" : "text-muted-foreground"}
                  />
                </button>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* List */}
      <div className="px-4 flex flex-col gap-3 pb-6">
        {displayArticles.slice(1).map((a) => (
          <button
            key={a.id}
            onClick={() => setOpenArticleId(a.id)}
            className="flex gap-3 bg-white border border-border rounded-2xl p-3 text-left"
          >
            <img src={a.image} alt={a.title} className="w-20 h-20 rounded-xl object-cover bg-muted shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <span className="text-[10px] text-accent font-medium">{a.category}</span>
                <p className="text-sm text-foreground leading-snug mt-0.5 line-clamp-2">{a.title}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={10} />
                  <span>{a.readTime}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleSave(a.id); }} className="transition-colors">
                  <Bookmark
                    size={15}
                    className={saved.has(a.id) ? "fill-accent text-accent" : "text-muted-foreground"}
                  />
                </button>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
