// Component settings form
import { Input } from '@/components/ui/Input';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebook: string;
  youtube: string;
  twitter: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
}

interface SettingsFormProps {
  settings: Settings;
  onChange: (field: string, value: string | boolean) => void;
}

export default function SettingsForm({ settings, onChange }: SettingsFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SettingsCard title="Thông tin website">
        <Input
          label="Tên website"
          placeholder="CourseHub"
          value={settings.siteName}
          onChange={(e) => onChange('siteName', e.target.value)}
        />
        <TextArea
          label="Mô tả website"
          placeholder="Mô tả..."
          value={settings.siteDescription}
          onChange={(e) => onChange('siteDescription', e.target.value)}
        />
      </SettingsCard>

      <SettingsCard title="Liên hệ">
        <Input
          label="Email liên hệ"
          placeholder="email@example.com"
          type="email"
          value={settings.contactEmail}
          onChange={(e) => onChange('contactEmail', e.target.value)}
        />
        <Input
          label="Số điện thoại"
          placeholder="1900 xxxx"
          value={settings.contactPhone}
          onChange={(e) => onChange('contactPhone', e.target.value)}
        />
        <Input
          label="Địa chỉ"
          placeholder="Địa chỉ..."
          value={settings.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </SettingsCard>

      <SettingsCard title="Mạng xã hội">
        <Input
          label="Facebook"
          placeholder="https://facebook.com/..."
          value={settings.facebook}
          onChange={(e) => onChange('facebook', e.target.value)}
        />
        <Input
          label="YouTube"
          placeholder="https://youtube.com/..."
          value={settings.youtube}
          onChange={(e) => onChange('youtube', e.target.value)}
        />
        <Input
          label="Twitter/X"
          placeholder="https://x.com/..."
          value={settings.twitter}
          onChange={(e) => onChange('twitter', e.target.value)}
        />
      </SettingsCard>

      <SettingsCard title="Cài đặt khác">
        <ToggleSwitch
          label="Cho phép đăng ký"
          description="Người dùng mới có thể đăng ký tài khoản"
          checked={settings.allowRegistration}
          onChange={(checked) => onChange('allowRegistration', checked)}
        />
        <ToggleSwitch
          label="Thông báo email"
          description="Gửi email khi có khóa học mới"
          checked={settings.emailNotifications}
          onChange={(checked) => onChange('emailNotifications', checked)}
        />
        <ToggleSwitch
          label="Chế độ bảo trì"
          description="Tắt website để bảo trì hệ thống"
          checked={settings.maintenanceMode}
          onChange={(checked) => onChange('maintenanceMode', checked)}
          color="orange"
        />
      </SettingsCard>
    </div>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function TextArea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  color = 'blue',
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: 'blue' | 'orange';
}) {
  const bgColor = color === 'blue' ? 'peer-checked:bg-blue-600' : 'peer-checked:bg-orange-500';
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${bgColor}`}
        />
      </label>
    </div>
  );
}
