import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { FixturesScreen } from "./components/FixturesScreen";
import { FixtureDetailScreen } from "./components/FixtureDetailScreen";
import { ArticlesScreen } from "./components/ArticlesScreen";
import { ProfileScreen } from "./components/ProfileScreen";

type Tab = "home" | "fixtures" | "articles" | "profile";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    id: "fixtures",
    label: "Fixtures",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "articles",
    label: "Articles",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function App() {
  {/* MARKER-MAKE-KIT-INVOKED */}
  const [tab, setTab] = useState<Tab>("home");
  const [openFixtureId, setOpenFixtureId] = useState<number | null>(null);
  const [followedSports, setFollowedSports] = useState<string[]>(["football", "tennis", "golf"]);
  const [articleToOpen, setArticleToOpen] = useState<number | null>(null);

  const handleSelectFixture = (id: number) => {
    setOpenFixtureId(id);
    setTab("fixtures");
  };

  const handleSelectArticle = (id: number) => {
    setArticleToOpen(id);
    setTab("articles");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Phone shell */}
      <div
        className="relative w-full max-w-sm bg-background overflow-hidden"
        style={{ height: "812px", borderRadius: "40px", boxShadow: "0 40px 100px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)" }}
      >
        {/* Scrollable content */}
        <div
          className="absolute inset-0 overflow-y-auto scrollbar-hide pb-16"
          style={{ display: tab === "home" ? "block" : "none" }}
        >
          <HomeScreen
            followedSports={followedSports}
            onFollowedSportsChange={setFollowedSports}
            onSelectFixture={handleSelectFixture}
            onSelectArticle={handleSelectArticle}
          />
        </div>

        <div
          className="absolute inset-0 overflow-y-auto scrollbar-hide pb-16"
          style={{ display: tab === "fixtures" ? "flex" : "none", flexDirection: "column" }}
        >
          {openFixtureId !== null ? (
            <FixtureDetailScreen
              matchId={openFixtureId}
              onBack={() => setOpenFixtureId(null)}
            />
          ) : (
            <FixturesScreen
              followedSports={followedSports}
              onFollowedSportsChange={setFollowedSports}
              onSelectFixture={setOpenFixtureId}
              onSelectArticle={(id) => { setTab("articles"); setArticleToOpen(id); }}
            />
          )}
        </div>

        <div
          className="absolute inset-0 overflow-y-auto scrollbar-hide pb-16"
          style={{ display: tab === "articles" ? "flex" : "none", flexDirection: "column" }}
        >
          <ArticlesScreen
            followedSports={followedSports}
            onSelectFixture={handleSelectFixture}
            initialOpenId={articleToOpen}
          />
        </div>

        <div
          className="absolute inset-0 overflow-y-auto scrollbar-hide pb-16"
          style={{ display: tab === "profile" ? "block" : "none" }}
        >
          <ProfileScreen followedSports={followedSports} />
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border">
          <nav className="flex items-center justify-around px-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "fixtures") setOpenFixtureId(null);
                  setTab(item.id);
                }}
                className={`flex flex-col items-center gap-0.5 py-2.5 px-4 transition-colors ${
                  tab === item.id ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="text-[10px] tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
