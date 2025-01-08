// Input validation utilities
export const validateSteamLoginInput = (value) => {
  // Allow empty value during typing
  if (!value) return null;
  
  // Check for Latin letters, numbers and underscore only
  const latinPattern = /^[a-zA-Z0-9_]*$/;
  
  if (!latinPattern.test(value)) {
    return 'Допустимы только латинские буквы, цифры и нижнее подчеркивание';
  }
  
  return null;
};