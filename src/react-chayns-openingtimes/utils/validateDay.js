import checkDay from './checkDay';
import { validateTimeSpan } from './validateTimeSpan';

export function validateDay(times) {
    if (times.findIndex((time) => !validateTimeSpan(time.start, time.end)) !== -1) {
        return false;
    }

    return checkDay(times);
}
