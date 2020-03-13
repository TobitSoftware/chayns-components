export default function getList(data, orm, inputValue) {
    let retVal = [];
    if (Array.isArray(orm.groups)) {
        orm.groups.forEach(({ key, show }) => {
            if (!(typeof show === 'function' && !show(inputValue))) {
                const list = data[key];
                retVal = retVal.concat(list);
            }
        });
    } else {
        Object.keys(data)
            .forEach((key) => {
                const list = data[key];
                retVal = retVal.concat(list);
            });
    }
    return retVal;
}
