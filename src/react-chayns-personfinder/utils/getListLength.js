import getList from './getList';

export default function getListLength(data, orm, inputValue) {
    return getList(data, orm, inputValue).length;
}
