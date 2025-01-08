import React from 'react';
import { NavLink } from 'react-router-dom';
import useAdminStore from '../../store/adminStore';
import styles from './Admin.module.css';

function Sidebar() {
  const logout = useAdminStore((state) => state.logout);

  const handleOrdersClick = () => {
    window.open('https://lk.antilopay.com/#/topups', '_blank');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${styles.sidebarLink} ${isActive ? styles.active : ''}`
          }
        >
          Настройки
        </NavLink>
        <NavLink
          to="/admin/faq"
          className={({ isActive }) =>
            `${styles.sidebarLink} ${isActive ? styles.active : ''}`
          }
        >
          Вопросы и ответы
        </NavLink>
        <button 
          onClick={handleOrdersClick}
          className={styles.sidebarLink}
          style={{marginTop: '1px'}}
        >
          Заказы
        </button>
      </div>
      <button onClick={logout} className={styles.logoutButton}>
        Выйти
      </button>
    </div>
  );
}

export default Sidebar;