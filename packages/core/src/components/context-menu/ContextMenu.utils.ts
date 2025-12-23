import type { ContextMenuItem } from './ContextMenu.types';

export const getDefaultFocusedIndex = (items: ContextMenuItem[]): number => {
    const firstSelectedIndex = items.findIndex((item) => item.isSelected);

    return firstSelectedIndex !== -1 ? firstSelectedIndex : 0;
};
