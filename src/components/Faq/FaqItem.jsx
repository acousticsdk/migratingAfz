import React from 'react';
import PropTypes from 'prop-types';

function FaqItem({ id, question, answer, isOpen, onToggle }) {
  return (
    <div id={id} className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
        {question}
      </button>
      <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
        <div className="faq-answer-content">{answer}</div>
      </div>
    </div>
  );
}

FaqItem.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FaqItem;