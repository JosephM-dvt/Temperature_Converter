import { useEffect, useState } from "react";
import teamData from "../data/team.json";
import { mapWeatherToEmoji } from "../utils/mapWeatherToEmoji";
import UserLocation from "./userLocation";
import {
  convertTemperature,
  formatTemp,
  type TemperatureUnit,
} from "../utils/tempConverter";

type WeatherData = {
  condition: string;
  icon: string;
  tempC: number;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  location: string;
};

const employees: TeamMember[] = teamData as TeamMember[];

type DisplayUnit = TemperatureUnit;
const UNIT_LABELS: Record<DisplayUnit, string> = {
  C: "°C",
  F: "°F",
  K: "K",
};

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const TeamDirectory = () => {
  const [query, setQuery] = useState<string>("");
  const [displayUnit, setDisplayUnit] = useState<DisplayUnit>("C");
  const [weatherMap, setWeatherMap] = useState<Record<number, WeatherData>>(
    {}
  );
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchWeather = async (member: TeamMember) => {
      if (weatherMap[member.id] || loadingIds.has(member.id)) return;
      setLoadingIds((prev) => new Set(prev).add(member.id));
      try {
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            member.location
          )}&limit=1&appid=${API_KEY}`
        );
        if (!geoRes.ok) throw new Error("Geocode failed");
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Location not found");
        const { lat, lon } = geoData[0];
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!weatherRes.ok) throw new Error("Weather fetch failed");
        const data = await weatherRes.json();
        const weather: WeatherData = {
          condition: data.weather?.[0]?.main ?? "Unknown",
          icon: mapWeatherToEmoji(data.weather?.[0]?.main),
          tempC: data.main?.temp ?? 0,
        };
        setWeatherMap((prev) => ({
          ...prev,
          [member.id]: weather,
        }));
      } catch (err) {
        console.error("Weather error:", err);
      }
    };
    employees.forEach(fetchWeather);
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.role.toLowerCase().includes(query.toLowerCase()) ||
      emp.location.toLowerCase().includes(query.toLowerCase())
  );

  const getDisplayTemp = (tempC: number): string => {
    const converted = convertTemperature(tempC, "C", displayUnit);
    return `${formatTemp(converted)} ${UNIT_LABELS[displayUnit]}`;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-black uppercase italic">Team Directory</h2>
        <p className="text-base-content/50 text-xs font-mono">
          {employees.length} members tracked
        </p>
      </div>

      <UserLocation unit={displayUnit} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-6">
        <input
          type="text"
          className="input input-bordered input-sm flex-1 font-mono focus:border-primary"
          placeholder="Filter by name, role, or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="join">
          {(Object.keys(UNIT_LABELS) as DisplayUnit[]).map((unit) => (
            <button
              key={unit}
              onClick={() => setDisplayUnit(unit)}
              className={`join-item btn btn-xs border-base-300 ${
                displayUnit === unit ? "btn-primary" : "btn-outline"
              }`}
            >
              {UNIT_LABELS[unit]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredEmployees.length === 0 ? (
          <div className="p-4 border border-dashed border-base-300 text-center text-sm font-mono opacity-50">
            No matches found for "{query}"
          </div>
        ) : (
          filteredEmployees.map((member) => {
            const weather = weatherMap[member.id];

            return (
              <div
                key={member.id}
                className="flex items-center gap-4 p-3 border border-base-200 hover:border-primary transition-colors"
              >
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-10 h-10 border border-primary">
                    <span className="text-sm font-bold">{member.avatar}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight">{member.name}</h3>
                  <p className="text-[10px] font-mono uppercase opacity-60">
                    {member.role}
                  </p>
                  <p className="text-[10px] font-bold underline decoration-primary">
                    {member.location}
                  </p>
                </div>

                <div className="text-right">
                  {weather ? (
                    <div className="flex flex-col items-end">
                      <span className="text-lg leading-none">{weather.icon}</span>
                      <span className="text-sm font-black italic">
                        {getDisplayTemp(weather.tempC)}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-base-content/40">
                        {weather.condition}
                      </span>
                    </div>
                  ) : (
                    <span className="loading loading-spinner loading-xs opacity-20"></span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TeamDirectory;