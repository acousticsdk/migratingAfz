import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import AdminPage from './pages/AdminPage';
import MaintenancePage from './pages/MaintenancePage';
import useAdminStore from './store/adminStore';

function App() {
  const { maintenanceMode, initMaintenanceMode } = useAdminStore();
  const isAdminPath = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    initMaintenanceMode();
  }, [initMaintenanceMode]);

  // Always show admin panel regardless of maintenance mode
  if (isAdminPath) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    );
  }

  // Show maintenance page for all other routes when in maintenance mode
  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;