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
      <label className="label py-1">
        <span className="label-text text-[10px] font-mono uppercase font-bold">{label}</span>
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value, unit)}
          placeholder="0.00"
          className="input input-bordered input-sm w-full font-mono focus:border-primary focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black opacity-30">
          °{unit}
        </span>
      </div>
    </div>
  );
};

export default TemperatureInput;