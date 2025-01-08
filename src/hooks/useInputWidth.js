import { useCallback } from 'react';

export const useInputWidth = () => {
  const calculateWidth = useCallback((value) => {
    const minChars = 1;
    const maxChars = 8;
    const padding = 0;
    const length = value ? value.length : 0;
    
    // Reduce width by 0.5ch if there's a decimal point
    const decimalAdjustment = value?.includes('.') ? 0.5 : 0;
    
    // Always ensure width is at least minChars, even for empty or short input
    const width = Math.max(Math.min(length + padding, maxChars), minChars);
    return `${width - decimalAdjustment}ch`;
  }, []);

  return { calculateWidth };
};