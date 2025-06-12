import { CoolingButton } from "../islands/CoolingButton.tsx";

export const ControlActions = () => {
  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg  text-gray-800 mb-4">
        System Controls
      </h3>
      <div class="space-y-3">
        <CoolingButton />
      </div>
    </div>
  );
};
