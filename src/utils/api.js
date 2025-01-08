export const fetchCurrencyRates = async () => {
  try {
    const response = await fetch('https://api.afz.shop/rates.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data || !data.data || !data.data.currencies) {
      console.error('Unexpected API response structure:', data);
      return null;
    }

    const rates = {};
    data.data.currencies.forEach(curr => {
      if (curr.code && curr.rate) {
        rates[curr.code] = parseFloat(curr.rate);
      }
    });
    
    return rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return null;
  }
};

export const fetchOrder = async (orderId) => {
  try {
    const formData = new FormData();
    formData.append('orderId', orderId);
    
    const response = await fetch('https://api.afz.shop/get-order.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};