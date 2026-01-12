import type { ContextMenuItem } from './ContextMenu.types';

export const getDefaultFocusedIndex = (items: ContextMenuItem[]): number =>
    items.findIndex((item) => item.isSelected);
