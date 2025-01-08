import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { useCurrencyRates } from '../../hooks/useCurrencyRates';
import { convertAmount } from '../../utils/currencyUtils';

function OrderDetails({ orderDetails, isLocalOrder, displayCurrency = 'RUB' }) {
  const { rates } = useCurrencyRates();
  
  const getDisplayAmount = () => {
    if (!isLocalOrder || !rates || displayCurrency === 'RUB') {
      return `${orderDetails.topup_amount} ₽`;
    }
    
    const convertedAmount = convertAmount(
      orderDetails.topup_amount.toString(),
      'RUB',
      displayCurrency,
      rates
    );
    
    const currencySymbols = {
      USD: '$',
      KZT: '₸',
      RUB: '₽'
    };
    
    return `${convertedAmount} ${currencySymbols[displayCurrency]}`;
  };

  return (
    <div className={styles.detailsGrid}>
      <div className={styles.detailItem}>
        <div>
          <span className={styles.label}>Номер заказа:</span>
          <span className={styles.value}>{orderDetails.order_id}</span>
        </div>
      </div>

      {isLocalOrder && (
        <>
          <div className={styles.detailItem}>
            <div>
              <span className={styles.label}>Логин Steam:</span>
              <span className={styles.value}>{orderDetails.steam_account}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div>
              <span className={styles.label}>Сумма к оплате:</span>
              <span className={styles.value}>{orderDetails.amount} ₽</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div>
              <span className={styles.label}>Придёт на баланс Steam:</span>
              <span className={styles.value}>{getDisplayAmount()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CheckoutPage({ orderDetails, onPaymentClick, status, isLocalOrder }) {
  const navigate = useNavigate();
  const displayCurrency = localStorage.getItem('displayCurrency') || 'RUB';

  const handleCancel = () => {
    navigate('/');
  };

  if (status === 'success') {
    return (
      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Заказ успешно оплачен</h1>
        <p className={styles.subtitle}>
          Спасибо, ваш заказ успешен. Ожидайте пополнения.
        </p>
        <div className={styles.orderDetails}>
          <OrderDetails 
            orderDetails={orderDetails} 
            isLocalOrder={isLocalOrder} 
            displayCurrency={displayCurrency}
          />
          <button className={styles.cancelButton} onClick={handleCancel}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  if (status === 'fail') {
    return (
      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Ошибка оплаты</h1>
        <div className={styles.orderDetails}>
          <OrderDetails 
            orderDetails={orderDetails} 
            isLocalOrder={isLocalOrder}
            displayCurrency={displayCurrency}
          />
          <button className={styles.cancelButton} onClick={handleCancel}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Заказ оформлен</h1>
      <p className={styles.subtitle}>
        Перепроверь данные и оплати заказ - баланс поступит в течении 1-5 минут после оплаты.
      </p>

      <div className={styles.orderDetails}>
        <div className={styles.statusIndicator}>
          <div className={styles.spinner}></div>
          <span>Ожидание оплаты</span>
        </div>

        <OrderDetails 
          orderDetails={orderDetails} 
          isLocalOrder={isLocalOrder}
          displayCurrency={displayCurrency}
        />

        <button className={styles.paymentButton} onClick={onPaymentClick}>
          Перейти к оплате
        </button>

        <button className={styles.cancelButton} onClick={handleCancel}>
          Отменить заказ
        </button>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetails: PropTypes.shape({
    order_id: PropTypes.string.isRequired,
    steam_account: PropTypes.string.isRequired,
    amount: PropTypes.number,
    topup_amount: PropTypes.number
  }).isRequired,
  isLocalOrder: PropTypes.bool.isRequired,
  displayCurrency: PropTypes.string
};

CheckoutPage.propTypes = {
  orderDetails: PropTypes.shape({
    order_id: PropTypes.string.isRequired,
    steam_account: PropTypes.string.isRequired,
    amount: PropTypes.number,
    topup_amount: PropTypes.number,
    customer: PropTypes.shape({
      email: PropTypes.string
    })
  }).isRequired,
  onPaymentClick: PropTypes.func.isRequired,
  status: PropTypes.string,
  isLocalOrder: PropTypes.bool.isRequired
};

export default CheckoutPage;