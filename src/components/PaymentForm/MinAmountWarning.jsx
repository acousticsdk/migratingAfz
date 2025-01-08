import React from 'react';
import PropTypes from 'prop-types';
import { MIN_DISPLAY_AMOUNT } from '../../utils/paymentCalculations';

function MinAmountWarning({ show }) {
  if (!show) return null;
  
  return (
    <div className="warning-message">
      Минимальная сумма для оплаты: {MIN_DISPLAY_AMOUNT} ₽
    </div>
  );
}

MinAmountWarning.propTypes = {
  show: PropTypes.bool.isRequired
};

export default MinAmountWarning;