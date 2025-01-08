import { useState } from 'react';
import { formatAmount } from '../utils/formatters';
import { convertAmount } from '../utils/currencyUtils';
import { validateSteamLoginInput } from '../utils/inputValidation';
import { checkSteamAccount } from '../utils/validation';
import { generateOrderId, createOrder } from '../utils/orderUtils';
import { usePaymentCalculator } from './usePaymentCalculator';
import { useCurrencyRates } from './useCurrencyRates';
import useCheckoutStore from '../store/checkoutStore';
import { MIN_BALANCE_AMOUNT, calculateBalanceAmount } from '../utils/paymentCalculations';

export const usePaymentForm = (navigate) => {
  const [steamLogin, setSteamLogin] = useState('');
  const [steamLoginError, setSteamLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [displayCurrency, setDisplayCurrency] = useState('RUB');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [displayAmount, setDisplayAmount] = useState('');

  const setOrderDetails = useCheckoutStore((state) => state.setOrderDetails);
  const setPaymentUrl = useCheckoutStore((state) => state.setPaymentUrl);
  const { rates } = useCurrencyRates();

  const {
    balanceAmount,
    paymentAmount,
    paymentMethod,
    updateBalanceAmount,
    updatePaymentAmount,
    updatePaymentMethod
  } = usePaymentCalculator();

  const handleSteamLoginChange = (e) => {
    const newLogin = e.target.value;
    const inputError = validateSteamLoginInput(newLogin);
    setSteamLoginError(inputError);
    setSteamLogin(newLogin);
  };

  const handleBalanceChange = (e) => {
    const newValue = formatAmount(e.target.value);
    
    if (displayCurrency === 'RUB') {
      updateBalanceAmount(newValue);
      setDisplayAmount(newValue);
    } else if (rates && newValue) {
      const rubAmount = convertAmount(newValue, displayCurrency, 'RUB', rates);
      updateBalanceAmount(rubAmount);
      setDisplayAmount(newValue);
    } else {
      updateBalanceAmount('');
      setDisplayAmount('');
    }
  };

  const handlePaymentChange = (e) => {
    const newValue = formatAmount(e.target.value);
    updatePaymentAmount(newValue);
    
    if (newValue && rates) {
      const newBalanceAmount = calculateBalanceAmount(newValue, paymentMethod);
      if (displayCurrency === 'RUB') {
        setDisplayAmount(newBalanceAmount.toFixed(2));
      } else {
        const convertedAmount = convertAmount(
          newBalanceAmount.toFixed(2),
          'RUB',
          displayCurrency,
          rates
        );
        setDisplayAmount(convertedAmount);
      }
    } else {
      setDisplayAmount('');
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setDisplayCurrency(newCurrency);
    localStorage.setItem('displayCurrency', newCurrency);
    
    if (balanceAmount && rates) {
      if (newCurrency === 'RUB') {
        setDisplayAmount(balanceAmount);
      } else {
        const convertedAmount = convertAmount(balanceAmount, 'RUB', newCurrency, rates);
        setDisplayAmount(convertedAmount);
      }
    }
  };

  const handleConfirmationChange = (checked) => {
    setIsConfirmed(checked);
  };

  const handleSubmit = async () => {
    if (!steamLogin || !balanceAmount || !isConfirmed || isSubmitting || isValidating) {
      return { error: true };
    }
    if (parseFloat(balanceAmount) < MIN_BALANCE_AMOUNT) {
      return { error: true };
    }

    const inputError = validateSteamLoginInput(steamLogin);
    if (inputError) {
      setSteamLoginError(inputError);
      return { error: true, message: inputError };
    }

    setIsValidating(true);
    setSteamLoginError(null);

    try {
      const validationError = await checkSteamAccount(steamLogin);
      if (validationError) {
        return { error: true, message: validationError };
      }

      setIsSubmitting(true);
      setError('');

      const orderId = generateOrderId();
      const orderData = {
        amount: Number(paymentAmount),
        topup_amount: Number(balanceAmount),
        order_id: orderId,
        steam_account: steamLogin,
        description: `Пополнение Steam для ${steamLogin}`,
        customer: { 
          email: 'test@gmail.com'
        }
      };

      const response = await createOrder(orderData);
      
      setOrderDetails(orderData);
      setPaymentUrl(response.payment_url);
      navigate(`/?checkout&id=${orderId}`);
      return { success: true };
    } catch (error) {
      setError('Произошла ошибка при создании заказа. Пожалуйста, попробуйте снова.');
      console.error('Failed to create order:', error);
      return { error: true, message: 'Произошла ошибка при создании заказа' };
    } finally {
      setIsSubmitting(false);
      setIsValidating(false);
    }
  };

  const showMinAmountWarning = balanceAmount && parseFloat(balanceAmount) < MIN_BALANCE_AMOUNT;
  const isButtonDisabled = !isConfirmed || !steamLogin || !balanceAmount || 
    isSubmitting || isValidating || showMinAmountWarning || steamLoginError;

  return {
    formState: {
      steamLogin,
      balanceAmount,
      paymentAmount,
      paymentMethod,
      displayCurrency,
      displayAmount,
      isConfirmed,
      isValidating,
      isSubmitting
    },
    handlers: {
      handleSteamLoginChange,
      handleBalanceChange,
      handlePaymentChange,
      handleCurrencyChange,
      handleConfirmationChange,
      updatePaymentMethod,
      handleSubmit
    },
    validation: {
      steamLoginError,
      setSteamLoginError,
      error,
      showMinAmountWarning
    },
    isButtonDisabled
  };
};