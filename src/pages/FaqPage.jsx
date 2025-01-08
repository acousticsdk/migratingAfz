import React from 'react';
import { Link } from 'react-router-dom';
import FaqAccordion from '../components/Faq/FaqAccordion';
import '../styles/faq.css';

function FaqPage() {
  return (
    <main className="faq-page">
      <h1>FAQ</h1>
      <p className="faq-subtitle">
        Полезная информация и ответы на часто задаваемые вопросы
      </p>
      <FaqAccordion />
      <div className="faq-home-link">
        <Link to="/">На главную</Link>
      </div>
    </main>
  );
}

export default FaqPage;