import { checkTimeSpan } from './checkTimeSpan';
import validateTime from './validateTime';

export function validateTimeSpan(startTime, endTime) {
    return (
        validateTime(startTime) &&
        validateTime(endTime) &&
        checkTimeSpan(startTime, endTime)
    );
}
