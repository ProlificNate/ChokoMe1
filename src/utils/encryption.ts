// Utility functions for simulating encryption

/**
 * Simulates PIN encryption (for demo purposes only)
 * In a real app, this would use a proper encryption library
 */
export const encryptPin = (pin: string): string => {
  // This is just a simulation of encryption
  // DO NOT use this in production!
  return btoa(`encrypted-${pin}-${Date.now()}`);
};

/**
 * Formats a monetary amount with currency symbol
 */
export const formatCurrency = (amount: number, currency = 'FCFA'): string => {
  return `${amount.toLocaleString()} ${currency}`;
};

/**
 * Formats a date for display
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Trims a string to certain length and adds ellipsis
 */
export const truncateText = (text: string, maxLength = 20): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};