import { create } from 'zustand';
import { getMaintenanceStatus, setMaintenanceStatus } from '../utils/maintenanceConfig';

const useAdminStore = create((set) => ({
  isAuthenticated: true, // Always true since auth is handled by vhost
  maintenanceMode: false,
  logout: () => window.location.reload(), // Just reload page on logout
  initMaintenanceMode: async () => {
    const status = await getMaintenanceStatus();
    set({ maintenanceMode: status });
  },
  toggleMaintenanceMode: async () => {
    try {
      const newStatus = await setMaintenanceStatus();
      set({ maintenanceMode: newStatus });
    } catch (error) {
      throw new Error('Не удалось выполнить операцию');
    }
  },
}));

export default useAdminStore;