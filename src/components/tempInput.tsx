import type { TemperatureUnit } from "../utils/tempConverter";

interface TemperatureInputProps {
  label: string;
  unit: TemperatureUnit;
  value: string;
  onChange: (value: string, unit: TemperatureUnit) => void;
}

const TemperatureInput = ({ label, unit, value, onChange }: TemperatureInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label} (°{unit})</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value, unit)}
        placeholder="0"
        className="w-full border border-gray-400 rounded"
      />
    </div>
  );
};

export default TemperatureInput;
