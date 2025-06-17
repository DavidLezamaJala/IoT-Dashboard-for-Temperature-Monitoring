import { TemperatureReading } from "../src/models/temperature.model.ts";
import {
  formatDateTime,
  getTemperatureColor,
} from "../src/utils/temperature.ts";

export const ListTemperatures = ({ temperatures }: {
  temperatures: TemperatureReading[];
}) => {
  return (
    <div>
      <h2 class="text-2xl mb-6">
        Latest Temperature Readings - 10
      </h2>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {temperatures.slice(0, 10).map((reading, index) => {
          const { date } = formatDateTime(reading.timestamp);
          const tempColorClass = getTemperatureColor(
            reading.temperature,
          );

          return (
            <div
              key={`${reading.timestamp}-${index}`}
              class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div class="flex items-center justify-between mb-3">
                <div
                  class={`px-3 py-1 rounded-full text-sm font-medium ${tempColorClass}`}
                >
                  {reading.temperature}°C
                </div>
                <div class="text-xs text-gray-500">
                  #{index + 1}
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 01-4-4v-4m0 0h8m-4 4v8"
                    />
                  </svg>
                  {date}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {new Date(reading.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
