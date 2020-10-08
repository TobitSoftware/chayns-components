import { isFunction } from '../../utils/is';

export default function getList(data, orm, inputValue) {
    let retVal = [];
    if (Array.isArray(orm.groups)) {
        orm.groups.forEach(({ key, show }) => {
            if (!(isFunction(show) && !show(inputValue))) {
                let list;
                if (orm.filter) {
                    list = data[key].filter(orm.filter(inputValue));
                } else {
                    list = data[key];
                }
                retVal = retVal.concat(list);
            }
        });
    } else {
        Object.keys(data).forEach((key) => {
            if (!isFunction(orm.filter) || orm.filter(inputValue)(data[key])) {
                const item = data[key];
                retVal = retVal.concat(item);
            }
        });
    }
    return retVal;
}
