import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PaymentForm from '../components/PaymentForm';
import CheckoutPage from '../components/Checkout/CheckoutPage';
import useCheckoutStore from '../store/checkoutStore';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails, paymentUrl, reset } = useCheckoutStore();
  
  const urlParams = new URLSearchParams(location.search);
  const urlOrderId = urlParams.get('id');
  const status = urlParams.get('status');
  const isCheckout = location.search.includes('checkout');

  // If there's an order ID in URL but no order details, redirect to home
  useEffect(() => {
    if (isCheckout && !orderDetails) {
      navigate('/', { replace: true });
    }
  }, [isCheckout, orderDetails, navigate]);

  const handlePaymentClick = () => {
    if (paymentUrl) {
      // Only reset when returning from payment page
      const cleanupHandler = (e) => {
        if (!e.currentTarget.location.href.includes(paymentUrl)) {
          reset();
          window.removeEventListener('unload', cleanupHandler);
        }
      };
      window.addEventListener('unload', cleanupHandler);
      
      // Direct payment URL navigation without any redirects
      window.location.href = paymentUrl;
    }
  };

  // Check if order exists in local storage
  const isLocalOrder = Boolean(orderDetails && orderDetails.order_id === urlOrderId);

  return (
    <main>
      {isCheckout && orderDetails ? (
        <CheckoutPage 
          orderDetails={orderDetails}
          onPaymentClick={handlePaymentClick}
          status={status}
          isLocalOrder={isLocalOrder}
        />
      ) : (
        <>
          <Hero />
          <PaymentForm />
        </>
      )}
    </main>
  );
}

export default HomePage;