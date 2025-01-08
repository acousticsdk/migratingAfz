import { useState, useEffect } from 'react';
import { fetchCurrencyRates } from '../utils/api';

export const useCurrencyRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await fetchCurrencyRates();
        if (data) {
          setRates(data);
          setError(null);
        } else {
          setError('Failed to load currency rates');
        }
      } catch (err) {
        console.error('Error in useCurrencyRates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRates();
    
    const interval = setInterval(loadRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { rates, loading, error };
};