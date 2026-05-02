'use client';

// File AdminSettings.tsx - Trang cài đặt hệ thống trong admin
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import SettingsForm from '@/components/admin/SettingsForm';
import SaveToast from '@/components/admin/SaveToast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'CourseHub',
    siteDescription: 'Nền tảng khóa học trực tuyến hàng đầu Việt Nam',
    contactEmail: 'contact@coursehub.vn',
    contactPhone: '1900 1234',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    facebook: 'https://facebook.com/coursehub',
    youtube: '',
    twitter: '',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);

  function handleChange(field: string, value: string | boolean) {
    setSettings({ ...settings, [field]: value });
    setShowSaveMessage(false);
  }

  function handleSave() {
    console.log('Cài đặt đã lưu:', settings);
    setShowSaveMessage(true);

    setTimeout(() => {
      setShowSaveMessage(false);
    }, 3000);
  }

  return (
    <div className="p-8">
      {/* Tiêu đề trang */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-gray-500 mt-1">Quản lý cấu hình và cài đặt của website</p>
        </div>

        {/* Nút lưu */}
        <Button onClick={handleSave}>
          <SaveIcon />
          Lưu thay đổi
        </Button>
      </div>

      {/* Thông báo lưu thành công */}
      <SaveToast show={showSaveMessage} />

      {/* Form cài đặt */}
      <SettingsForm settings={settings} onChange={handleChange} />

      {/* Thông tin hệ thống */}
      <SystemInfo />
    </div>
  );
}

// Component thông tin hệ thống
function SystemInfo() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Thông tin hệ thống</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          <InfoItem label="Phiên bản" value="v1.0.0" />
          <InfoItem label="Ngày cập nhật" value={new Date().toLocaleDateString('vi-VN')} />
          <InfoItem label="Trạng thái" value="Hoạt động" valueColor="text-green-600" />
        </div>
      </div>
    </div>
  );
}

// Component hiển thị một thông tin
function InfoItem({
  label,
  value,
  valueColor = 'text-gray-900',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-lg font-medium ${valueColor}`}>{value}</p>
    </div>
  );
}

// Icon lưu
function SaveIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
