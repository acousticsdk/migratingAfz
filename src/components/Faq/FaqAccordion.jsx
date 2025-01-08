import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FaqItem from './FaqItem';
import useFaqStore from '../../store/faqStore';

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const { faqs, fetchFaqs } = useFaqStore();

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  useEffect(() => {
    const hash = location.hash.slice(1);
    
    if (hash) {
      const index = faqs.findIndex(item => item.id === hash);
      if (index !== -1) {
        setOpenIndex(index);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash, faqs]);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {faqs.map((item, index) => (
        <FaqItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

export default FaqAccordion;