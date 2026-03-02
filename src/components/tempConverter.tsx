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
      <h2 className="text-xl font-black uppercase italic mb-6">Temperature Converter</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
        <div className="p-4 bg-base-200 border-l-4 border-primary">
          <p className="text-[10px] font-mono uppercase mb-2 opacity-50">Conversion Summary</p>
          <div className="grid grid-cols-3 gap-2">
            {units.map((unit) => (
              <div key={unit}>
                <span className="text-xs font-mono block opacity-60">{SCALE_LABELS[unit]}</span>
                <span className="text-md font-black">
                  {getValueForUnit(unit)}°{unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureConverter;