import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useInputWidth } from '../../hooks/useInputWidth';
import styles from './AmountInput.module.css';

function AmountInput({ 
  label, 
  value, 
  onChange, 
  currency = '₽', 
  children,
  readOnly = false,
  showImportant = false
}) {
  const inputRef = useRef(null);
  const { calculateWidth } = useInputWidth();

  const handleChange = (e) => {
    if (readOnly) return;
    
    // Allow any input value without formatting
    onChange(e);
  };

  const handleContainerClick = () => {
    if (inputRef.current && !readOnly) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="balance-section">
      <h3>
        {label}
        {showImportant && (
          <span className={styles.importantLabel} data-tooltip="Из-за скачков валютных курсов, полученная сумма может отличаться в большую или меньшую сторону до пары процентов. Рекомендуем пополнять с запасом.">
            Важно!
          </span>
        )}
      </h3>
      <div className="balance-display" onClick={handleContainerClick}>
        <img src="/assets/money-icon.png" alt="Currency Icon" className="currency-icon" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
          style={{ width: calculateWidth(value) }}
        />
        <span className="currency-symbol">{currency}</span>
        {children}
      </div>
    </div>
  );
}

AmountInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string,
  children: PropTypes.node,
  readOnly: PropTypes.bool,
  showImportant: PropTypes.bool
};

export default AmountInput;