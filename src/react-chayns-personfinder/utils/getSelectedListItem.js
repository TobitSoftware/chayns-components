import getList from './getList';

export default function getSelectedListItem(data, index, orm, inputValue) {
    return getList(data, orm, inputValue)[index];
}
