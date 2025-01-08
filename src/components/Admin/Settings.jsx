import React, { useEffect } from 'react';
import useAdminStore from '../../store/adminStore';
import styles from './Admin.module.css';

function Settings() {
  const { maintenanceMode, toggleMaintenanceMode, initMaintenanceMode } = useAdminStore();

  // Initialize maintenance mode status when component mounts
  useEffect(() => {
    initMaintenanceMode();
  }, [initMaintenanceMode]);

  const handleMaintenanceToggle = async () => {
    try {
      await toggleMaintenanceMode();
      const message = maintenanceMode 
        ? 'Сайт включен' 
        : 'Сайт переведен в режим технического обслуживания';
      
      const notification = document.createElement('div');
      notification.className = styles.notification;
      notification.textContent = message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add(styles.fadeOut);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    } catch (error) {
      const notification = document.createElement('div');
      notification.className = `${styles.notification} ${styles.error}`;
      notification.textContent = error.message;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add(styles.fadeOut);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Настройки</h2>
      <div className={styles.settingItem}>
        <label className={styles.maintenanceLabel}>
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={handleMaintenanceToggle}
          />
          <span>Сайт на техобслуживании</span>
        </label>
      </div>
    </div>
  );
}

export default Settings;