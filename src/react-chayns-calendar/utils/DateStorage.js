const dates = {};

export default class DateStorage {
    static From(year, month, date) {
        const key = `${year}_${month}_${date}`;

        if (!dates[key]) {
            dates[key] = new Date(year, month, date);
        }

        return dates[key];
    }
}
