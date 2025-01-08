import React from 'react';
import PropTypes from 'prop-types';
import AmountInput from './AmountInput';
import CurrencySelector from './CurrencySelector';

function PaymentDetails({ formState, handlers }) {
  const {
    paymentAmount,
    balanceAmount,
    displayAmount,
    displayCurrency
  } = formState;

  const {
    handlePaymentChange,
    handleBalanceChange,
    handleCurrencyChange
  } = handlers;

  return (
    <div className="payment-details">
      <AmountInput
        label="Сумма к оплате:"
        value={paymentAmount}
        onChange={handlePaymentChange}
        currency="₽"
      />

      <AmountInput
        label="Придёт на баланс Steam:"
        value={displayCurrency === 'RUB' ? balanceAmount : displayAmount}
        onChange={handleBalanceChange}
        currency={displayCurrency === 'RUB' ? '₽' : displayCurrency}
        showImportant={true}
      >
        <CurrencySelector 
          currency={displayCurrency}
          onCurrencyChange={handleCurrencyChange}
        />
      </AmountInput>
    </div>
  );
}

PaymentDetails.propTypes = {
  formState: PropTypes.shape({
    paymentAmount: PropTypes.string.isRequired,
    balanceAmount: PropTypes.string.isRequired,
    displayAmount: PropTypes.string.isRequired,
    displayCurrency: PropTypes.string.isRequired
  }).isRequired,
  handlers: PropTypes.shape({
    handlePaymentChange: PropTypes.func.isRequired,
    handleBalanceChange: PropTypes.func.isRequired,
    handleCurrencyChange: PropTypes.func.isRequired
  }).isRequired
};

export default PaymentDetails;