export default function parseTimeString(str) {
    const regexRes = new RegExp('[0-9]{0,2}:[0-9]{0,2}').exec(str);
    let hours = null;
    let minutes = null;
    if (regexRes) {
        const parts = regexRes[0].split(':');

        hours = parseInt(parts[0], 10) || 0;
        minutes = parseInt(parts[1], 10) || 0;
    }

    return {
        hours,
        minutes,
    };
}
