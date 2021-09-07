import text from '../../constants/text';

export const getRelativeDateString = (date, options = { language: 'de' }) => {
    const dateObj = new Date(date);
    const now = new Date();
    let timeBetween = now.getTime() - dateObj.getTime();
    const dateObj2 = new Date(date);
    const now2 = new Date();
    dateObj2.setHours(0);
    dateObj2.setMinutes(0);
    dateObj2.setSeconds(0);
    dateObj2.setMilliseconds(0);
    now2.setHours(0);
    now2.setMinutes(0);
    now2.setSeconds(0);
    now2.setMilliseconds(0);
    let timeBetween2 = now2.getTime() - dateObj2.getTime();
    let tense;
    if (timeBetween < 0) {
        tense = 'future';
        timeBetween *= -1;
        timeBetween2 *= -1;
    } else if (timeBetween > 0) {
        tense = 'past';
    } else {
        tense = 'now';
    }
    let unit = 'now';
    if (timeBetween < 1000 * 60) {
        unit = 'seconds';
    } else if (timeBetween < 1000 * 60 * 60) {
        unit = 'minutes';
    } else if (timeBetween < 1000 * 60 * 60 * 24) {
        unit = 'hours';
    } else if (timeBetween2 < 1000 * 60 * 60 * 24 * 30) {
        unit = 'days';
    } else if (timeBetween < 1000 * 60 * 60 * 24 * 365) {
        unit = 'months';
    } else if (timeBetween >= 1000 * 60 * 60 * 24 * 365) {
        unit = 'years';
    }
    const relativeValues = {
        seconds: Math.floor((timeBetween /= 1000) % 60),
        minutes: Math.floor((timeBetween /= 60) % 60),
        hours: Math.floor((timeBetween /= 60) % 24),
        wrongDays: Math.floor((timeBetween /= 24) % 30),
        days: Math.floor((timeBetween2 / 1000 / 60 / 60 / 24) % 30),
        months: Math.floor(timeBetween / 30),
        years: Math.floor(timeBetween / 365),
    };
    const absoluteValues = {
        seconds: dateObj.getSeconds(),
        minutes: dateObj.getMinutes(),
        hours: dateObj.getHours(),
        days: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        monthWritten: text[options.language].MONTHS[dateObj.getMonth()],
        monthShortWritten:
            text[options.language].MONTHS_SHORT[dateObj.getMonth()],
        years: options.hideYear ? '' : dateObj.getFullYear(),
    };

    // 2019->19
    if (options.hideYear === null) {
        absoluteValues.years = absoluteValues.years
            .toString()
            .substring(absoluteValues.years.toString().length - 2);
    }

    if (
        options.showTime === !!options.showTime &&
        (unit === 'seconds' || unit === 'minutes' || unit === 'hours')
    ) {
        unit = 'days';
    }

    if (
        (relativeValues[unit] === 1 ||
            (relativeValues.days === 0 &&
                dateObj.toDateString() !== now.toDateString())) &&
        options.useTomorrowYesterday !== false
    ) {
        // if value of unit is only 1...
        unit = unit.substring(0, unit.length - 1); // ...use singular of unit
    } else if (
        relativeValues[unit] === 0 &&
        dateObj.toDateString() === now.toDateString() &&
        options.useToday !== false
    ) {
        unit += '0';
    }

    if (
        options.showDate === false &&
        !(
            unit === 'seconds' ||
            unit === 'now' ||
            unit === 'minutes' ||
            unit === 'hours'
        ) &&
        options.showTime === null
    ) {
        unit = 'hours';
    }

    let txt = text[options.language].RELATIVE_TEXT[tense][unit];

    if (
        options.showDate === false &&
        options.showTime === true &&
        !options.useToday &&
        !options.useTomorrowYesterday
    ) {
        txt = '';
    } else if (
        (options.showDate || options.writeMonth) &&
        !(options.useTomorrowYesterday && unit === 'day') &&
        !(
            options.useToday &&
            (unit.charAt(unit.length - 1) === '0' || unit === 'now')
        )
    ) {
        if (options.writeMonth) {
            txt = text[options.language].ABSOLUTE_TEXT.dateMW;
        } else if (options.writeMonth === false) {
            txt = text[options.language].ABSOLUTE_TEXT.date;
        } else {
            txt = text[options.language].ABSOLUTE_TEXT.dateMSW;
        }
    }

    if (options.writeDay) {
        const day = text[options.language].WEEKDAYS[(dateObj.getDay() + 6) % 7];
        if (options.showDate || options.writeMonth) {
            txt = `${day}, ${txt}`;
        } else {
            txt = `${day} `;
        }
    }

    if (options.showTime) {
        if (txt) {
            txt += ` ${text[options.language].ABSOLUTE_TEXT.at} `;
        }
        txt += `${text[options.language].ABSOLUTE_TEXT.time}`;
    }

    return replace(txt, relativeValues, absoluteValues);
};

export const getAbsoluteDateString = (date, options = { language: 'de' }) => {
    const dateObj = new Date(date);
    const txt = text[options.language].ABSOLUTE_TEXT.datetimeMSW;
    const absoluteValues = {
        seconds: dateObj.getSeconds(),
        minutes: dateObj.getMinutes(),
        hours: dateObj.getHours(),
        days: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        monthShortWritten:
            text[options.language].MONTHS_SHORT[dateObj.getMonth()],
        years: dateObj.getFullYear(),
    };
    return replace(txt, {}, absoluteValues);
};

export const replace = (string, relativeValues, absoluteValues) =>
    string
        .replace('##rMINUTES##', relativeValues.minutes)
        .replace('##rHOURS##', relativeValues.hours)
        .replace('##rDAYS##', relativeValues.days)
        .replace('##rMONTHS##', relativeValues.months)
        .replace('##rYEARS##', relativeValues.years)
        .replace('##aSECONDS##', absoluteValues.seconds)
        .replace('##aMINUTES##', leadingZero(absoluteValues.minutes))
        .replace('##aHOURS##', leadingZero(absoluteValues.hours))
        .replace('##aDAYS##', leadingZero(absoluteValues.days))
        .replace('##aMONTH##', leadingZero(absoluteValues.month))
        .replace('##aMONTHsw##', absoluteValues.monthShortWritten)
        .replace('##aMONTHw##', absoluteValues.monthWritten)
        .replace('##aYEARS##', absoluteValues.years)
        .replace(/^\s*|\s*$/g, ''); // Matches whitespace at the start and end of the string

export const leadingZero = (value) => value.toString().padStart(2, '0');
