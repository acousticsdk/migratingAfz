import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu/MobileMenu';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="AFZ SHOP Logo" className="logo-img" />
        </Link>
        
        {/* Desktop Menu */}
        <ul className="desktop-menu">
          <li><a href="https://afz.shop" target="_blank" rel="noopener noreferrer">Пополнение игр и сервисов</a></li>
          <li>
            <a href="https://afz.shop/garantii" target="_blank" rel="noopener noreferrer">
              Гарантии и возврат
            </a>
          </li>
          <li><a href="https://t.me/afz_feedback" target="_blank" rel="noopener noreferrer">Отзывы</a></li>
          <li><a href="https://t.me/afz_help" target="_blank" rel="noopener noreferrer">Поддержка</a></li>
          <li><a href="https://t.me/afz_shop" target="_blank" rel="noopener noreferrer">Новости</a></li>
        </ul>

        {/* Hamburger Button */}
        <button 
          className="hamburger-button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </nav>
    </header>
  );
}

export default Header;