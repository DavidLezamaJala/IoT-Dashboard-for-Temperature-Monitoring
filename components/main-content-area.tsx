export const MainContentArea = ({
  dataLength,
}: {
  dataLength: number;
}) => {
  return (
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl  text-gray-800">
          Temperature Readings
        </h2>
        <span class="text-sm text-gray-500">
          Total: {dataLength} readings
        </span>
      </div>
    </div>
  );
};
