export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'USD': return '$';
    case 'KZT': return '₸';
    default: return '₽';
  }
};

export const convertAmount = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !amount) return '';
  
  const value = parseFloat(amount) || 0;
  
  // If same currency, return formatted amount
  if (fromCurrency === toCurrency) {
    return value.toFixed(2);
  }

  // Convert between RUB and other currencies
  if (fromCurrency === 'RUB') {
    // Converting from RUB to another currency
    return (value * rates[toCurrency]).toFixed(2);
  } else if (toCurrency === 'RUB') {
    // Converting from another currency to RUB
    return (value / rates[fromCurrency]).toFixed(2);
  } else {
    // Converting between two non-RUB currencies
    // First convert to RUB, then to target currency
    const inRub = value / rates[fromCurrency];
    return (inRub * rates[toCurrency]).toFixed(2);
  }
};