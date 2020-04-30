import parseTimeString from './parseTimeString';

export function checkTimeSpan(startTime, endTime) {
    const { hours: startHours, minutes: startMinutes } = parseTimeString(startTime);
    const { hours: endHours, minutes: endMinutes } = parseTimeString(endTime);

    if (startHours !== null && startMinutes !== null && endHours !== null && endMinutes !== null) {
        // check time if its not like '24:60'
        if (startHours > -1 && startHours < 24 && startMinutes > -1 && startMinutes < 60
            && endHours > -1 && endHours < 24 && endMinutes > -1 && endMinutes < 60) {
            // check start and end
            return (startHours < endHours) || (startHours === endHours && endMinutes > startMinutes) || (endHours === 0 && endMinutes === 0);
        }
    }
    return false;
}
