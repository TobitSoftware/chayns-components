import { isFunction } from '../../utils/is';

export default function getList(data, orm, inputValue) {
    let retVal = [];
    if (Array.isArray(orm.groups)) {
        orm.groups.forEach(({ key, show, filter }) => {
            if (!(isFunction(show) && !show(inputValue))) {
                let list;
                if (filter) {
                    list = data[key].filter(filter(inputValue));
                } else {
                    list = data[key];
                }
                retVal = retVal.concat(list);
            }
        });
    } else {
        Object.keys(data).forEach((key) => {
            if (
                !(
                    orm &&
                    orm.groups &&
                    orm.groups[key] &&
                    isFunction(orm.groups[key].filter)
                ) ||
                orm.groups[key].filter(inputValue)(data[key])
            ) {
                const item = data[key];
                retVal = retVal.concat(item);
            }
        });
    }
    return retVal;
}
