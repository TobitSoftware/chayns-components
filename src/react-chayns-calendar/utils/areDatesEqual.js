/**
 * Compares two dates with year, month and date (looser equality than == operator)
 * @param {Date} date1 - First date for comparison
 * @param {Date} date2 - First date for comparison
 */
export default function areDatesEqual(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    ); // TODO: UTC-comparison
}
