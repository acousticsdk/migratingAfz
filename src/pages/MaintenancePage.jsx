import React from 'react';
import Header from '../components/Header';

function MaintenancePage() {
  return (
    <>
      <Header />
      <div style={{ 
        minHeight: 'calc(100vh - 72px)', // Subtract header height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-light)',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          Сайт находится на техническом обслуживании
        </h1>
        <p style={{ 
          fontSize: '1.1rem',
          color: 'var(--text-gray)',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          В данный момент мы проводим плановые технические работы. 
          Пожалуйста, зайдите позже.
        </p>
      </div>
    </>
  );
}

export default MaintenancePage;