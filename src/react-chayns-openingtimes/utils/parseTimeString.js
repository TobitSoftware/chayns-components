const TIME_STRING_REGEX = /([0-9]{0,2}):([0-9]{0,2})/;

export default function parseTimeString(str) {
    const regexRes = TIME_STRING_REGEX.exec(str);
    let hours = null;
    let minutes = null;

    if (regexRes) {
        hours = parseInt(regexRes[1], 10) || 0;
        minutes = parseInt(regexRes[2], 10) || 0;
    }

    return {
        hours,
        minutes,
    };
}
