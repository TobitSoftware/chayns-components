import parseTimeString from './parseTimeString';

// check time if its not like '24:60'
export default function validateTime(time) {
    const { hours, minutes } = parseTimeString(time);

    return (
        hours !== null &&
        minutes !== null &&
        hours > -1 &&
        hours < 24 &&
        minutes > -1 &&
        minutes < 60
    );
}
