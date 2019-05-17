/* eslint-disable radix */
// eslint-disable-next-line import/prefer-default-export
export const getTimeStringMinutes = (timeStr) => {
    const parts = timeStr.split(':');

    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const totalMin = hours * 60 + minutes;

    return totalMin;
};

export const getTimeStringFromMinutes = (totalMinutes) => {
    if (totalMinutes > 24 * 60) totalMinutes -= 24 * 60;

    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;

    if (hours === 24) hours = 0;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
