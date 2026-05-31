import { useState } from "react";
import { Search, SlidersHorizontal, Tv, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { MATCHES, DEFAULT_SPORTS } from "../data";
import { SearchModal } from "./SearchModal";
import { EditSportsModal } from "./EditSportsModal";

interface FixturesScreenProps {
  followedSports: string[];
  onFollowedSportsChange: (sports: string[]) => void;
  onSelectFixture: (id: number) => void;
  onSelectArticle: (id: number) => void;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SPORT_COLORS: Record<string, string> = {
  Football: "bg-green-100 text-green-700",
  Tennis: "bg-yellow-100 text-yellow-700",
  Golf: "bg-emerald-100 text-emerald-700",
  Basketball: "bg-orange-100 text-orange-700",
  F1: "bg-red-100 text-red-700",
};

export function FixturesScreen({ followedSports, onFollowedSportsChange, onSelectFixture, onSelectArticle }: FixturesScreenProps) {
  const today = new Date("2026-05-28");
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showSearch, setShowSearch] = useState(false);
  const [showEditSports, setShowEditSports] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const myFilters = DEFAULT_SPORTS.filter((s) => followedSports.includes(s.id));

  // Generate 7-day strip centred around today + weekOffset
  const weekStart = addDays(today, weekOffset * 7 - 3);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const matchesForDay = MATCHES.filter((m) => {
    const md = new Date(m.date);
    const dayMatch = isSameDay(md, selectedDate);
    const sportMatch = activeFilter === "all"
      ? followedSports.includes(m.sport.toLowerCase())
      : m.sport.toLowerCase() === activeFilter;
    return dayMatch && sportMatch;
  });

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
        <span className="text-lg font-medium text-foreground">Fixtures</span>
        <button
          onClick={() => setShowSearch(true)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
        >
          <Search size={18} className="text-foreground" />
        </button>
      </div>

      {/* Sport filter pills */}
      <div className="px-4 pb-3">
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

      {/* Calendar section */}
      <div className="px-4 pb-3">
        {/* View mode toggle + month label */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setViewMode(viewMode === "day" ? "month" : viewMode === "month" ? "year" : "day")}
            className="text-sm font-medium text-foreground flex items-center gap-1"
          >
            {viewMode === "day" && `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
            {viewMode === "month" && `${selectedDate.getFullYear()}`}
            {viewMode === "year" && "Select Year"}
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => setWeekOffset((w) => w - 1)}
              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
            >
              <ChevronLeft size={14} className="text-foreground" />
            </button>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
            >
              <ChevronRight size={14} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Day strip */}
        {viewMode === "day" && (
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d) => {
              const isSelected = isSameDay(d, selectedDate);
              const isToday = isSameDay(d, today);
              const hasMatch = MATCHES.some((m) => isSameDay(new Date(m.date), d));
              return (
                <button
                  key={d.toISOString()}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center py-2 rounded-xl transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {DAY_NAMES[d.getDay()]}
                  </span>
                  <span className={`text-sm font-medium mt-0.5 ${isSelected ? "text-primary-foreground" : isToday ? "text-accent" : "text-foreground"}`}>
                    {d.getDate()}
                  </span>
                  {hasMatch && (
                    <span className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-primary-foreground/50" : "bg-accent"}`} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Month grid */}
        {viewMode === "month" && (
          <div className="grid grid-cols-4 gap-2 py-2">
            {MONTH_NAMES.map((month, i) => {
              const isSelected = selectedDate.getMonth() === i;
              return (
                <button
                  key={month}
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setMonth(i);
                    setSelectedDate(d);
                    setViewMode("day");
                  }}
                  className={`py-2.5 rounded-xl text-sm transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        )}

        {/* Year grid */}
        {viewMode === "year" && (
          <div className="grid grid-cols-4 gap-2 py-2">
            {[2024, 2025, 2026, 2027].map((yr) => {
              const isSelected = selectedDate.getFullYear() === yr;
              return (
                <button
                  key={yr}
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setFullYear(yr);
                    setSelectedDate(d);
                    setViewMode("month");
                  }}
                  className={`py-2.5 rounded-xl text-sm transition-colors ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Match list */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        {matchesForDay.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No fixtures on this date
          </div>
        ) : (
          matchesForDay.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectFixture(m.id)}
              className="w-full bg-white border border-border rounded-2xl p-4 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${SPORT_COLORS[m.sport] ?? "bg-gray-100 text-gray-600"}`}>
                  {m.competition}
                </span>
                <div className="flex items-center gap-1">
                  {m.status === "live" && (
                    <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      LIVE {m.minute}
                    </span>
                  )}
                  {m.status === "finished" && (
                    <span className="text-[10px] text-muted-foreground">FT</span>
                  )}
                  {m.status === "upcoming" && (
                    <span className="text-[10px] text-muted-foreground">{m.time}</span>
                  )}
                </div>
              </div>

              {/* Teams & Score */}
              <div className="flex items-center justify-between">
                <span className={`flex-1 text-sm ${m.status === "finished" && (m.homeScore ?? 0) > (m.awayScore ?? 0) ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {m.home}
                </span>
                <div className="flex items-center gap-3 mx-4">
                  {m.homeScore !== null ? (
                    <>
                      <span className="text-lg font-medium text-foreground">{m.homeScore}</span>
                      <span className="text-muted-foreground text-sm">–</span>
                      <span className="text-lg font-medium text-foreground">{m.awayScore}</span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">vs</span>
                  )}
                </div>
                <span className={`flex-1 text-right text-sm ${m.status === "finished" && (m.awayScore ?? 0) > (m.homeScore ?? 0) ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {m.away}
                </span>
              </div>

              {/* Broadcasters */}
              {m.broadcasters && m.broadcasters.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
                  <Tv size={11} className="text-muted-foreground shrink-0" />
                  <span className="text-[10px] text-muted-foreground">{m.broadcasters.join(" · ")}</span>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
