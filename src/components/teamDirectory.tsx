import { useEffect, useState } from "react";
import teamData from "../data/team.json";
import { mapWeatherToEmoji } from "../utils/mapWeatherToEmoji";
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
console.log(API_KEY);

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
      <h2 className="text-2xl font-bold mb-1">👥 Team Directory</h2>
      <p className="text-gray-500 text-sm mb-4">
        {employees.length} members · live local weather
      </p>

      {/* Controls */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center mb-4">
        <input
          type="text"
          className="border border-gray-400 rounded text-sm flex-1 focus:outline-none focus:border-blue-500"
          placeholder="Search by name, role, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex gap-1">
          {(Object.keys(UNIT_LABELS) as DisplayUnit[]).map((unit) => (
            <button
              key={unit}
              onClick={() => setDisplayUnit(unit)}
              className={`text-sm border rounded ${
                displayUnit === unit
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-400 text-gray-700"
              }`}
            >
              {UNIT_LABELS[unit]}
            </button>
          ))}
        </div>
      </div>

      {query && (
        <p className="text-xs text-gray-500 ">
          Showing {filteredEmployees.length} of {employees.length} members
        </p>
      )}

      <div className="flex flex-col gap-2">
        {filteredEmployees.length === 0 ? (
          <div className="bg-white border border-gray-300 rounded text-center text-gray-500">
            No members match "{query}"
          </div>
        ) 
        :
        (
          filteredEmployees.map((member) => {
            const weather = weatherMap[member.id];

            return (
              <div
                key={member.id}
                className="bg-white border border-gray-300 rounded p-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {member.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">
                    {member.role} · {member.location}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  {weather ? (
                    <>
                      <div className="text-xl">{weather.icon}</div>
                      <div className="text-sm font-bold text-blue-600">
                        {getDisplayTemp(weather.tempC)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {weather.condition}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-400">Loading...</div>
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

