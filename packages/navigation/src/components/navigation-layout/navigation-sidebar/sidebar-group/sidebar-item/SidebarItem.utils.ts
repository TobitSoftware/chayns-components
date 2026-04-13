import { NavigationLayoutItem } from '../../../NavigationLayout.types';

export const isItemOrChildSelected = (item: NavigationLayoutItem, selectedId?: string): boolean => {
    if (!selectedId) {
        return false;
    }

    if (item.id === selectedId) {
        return true;
    }

    if (!item.children?.length) {
        return false;
    }

    return item.children.some((child) => isItemOrChildSelected(child, selectedId));
};
