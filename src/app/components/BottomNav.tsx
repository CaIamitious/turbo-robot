import { Home, Calendar, Newspaper, User } from "lucide-react";

type Tab = "home" | "fixtures" | "articles" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const items: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "home", icon: <Home size={22} />, label: "Home" },
    { id: "fixtures", icon: <Calendar size={22} />, label: "Fixtures" },
    { id: "articles", icon: <Newspaper size={22} />, label: "Articles" },
    { id: "profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-border flex items-center justify-around px-2 pb-safe z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex flex-col items-center gap-0.5 py-3 px-4 transition-colors ${
            active === item.id
              ? "text-accent"
              : "text-muted-foreground"
          }`}
        >
          {item.icon}
          <span className="text-[10px] tracking-wide">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
