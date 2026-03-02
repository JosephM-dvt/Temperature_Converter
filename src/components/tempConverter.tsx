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
      <h1 className="text-2xl font-bold ">Temperature Converter</h1>
      <div className="bg-white border border-gray-300 rounded ">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <div className="bg-blue-50 border border-blue-200 rounded text-sm">
            <strong>Result:</strong>{" "}
            {units.map((unit) => (
              <span key={unit} className="">
                {getValueForUnit(unit)}°{unit}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default TemperatureConverter;
