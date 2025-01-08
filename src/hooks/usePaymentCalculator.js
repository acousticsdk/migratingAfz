import { useState, useCallback } from 'react';
import { calculatePaymentAmount, calculateBalanceAmount } from '../utils/paymentCalculations';

export const usePaymentCalculator = (initialBalance = '1000.00') => {
  const [balanceAmount, setBalanceAmount] = useState(initialBalance);
  const [paymentAmount, setPaymentAmount] = useState(calculatePaymentAmount(initialBalance, 'sbp').toFixed(2));
  const [paymentMethod, setPaymentMethod] = useState('sbp');

  const updateBalanceAmount = useCallback((newAmount) => {
    setBalanceAmount(newAmount);
    if (newAmount) {
      const newPaymentAmount = calculatePaymentAmount(newAmount, paymentMethod).toFixed(2);
      setPaymentAmount(newPaymentAmount);
    } else {
      setPaymentAmount('');
    }
  }, [paymentMethod]);

  const updatePaymentAmount = useCallback((newAmount) => {
    setPaymentAmount(newAmount);
    if (newAmount) {
      const newBalanceAmount = calculateBalanceAmount(newAmount, paymentMethod).toFixed(2);
      setBalanceAmount(newBalanceAmount);
    } else {
      setBalanceAmount('');
    }
  }, [paymentMethod]);

  const updatePaymentMethod = useCallback((method) => {
    setPaymentMethod(method);
    if (balanceAmount) {
      const newPaymentAmount = calculatePaymentAmount(balanceAmount, method).toFixed(2);
      setPaymentAmount(newPaymentAmount);
    }
  }, [balanceAmount]);

  return {
    balanceAmount,
    paymentAmount,
    paymentMethod,
    updateBalanceAmount,
    updatePaymentAmount,
    updatePaymentMethod
  };
};