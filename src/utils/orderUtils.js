import { nanoid } from 'nanoid';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateOrderId = () => nanoid(12, alphabet);

export const createOrder = async (orderData) => {
  try {
    const formData = new FormData();
    
    // Add description field with required format
    const description = `AFZ-Steam | ${orderData.order_id}`;
    
    formData.append('steamAccount', orderData.steam_account);
    formData.append('amount', orderData.amount);
    formData.append('topupAmount', orderData.topup_amount);
    formData.append('orderId', orderData.order_id);
    formData.append('customerEmail', orderData.customer.email || 'test@gmail.com');
    formData.append('description', description);
    
    const baseUrl = `${window.location.origin}/?checkout&id=${orderData.order_id}`;
    const successUrl = `${baseUrl}&status=success`;
    const failUrl = `${baseUrl}&status=fail`;

    formData.append('success_url', successUrl);
    formData.append('fail_url', failUrl);

    const response = await fetch('https://api.afz.shop/create-order.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    const match = responseText.match(/Ссылка на оплату: (.*)/);
    if (!match) {
      throw new Error('Payment URL not found in response');
    }

    const paymentUrl = match[1].trim();
    return { payment_url: paymentUrl };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};