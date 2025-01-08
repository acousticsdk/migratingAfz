import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCheckoutStore = create(
  persist(
    (set) => ({
      orderDetails: null,
      paymentUrl: null,
      setOrderDetails: (details) => set({ orderDetails: details }),
      setPaymentUrl: (url) => set({ paymentUrl: url }),
      reset: () => set({ orderDetails: null, paymentUrl: null }),
    }),
    {
      name: 'checkout-storage',
    }
  )
);

export default useCheckoutStore;