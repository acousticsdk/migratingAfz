import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './MobileMenu.module.css';

function MobileMenu({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`${styles.mobileMenuOverlay} ${isAnimating ? styles.active : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`${styles.mobileMenu} ${isAnimating ? styles.active : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <nav className={styles.mobileNav}>
          <ul>
            <li>
              <a 
                href="https://afz.shop" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Пополнение игр и сервисов
              </a>
            </li>
            <li>
              <a 
                href="https://afz.shop/garantii" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Гарантии и возврат
              </a>
            </li>
            <li>
              <a 
                href="https://t.me/afz_feedback" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Отзывы
              </a>
            </li>
            <li>
              <a 
                href="https://t.me/afz_help" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Поддержка
              </a>
            </li>
            <li>
              <a 
                href="https://t.me/afz_shop" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={onClose}
              >
                Новости
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MobileMenu;