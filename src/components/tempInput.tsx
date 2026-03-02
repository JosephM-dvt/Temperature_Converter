import type { TemperatureUnit } from "../utils/tempConverter";

interface TemperatureInputProps {
  label: string;
  unit: TemperatureUnit;
  value: string;
  onChange: (value: string, unit: TemperatureUnit) => void;
}

const TemperatureInput = ({ label, unit, value, onChange }: TemperatureInputProps) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-bold text-base-content/70">{label} (°{unit})</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value, unit)}
        placeholder="0.00"
        className="input input-bordered input-secondary w-full focus:input-primary transition-all font-mono"
      />
    </div>
  );
};

export default TemperatureInput;