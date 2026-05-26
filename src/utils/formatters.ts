/**
 * Formats a number as Nigerian Naira currency.
 * @example formatCurrency(200000) → "₦200,000.00"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace('NGN', '₦')
    .trim();
}

/**
 * Formats a date string into a human-readable format.
 * @example formatDate("May 15, 2020 10:00 AM") → "May 15, 2020 10:00 AM"
 */
export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(parsed);
}

/**
 * Returns initials from a full name (up to 2 characters).
 * @example getInitials("Grace Effiom") → "GE"
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}
