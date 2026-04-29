// Component form thanh toán
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CheckoutFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function CheckoutForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: CheckoutFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Thông tin thanh toán</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Nhập họ và tên của bạn"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="email@example.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="0xxx xxx xxx"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ (tùy chọn)</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Địa chỉ nhận hàng (nếu có)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
      </div>

      <PaymentMethods isLoading={isLoading} />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-lg font-semibold transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner /> Đang xử lý...
          </span>
        ) : (
          'Xác nhận thanh toán'
        )}
      </button>
    </form>
  );
}

function PaymentMethods({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">Phương thức thanh toán</label>
      <div className="space-y-3">
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="banking"
            defaultChecked
            className="w-4 h-4 text-blue-600"
            disabled={isLoading}
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900">Chuyển khoản ngân hàng</p>
            <p className="text-sm text-gray-500">Thanh toán qua ATM/Ví điện tử</p>
          </div>
        </label>
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="momo"
            className="w-4 h-4 text-blue-600"
            disabled={isLoading}
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900">Ví MoMo</p>
            <p className="text-sm text-gray-500">Thanh toán qua ví MoMo</p>
          </div>
        </label>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
