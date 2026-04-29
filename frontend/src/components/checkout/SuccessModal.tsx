// Component modal thành công
import { Modal } from '@/components/ui/Modal';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function SuccessModal({ isOpen, onClose, email }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thanh toán thành công!">
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SuccessIcon />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Cảm ơn bạn!</h3>
        <p className="text-gray-600 mb-2">Thanh toán thành công!</p>
        <p className="text-gray-600 mb-6">Khóa học đã được thêm vào tài khoản của bạn.</p>
        <p className="text-sm text-gray-500 mb-6">
          Email xác nhận đã được gửi đến <strong>{email}</strong>
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Quay về trang chủ
        </button>
      </div>
    </Modal>
  );
}

function SuccessIcon() {
  return (
    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
