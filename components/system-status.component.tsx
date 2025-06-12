import { TemperatureReading } from "../src/models/temperature.model.ts";
import {
  getAverageTemperature,
  getLatestTemperature,
  getTemperatureColor,
} from "../src/utils/temperature.ts";

export const SystemStatus = ({
  temperatures,
}: {
  temperatures: TemperatureReading[];
}) => {
  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg  text-gray-800 mb-4">
        System Status
      </h3>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Current Temperature</span>
          <span
            class={`px-2 py-1 rounded text-sm font-medium ${
              getTemperatureColor(getLatestTemperature({ temperatures }))
            }`}
          >
            {getLatestTemperature({ temperatures })}°C
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Average Temperature</span>
          <span class="text-sm font-medium text-gray-900">
            {getAverageTemperature({ temperatures })}°C
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Total Readings</span>
          <span class="text-sm font-medium text-gray-900">
            {temperatures.length}
          </span>
        </div>
      </div>
    </div>
  );
};
