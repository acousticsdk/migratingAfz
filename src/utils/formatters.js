export const formatAmount = (value) => {
  // Allow empty input
  if (!value) return '';
  
  // Replace comma with dot
  let formatted = value.replace(',', '.');
  
  // Remove all non-numeric characters except the first decimal point
  formatted = formatted.replace(/[^\d.]/g, '');
  
  // Keep only the first decimal point if multiple exist
  const parts = formatted.split('.');
  if (parts.length > 2) {
    formatted = parts[0] + '.' + parts.slice(1).join('');
  }

  // Handle leading zeros
  if (formatted.length > 1 && formatted[0] === '0' && formatted[1] !== '.') {
    formatted = formatted.replace(/^0+/, '');
  }
  
  // Add leading zero for decimal numbers
  if (formatted.startsWith('.')) {
    formatted = `0${formatted}`;
  }

  return formatted;
};