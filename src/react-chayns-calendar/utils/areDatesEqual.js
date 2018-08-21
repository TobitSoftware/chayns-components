/**
 * Compares two dates with year, month and date (looser equality than == operator)
 * @param {Date} date1 - First date for comparison
 * @param {Date} date2 - First date for comparison
 */
export default function areDatesEqual(date1, date2) {
    return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
}
