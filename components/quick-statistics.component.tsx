import { type TemperatureReading } from "../src/models/temperature.model.ts";

export const QuickStatistics = ({ temperatures }: {
  temperatures: TemperatureReading[];
}) => {
  return (
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg  text-gray-800 mb-4">
        Quick Stats
      </h3>
      <div class="space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Max Temperature</span>
          <span class="font-medium text-red-600">
            {temperatures.length > 0
              ? Math.max(...temperatures.map((r) => r.temperature))
              : 0}°C
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Min Temperature</span>
          <span class="font-medium text-blue-600">
            {temperatures.length > 0
              ? Math.min(...temperatures.map((r) => r.temperature))
              : 0}°C
          </span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Last Updated</span>
          <span class="font-medium text-gray-900">
            {temperatures.length > 0
              ? new Date(temperatures[0].timestamp).toLocaleTimeString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
