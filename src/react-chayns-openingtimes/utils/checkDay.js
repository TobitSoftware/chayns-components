import parseTimeString from './parseTimeString';

export default function checkDay(times) {
    if (times.length !== 2) {
        return true;
    }

    const firstTime = times[0];
    const lastTime = times[times.length - 1];

    const {
        hours: lastStartHours,
        minutes: lastStartMinutes,
    } = parseTimeString(lastTime.start);

    const {
        hours: firstEndHours,
        minutes: firstEndMinutes,
    } = parseTimeString(firstTime.start);

    if (firstEndHours > lastStartHours || (firstEndHours === lastStartHours && firstEndMinutes > lastStartMinutes)) {
        return false;
    }

    return true;
}
