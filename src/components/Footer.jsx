import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="AFZ SHOP Logo" className="logo-img" /> 
        </Link>

        <div className="footer-center">
          <div className="footer-links">
            <a 
              href="https://afzshop.ru/politika-konfidentsialnosti" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Политика конфиденциальности
            </a>
            <a style={{color:'#fff'}}
              href="https://afzshop.ru/polzovatelskoye-soglasheniye" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Пользовательское соглашение
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="support">
            <div className="support-ic">
              <img src="/assets/support-icon.png" alt="Steam Icon" className="support-icon" />
            </div>
            <div className="support-label">
              
               <a href="mailto:help@afzshop.ru">help@afzshop.ru</a>
              <span>Служба поддержки:</span>
            </div>
           
          </div>
          <a 
            href="https://t.me/afz_shop" 
            target="_blank" 
            rel="noopener noreferrer"
            className="telegram-link"
          >
            <img src="/assets/tg-icon.png" alt="Telegram" className="telegram-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;