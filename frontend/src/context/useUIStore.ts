import { create } from 'zustand';
import toast from 'react-hot-toast';

interface Modal {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

type ToastType = 'success' | 'error';

interface UIState {
  sidebarOpen: boolean;
  modals: Modal[];
  toggleSidebar: () => void;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  modals: [],
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (type, data) =>
    set((state) => ({
      modals: [...state.modals, { isOpen: true, type, data }],
    })),
  closeModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
  closeAllModals: () => set({ modals: [] }),
}));

export const showToast = (message: string, type: ToastType = 'success') => {
  if (type === 'success') {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
