// Component LoadingSpinner - Spinner loading
export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner xoay */}
        <div
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent 
                        rounded-full animate-spin mx-auto"
        />
        <p className="mt-4 text-gray-500">Đang tải...</p>
      </div>
    </div>
  );
}
