export default function parseAstronomyTime(string, parent) {
    let hour = parseInt(string.slice(0, 2), 10);
    const minutes = parseInt(string.slice(3, 5), 10);
    const type = string.slice(6, 8).toLowerCase();

    if(type === 'pm' && hour <= 12) {
        hour += 12;
    }

    const retval = parent.getDate();
    retval.setHours(hour);
    retval.setMinutes(minutes);

    return retval;
}
