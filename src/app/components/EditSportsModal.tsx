import { X, Plus, Check } from "lucide-react";
import { Sport, DEFAULT_SPORTS } from "../data";

interface EditSportsModalProps {
  activeSports: string[];
  onSave: (sports: string[]) => void;
  onClose: () => void;
}

export function EditSportsModal({ activeSports, onSave, onClose }: EditSportsModalProps) {
  const toggle = (id: string) => {
    if (activeSports.includes(id)) {
      onSave(activeSports.filter((s) => s !== id));
    } else {
      onSave([...activeSports, id]);
    }
  };

  return (
    <div className="absolute inset-0 bg-background z-50 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-14 pb-4 border-b border-border">
        <h2 className="text-foreground">My Sports</h2>
        <button onClick={onClose}>
          <X size={22} className="text-muted-foreground" />
        </button>
      </div>
      <p className="px-5 py-4 text-sm text-muted-foreground">
        Select the sports you follow. These will personalise your feed, fixtures and articles.
      </p>
      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex flex-col gap-2">
          {DEFAULT_SPORTS.map((sport) => {
            const active = activeSports.includes(sport.id);
            return (
              <button
                key={sport.id}
                onClick={() => toggle(sport.id)}
                className={`flex items-center gap-4 py-3.5 px-4 rounded-2xl border transition-colors ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <span className="text-2xl">{sport.emoji}</span>
                <span className={`flex-1 text-sm text-left ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {sport.label}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    active ? "border-primary bg-primary" : "border-border"
                  }`}
                >
                  {active && <Check size={13} className="text-primary-foreground" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-5 py-4">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-medium"
        >
          Done
        </button>
      </div>
    </div>
  );
}
