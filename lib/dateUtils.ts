/**
 * Utility functions for date handling
 */

/**
 * Convert a date value to string format (YYYY-MM-DD)
 * Handles Date objects, strings, and undefined values
 *
 * @param dateValue - The date value from frontmatter (can be Date, string, or undefined)
 * @returns Formatted date string (YYYY-MM-DD)
 */
export function convertDateToString(dateValue: unknown): string {
  if (dateValue instanceof Date) {
    return dateValue.toISOString().split('T')[0];
  }

  if (typeof dateValue === 'string') {
    return dateValue;
  }

  // Fallback to current date if no valid date provided
  return new Date().toISOString().split('T')[0];
}
