import { isFunction } from '../../utils/is';

export default function getList(data, orm, inputValue) {
    let retVal = [];
    if (Array.isArray(orm.groups)) {
        orm.groups.forEach(({ key, show }) => {
            if (!(isFunction(show) && !show(inputValue) && (!isFunction(orm.filter) || orm.filter(inputValue)))) {
                const list = data[key];
                retVal = retVal.concat(list);
            }
        });
    } else {
        Object.keys(data)
            .forEach((key) => {
                if (!isFunction(orm.filter) || orm.filter(inputValue)) {
                    const list = data[key];
                    retVal = retVal.concat(list);
                }
            });
    }
    return retVal;
}
