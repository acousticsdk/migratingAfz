import React from 'react';
import styles from './Admin.module.css';

function LoginForm() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Доступ запрещен</h2>
        <p>Для доступа к панели администратора необходима аутентификация.</p>
      </div>
    </div>
  );
}

export default LoginForm;