// Component toast thông báo lưu
interface SaveToastProps {
  show: boolean;
}

export default function SaveToast({ show }: SaveToastProps) {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      ✓ Đã lưu cài đặt thành công!
    </div>
  );
}
