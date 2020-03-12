export default function getListLength(data) {
    let retVal = 0;
    Object.keys(data).forEach((key) => { retVal += data[key].length; });
    return retVal;
}
