import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentDetails from './PaymentDetails';
import PaymentMethods from './PaymentMethods';
import FormInput from './FormInput';
import MinAmountWarning from './MinAmountWarning';
import ConfirmationCheckbox from './ConfirmationCheckbox';
import PaymentButton from './PaymentButton';
import { usePaymentForm } from '../../hooks/usePaymentForm';

function PaymentFormContainer() {
  const navigate = useNavigate();
  const steamLoginInputRef = useRef(null);
  
  const {
    formState,
    handlers,
    validation,
    isButtonDisabled
  } = usePaymentForm(navigate);

  const handleSubmit = async () => {
    const result = await handlers.handleSubmit();
    if (result?.error) {
      steamLoginInputRef.current?.focus();
      if (result.message) {
        validation.setSteamLoginError(result.message);
      }
    }
  };

  return (
    <section className="payment-form">
      <FormInput
        ref={steamLoginInputRef}
        label="Введите ваш логин Steam:"
        placeholder="Логин Steam"
        value={formState.steamLogin}
        onChange={handlers.handleSteamLoginChange}
        helpButton="Где взять?"
        icon="/assets/steam-icon.png"
        error={validation.steamLoginError}
        onFocus={() => validation.setSteamLoginError(null)}
      />

      <PaymentDetails
        formState={formState}
        handlers={handlers}
      />

      <MinAmountWarning show={Boolean(validation.showMinAmountWarning)} />

      <PaymentMethods
        selectedMethod={formState.paymentMethod}
        onMethodChange={handlers.updatePaymentMethod}
      />

      {validation.error && <div className="warning-message">{validation.error}</div>}

      <ConfirmationCheckbox
        isConfirmed={formState.isConfirmed}
        onChange={handlers.handleConfirmationChange}
      />

      <PaymentButton
        disabled={Boolean(isButtonDisabled)}
        onClick={handleSubmit}
        amount={formState.paymentAmount}
        isValidating={formState.isValidating}
        isSubmitting={formState.isSubmitting}
      />
    </section>
  );
}

export default PaymentFormContainer;