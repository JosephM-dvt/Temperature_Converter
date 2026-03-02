export type TemperatureUnit = "C" | "F" | "K";

export type ScaleLabel = Record<TemperatureUnit, string>;

export const SCALE_LABELS: ScaleLabel = {
  C: "Celsius",
  F: "Fahrenheit",
  K: "Kelvin",
};

export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) return value;

  let celsius: number;
  switch (from) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
      celsius = value - 273.15;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${from}`);
  }

  switch (to) {
    case "C":
      return celsius;
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      throw new Error(`Unsupported temperature unit: ${to}`);
  }
}

export function formatTemp(value: number): string {
  return isNaN(value) ? "" : parseFloat(value.toFixed(2)).toString();
}
