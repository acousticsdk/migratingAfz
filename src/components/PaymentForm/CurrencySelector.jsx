import React from 'react';
import PropTypes from 'prop-types';

function CurrencySelector({ currency, onCurrencyChange }) {
  const currencies = ['RUB', 'KZT', 'USD'];
  
  return (
    <div className="currency-buttons">
      {currencies.map((curr) => (
        <button
          key={curr}
          className={currency === curr ? 'active' : ''}
          onClick={() => onCurrencyChange(curr)}
        >
          {curr}
        </button>
      ))}
    </div>
  );
}

CurrencySelector.propTypes = {
  currency: PropTypes.string.isRequired,
  onCurrencyChange: PropTypes.func.isRequired
};

export default CurrencySelector;