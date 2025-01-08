import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
  const navigate = useNavigate();

  const handleNewAccountClick = () => {
    navigate('/faq#popolnenie-novogo-akkaunta');
  };

  return (
    <section className="hero">
      <h1>
        <span style={{color: "var(--primary-color)", fontSize: "2.2rem"}}>6.5%</span> - Самая низкая комиссия&nbsp;
        <br className="hidden-br"/>
        на пополнение Steam от AFZ-Shop!
      </h1>
      <div className="hero-description">
        Моментальное и выгодное пополнение Стим<br />для России, Казахстана и{' '}
        <span className={styles.countriesHint}>
          других стран СНГ
          <div className={styles.tooltip}>
            <div className={styles.tooltipContent}>          
              <ul>
                <li>Россия</li>
                <li>Беларусь</li>
                <li>Казахстан</li>
                <li>Киргизия </li>
                <li>Армения</li>
                <li>Таджикистан</li>
                <li>Узбекистан</li>
                <li>Азербайджан</li>
                <li>Молдавия</li>
                <li>Украина</li>
              </ul>
            </div>
          </div>
        </span>
      </div>

      <div className="action-buttons">
        <button className="btn-faq" onClick={() => navigate('/faq')}>
          <img src="/assets/question-icon.png" alt="FAQ Icon" className="btn-icon" />
          FAQ
        </button>
        <button className="btn-new-account" onClick={handleNewAccountClick}>
          <img src="/assets/danger-icon.png" alt="New Account Icon" className="btn-icon" />
          Пополняю новый аккаунт
        </button>
      </div>
    </section>
  );
}

export default Hero;