import { TemperatureReading } from "../models/temperature.model.ts";

/**
 * @param timestamp - ISO 8601 timestamp string
 * @returns An object containing formatted date and time strings.
 */
export const formatDateTime = (
  timestamp: string,
): { date: string; time: string } => {
  const dateObj = new Date(timestamp);
  return {
    date: dateObj.toLocaleDateString(),
    time: dateObj.toLocaleTimeString(),
  };
};

/**
 * @param temp - Temperature in Celsius
 * @returns A string representing the color class based on temperature ranges. (Tailwind CSS classes)
 */
export const getTemperatureColor = (temp: number): string => {
  if (temp >= 30) return "text-red-600 bg-red-50";
  if (temp >= 25) return "text-orange-600 bg-orange-50";
  if (temp >= 20) return "text-yellow-600 bg-yellow-50";
  return "text-blue-600 bg-blue-50";
};

/**
 * @returns The latest temperature reading from the data array.
 */
export const getLatestTemperature = ({
  temperatures,
}: {
  temperatures: TemperatureReading[];
}) => {
  return temperatures.length > 0 ? temperatures[0].temperature : 0;
};

/**
 * @returns - The average temperature from the data array, rounded to one decimal place.
 */
export const getAverageTemperature = ({
  temperatures,
}: {
  temperatures: TemperatureReading[];
}) => {
  if (temperatures.length === 0) return 0;
  const sum = temperatures.reduce(
    (acc, reading) => acc + reading.temperature,
    0,
  );
  return (sum / temperatures.length).toFixed(1);
};
