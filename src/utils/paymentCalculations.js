export const COMMISSION_RATES = {
  sbp: 0.065, // 6.5%
  card: 0.08,  // 8%
};

export const MIN_BALANCE_AMOUNT = 46.95; // Minimum amount that will come to Steam balance
export const MIN_DISPLAY_AMOUNT = 50; // Amount to show in warning message

export const calculatePaymentAmount = (balanceAmount, paymentMethod) => {
  const amount = parseFloat(balanceAmount) || 0;
  const commission = COMMISSION_RATES[paymentMethod] || 0;
  const total = amount * (1 + commission);
  return Math.round(total * 100) / 100;
};

export const calculateBalanceAmount = (paymentAmount, paymentMethod) => {
  const amount = parseFloat(paymentAmount) || 0;
  const commission = COMMISSION_RATES[paymentMethod] || 0;
  const balance = amount / (1 + commission);
  return Math.round(balance * 100) / 100;
};