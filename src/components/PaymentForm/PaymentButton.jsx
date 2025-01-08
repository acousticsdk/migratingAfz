import React from 'react';
import PropTypes from 'prop-types';

function PaymentButton({ 
  disabled = false, 
  onClick, 
  amount, 
  isValidating = false, 
  isSubmitting = false 
}) {
  const getButtonText = () => {
    if (isValidating) return 'Проверка...';
    if (isSubmitting) return 'Обработка...';
    return `Оплатить ${amount} ₽`;
  };

  return (
    <button 
      className="btn-pay" 
      disabled={Boolean(disabled)}
      onClick={onClick}
    >
      {getButtonText()}
    </button>
  );
}

PaymentButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  isValidating: PropTypes.bool,
  isSubmitting: PropTypes.bool
};

export default PaymentButton;