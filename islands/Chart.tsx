import { Chart } from "https://esm.sh/chart.js@4.4.2/auto";
import { useEffect, useRef } from "preact/hooks";

import { type TemperatureReading } from "../src/models/temperature.model.ts";

interface ChartProps {
  readings: TemperatureReading[];
}

export function TemperatureChart({ readings }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = readings.map((r) =>
      new Date(r.timestamp).toLocaleTimeString()
    );
    const data = readings.map((r) => r.temperature);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Temperatura (°C)",
            data,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            fill: true,
            tension: 0.1,
          }],
        },
      });
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [readings]);

  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg  text-gray-800 mb-4">
        Temperature Chart
      </h3>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
