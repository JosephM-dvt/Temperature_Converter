import { useState } from "react";
import TemperatureInput from "./tempInput";
import { convertTemperature, formatTemp, SCALE_LABELS, type TemperatureUnit } from "../utils/tempConverter.ts";

const units: TemperatureUnit[] = ["C", "F", "K"];

const TemperatureConverter = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [scale, setScale] = useState<TemperatureUnit>("C");

  const numericValue = parseFloat(temperature);

  const getValueForUnit = (targetUnit: TemperatureUnit): string => {
    if (temperature === "" || temperature === "-") return "";
    if (isNaN(numericValue)) return "";
    if (scale === targetUnit) return temperature;
    return formatTemp(convertTemperature(numericValue, scale, targetUnit));
  };

  const handleChange = (value: string, unit: TemperatureUnit) => {
    setTemperature(value);
    setScale(unit);
  };

  return (
    <div>
      <h2 className="card-title text-2xl text-secondary mb-6">Temperature Converter</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {units.map((unit) => (
          <TemperatureInput
            key={unit}
            label={SCALE_LABELS[unit]}
            unit={unit}
            value={getValueForUnit(unit)}
            onChange={handleChange}
          />
        ))}
      </div>

      {temperature !== "" && !isNaN(numericValue) && (
        <div className="alert bg-primary/10 border-primary/20 text-primary-content">
          <div className="flex flex-col w-full gap-1">
            <span className="text-xs uppercase font-black text-primary/70">Summary Results</span>
            <div className="flex flex-wrap gap-4">
              {units.map((unit) => (
                <div key={unit} className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    {getValueForUnit(unit)}°{unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureConverter;