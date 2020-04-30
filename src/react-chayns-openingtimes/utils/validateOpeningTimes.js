import { validateDay } from './validateDay';

export default function validateOpeningTimes(openingTimes) {
    const openingTimesByDay = {};

    openingTimes.forEach((openingTime) => {
        if (!openingTimesByDay[openingTime.weekDay]) {
            openingTimesByDay[openingTime.weekDay] = [];
        }

        openingTimesByDay[openingTime.weekDay].push(openingTime);
    });

    const days = Object.values(openingTimesByDay);
    for (let i = 0, z = days.length; i < z; i += 1) {
        if (!validateDay(days[i])) {
            return false;
        }
    }

    return true;
}
