import { Handlers } from "$fresh/server.ts";

import { ControlActions } from "../components/control-actions.component.tsx";
import { ListTemperatures } from "../components/list-temperatures.component.tsx";
import { MainContentArea } from "../components/main-content-area.tsx";
import { NotTemperatures } from "../components/not-temperatures.component.tsx";
import { QuickStatistics } from "../components/quick-statistics.component.tsx";
import { SystemStatus } from "../components/system-status.component.tsx";
import { TemperatureChart } from "../islands/Chart.tsx";

import { type TemperatureReading } from "../src/models/temperature.model.ts";

export const handler: Handlers<TemperatureReading[]> = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();

    const entries = kv.list<TemperatureReading>({ prefix: ["temperature"] });

    const readings: TemperatureReading[] = [];
    for await (const entry of entries) {
      readings.push(entry.value);
    }
    readings.sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return ctx.render(readings);
  },
};

export default function Home({
  data,
}: {
  data: TemperatureReading[];
}) {
  return (
    <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <h1 class="text-3xl text-gray-900 text-center">
            IoT Capstone Project: Cooling System Control
          </h1>
        </div>
      </header>

      {/* Main Content with Sidebar Layout */}
      <div class="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Main Content Area */}
        <main class="flex-1">
          <MainContentArea dataLength={data.length} />

          {/* Chart Section */}
          {data.length > 0 && <TemperatureChart readings={data} />}

          {data.length === 0
            ? <NotTemperatures />
            : <ListTemperatures temperatures={data} />}
        </main>

        <aside class="w-80">
          {/* System Status */}
          <SystemStatus temperatures={data} />

          {/* Control Actions */}
          <ControlActions />

          {/* Quick Statistics */}
          <QuickStatistics temperatures={data} />
        </aside>
      </div>
    </div>
  );
}
