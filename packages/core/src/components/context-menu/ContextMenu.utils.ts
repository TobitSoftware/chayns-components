import type { ContextMenuItem } from './ContextMenu.types';

export const getDefaultFocusedIndex = (items: ContextMenuItem[]): number =>
    items.findIndex((item) => item.isSelected && !item.isDisabled);

export const getActiveItemIndex = ({
    contextMenuContentElement,
    focusedIndex,
}: {
    contextMenuContentElement: HTMLDivElement | null;
    focusedIndex: number;
}) => {
    const activeElement = document.activeElement as HTMLElement | null;
    const activeItemElement = contextMenuContentElement?.contains(activeElement)
        ? activeElement?.closest<HTMLElement>('[data-index]')
        : undefined;

    return activeItemElement ? Number(activeItemElement.dataset.index) : focusedIndex;
};

export const selectItem = ({
    index,
    items,
    onClose,
    shouldCloseOnPopupClick,
}: {
    index: number;
    items: ContextMenuItem[];
    onClose: VoidFunction;
    shouldCloseOnPopupClick: boolean;
}) => {
    const item = items[index];

    if (!item) {
        return false;
    }

    if (item.isDisabled) {
        return true;
    }

    void item.onClick();

    if (shouldCloseOnPopupClick) {
        onClose();
    }

    return true;
};
