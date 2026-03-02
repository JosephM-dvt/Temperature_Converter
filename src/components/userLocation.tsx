import { useEffect, useState } from "react";
import { mapWeatherToEmoji } from "../utils/mapWeatherToEmoji";
import { convertTemperature, formatTemp, type TemperatureUnit } from "../utils/tempConverter";

type WeatherData = {
  city: string;
  tempC: number;
  condition: string;
  icon: string;
};

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const UserLocation = ({ unit }: { unit: TemperatureUnit }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getUserWeather = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await res.json();
            
            setWeather({
              city: data.name,
              tempC: data.main.temp,
              condition: data.weather[0].main,
              icon: mapWeatherToEmoji(data.weather[0].main),
            });
          } catch (err) {
            setError("Failed to fetch weather:");
            console.warn(err);
          }
        },
        () => setError("Location access denied")
      );
    };

    getUserWeather();
  }, []);

  if (error) {
    return (
      <div className="p-3 border border-dashed border-base-300 mb-6 text-[10px] font-mono opacity-50 uppercase text-center">
        Local Weather: {error}
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center p-3 border border-base-200 mb-6">
        <span className="loading loading-dots loading-xs"></span>
      </div>
    );
  }

  const displayTemp = formatTemp(convertTemperature(weather.tempC, "C", unit));

  return (
    <div className="flex items-center justify-between p-3 bg-base-300 border border-primary mb-6">
      <div>
        <span className="text-[10px] font-black uppercase block opacity-60 leading-none mb-1">Your Current Location</span>
        <span className="text-sm font-bold underline decoration-primary">{weather.city}</span>
      </div>
      <div className="flex items-center gap-3 text-right">
        <div>
          <span className="text-lg font-black italic">{displayTemp}°{unit}</span>
          <span className="text-[10px] font-mono uppercase block opacity-50 leading-none">{weather.condition}</span>
        </div>
        <span className="text-2xl">{weather.icon}</span>
      </div>
    </div>
  );
};

export default UserLocation;