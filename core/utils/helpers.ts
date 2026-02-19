/**
 * Helper Utilities - Common utility functions
 */

/**
 * Generate a unique ID using timestamp and random values
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format time in minutes to readable string
 */
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Check if string is valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text to a specific length with ellipsis
 */
export const truncateText = (text: string, length: number): string => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Convert array to comma-separated string
 */
export const arrayToString = (arr: string[]): string => {
  return arr.join(', ');
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Sort array of objects by a specific property
 */
export const sortByProperty = <T extends Record<string, any>>(
  arr: T[],
  prop: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  const sorted = [...arr].sort((a, b) => {
    if (a[prop] < b[prop]) return order === 'asc' ? -1 : 1;
    if (a[prop] > b[prop]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
