import { useState, useRef } from "react";
import { ChevronRight, Bell, Heart, Trophy, Bookmark, Settings, Check, X, Camera } from "lucide-react";
import { DEFAULT_SPORTS } from "../data";

interface ProfileScreenProps {
  followedSports: string[];
}

export function ProfileScreen({ followedSports }: ProfileScreenProps) {
  const [username, setUsername] = useState("Alex Johnson");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username);
  const [avatarColor, setAvatarColor] = useState("#0d0d0d");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarImg, setAvatarImg] = useState<string | null>(null);

  const mySports = DEFAULT_SPORTS.filter((s) => followedSports.includes(s.id));

  const saveName = () => {
    if (nameInput.trim()) setUsername(nameInput.trim());
    setEditingName(false);
  };

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarImg(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const AVATAR_COLORS = ["#0d0d0d", "#16a34a", "#2563eb", "#9333ea", "#dc2626", "#ea580c"];

  const MENU = [
    { icon: <Bell size={17} />, label: "Notifications", value: "On" },
    { icon: <Heart size={17} />, label: "Following", value: `${mySports.length} sports` },
    { icon: <Trophy size={17} />, label: "My Competitions", value: "5" },
    { icon: <Bookmark size={17} />, label: "Saved Articles", value: "12" },
    { icon: <Settings size={17} />, label: "Settings", value: "" },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-12 pb-5">
        <p className="text-lg font-medium text-foreground mb-5">Profile</p>

        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center relative"
              style={{ backgroundColor: avatarImg ? "transparent" : avatarColor }}
            >
              {avatarImg ? (
                <img src={avatarImg} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-medium text-white">{username[0]}</span>
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
                <Camera size={16} className="text-white" />
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFile}
            />
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  className="flex-1 text-sm text-foreground bg-secondary rounded-lg px-3 py-1.5 outline-none"
                />
                <button onClick={saveName} className="text-accent">
                  <Check size={16} strokeWidth={2.5} />
                </button>
                <button onClick={() => setEditingName(false)} className="text-muted-foreground">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => { setNameInput(username); setEditingName(true); }} className="text-left">
                  <p className="font-medium text-foreground">{username}</p>
                  <p className="text-xs text-accent mt-0.5">Tap to edit name</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Avatar colour picker */}
        {!avatarImg && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Colour</span>
            {AVATAR_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setAvatarColor(c)}
                className="w-6 h-6 rounded-full transition-transform"
                style={{
                  backgroundColor: c,
                  outline: avatarColor === c ? `2px solid ${c}` : "none",
                  outlineOffset: "2px",
                  transform: avatarColor === c ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}
        {avatarImg && (
          <button
            onClick={() => setAvatarImg(null)}
            className="mt-2 text-xs text-muted-foreground underline"
          >
            Remove photo
          </button>
        )}
      </div>

      {/* Following sports */}
      {mySports.length > 0 && (
        <section className="px-5 mb-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Following</p>
          <div className="flex gap-3 flex-wrap">
            {mySports.map((sport) => (
              <div key={sport.id} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-xl">
                  {sport.emoji}
                </div>
                <span className="text-xs text-foreground">{sport.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="px-5 mb-6">
        <div className="flex flex-col divide-y divide-border rounded-2xl overflow-hidden border border-border bg-white">
          {MENU.map((item) => (
            <button
              key={item.label}
              className="flex items-center px-4 py-3.5 gap-3 text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="flex-1 text-sm text-foreground">{item.label}</span>
              {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              <ChevronRight size={15} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
