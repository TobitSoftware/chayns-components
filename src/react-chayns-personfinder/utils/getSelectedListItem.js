export default function getSelectedListItem(data, index) {
    let length = 0;
    let retVal = null;
    Object.keys(data).forEach((key) => {
        const list = data[key];
        if (length + list.length >= index) {
            retVal = list[index - length];
        }
        length += data[key].length;
    });
    return retVal;
}
