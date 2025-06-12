import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export function CoolingButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handler = async (): Promise<void> => {
    setIsLoading(true);
    setMessage("Starting cooling...");

    try {
      const response = await fetch("/api/activate-cooling", {
        method: "POST",
      });

      const text = await response.text();
      console.log(`🚀 ~ handler ~ text::`, text);

      if (response.ok) {
        setMessage("Cooling activated successfully.");
      } else {
        setMessage(`Error: ${text}`);
      }

      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error activating cooling:", error);
      setMessage("Failed to activate cooling.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
      <button
        onClick={handler}
        type="button"
        disabled={isLoading || !IS_BROWSER}
        class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
      >
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {isLoading
          ? <span class="animate-pulse">Cooling...</span>
          : <span>Activate Cooling</span>}
      </button>
      {message && (
        <div class="mt-4 text-sm text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
}
