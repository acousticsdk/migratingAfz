import React from 'react';
import PropTypes from 'prop-types';

function PaymentMethods({ selectedMethod, onMethodChange }) {
  const methods = [
    { id: 'sbp', name: 'СБП', commission: '6,5%', icon: '/assets/sbp.png' },
    { 
      id: 'card', 
      name: 'Карта RUB', 
      commission: '8%', 
      icon: '/assets/card.png',
      disabled: true 
    }
  ];

  const handleMethodClick = (method) => {
    if (!method.disabled) {
      onMethodChange(method.id);
    }
  };

  return (
    <div className="payment-methods">
      <h3>Выбери способ оплаты:</h3>
      <div className="methods-grid">
        {methods.map(({ id, name, commission, icon, disabled }) => (
          <div
            key={id}
            className={`method ${selectedMethod === id ? 'active' : ''} ${disabled ? 'disabled-method' : ''}`}
            onClick={() => handleMethodClick({ id, disabled })}
          >
            <span>
              <img src={icon} alt={`${name} Icon`} className="method-icon" />
              {name}
            </span>
            <span className="commission">
              <span className="commission-digit">{commission}</span>
              <span> Комиссия</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

PaymentMethods.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  onMethodChange: PropTypes.func.isRequired
};

export default PaymentMethods;