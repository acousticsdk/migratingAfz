import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAdminStore from '../store/adminStore';
import LoginForm from '../components/Admin/LoginForm';
import Sidebar from '../components/Admin/Sidebar';
import Settings from '../components/Admin/Settings';
import FaqManager from '../components/Admin/FaqManager/FaqManager';
import styles from '../components/Admin/Admin.module.css';

function AdminPage() {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="settings" element={<Settings />} />
          <Route path="faq" element={<FaqManager />} />
          <Route path="*" element={<Navigate to="settings" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPage;