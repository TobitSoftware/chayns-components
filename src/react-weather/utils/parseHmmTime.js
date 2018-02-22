export default function parseHmmTime(string, date = new Date()) {
    if(string.length < 3) { date.setHours(0); date.setMinutes(0); return date; }

    const hour = parseInt(string.slice(0, string.length - 2), 10);
    const minutes = parseInt(string.slice(string.length - 2, string.length), 10);

    date.setHours(hour);
    date.setMinutes(minutes);

    return date;
}
