import { type FocusEvent, useCallback, useState } from 'react';

type UseListItemFocusParams = {
    uuid: string;
    listGroupUuid?: string;
    isInKeyboardNavigationGroup: boolean;
    updateActiveListItemUuid?: (uuid?: string) => void;
};

export const useListItemFocus = ({
    uuid,
    listGroupUuid,
    isInKeyboardNavigationGroup,
    updateActiveListItemUuid,
}: UseListItemFocusParams) => {
    const [isFocusWithinListItem, setIsFocusWithinListItem] = useState(false);

    const handleFocus = useCallback(
        (event: FocusEvent<HTMLDivElement>) => {
            setIsFocusWithinListItem(true);

            if (
                event.currentTarget === event.target &&
                isInKeyboardNavigationGroup &&
                typeof updateActiveListItemUuid === 'function'
            ) {
                updateActiveListItemUuid(uuid);
            }
        },
        [isInKeyboardNavigationGroup, updateActiveListItemUuid, uuid],
    );

    const handleBlur = useCallback(
        (event: FocusEvent<HTMLDivElement>) => {
            const nextFocusedElement = event.relatedTarget as HTMLElement | null;
            const currentListItemElement = event.currentTarget as HTMLElement;

            if (nextFocusedElement && currentListItemElement.contains(nextFocusedElement)) {
                return;
            }

            setIsFocusWithinListItem(false);

            if (
                !isInKeyboardNavigationGroup ||
                typeof updateActiveListItemUuid !== 'function' ||
                typeof listGroupUuid !== 'string'
            ) {
                return;
            }

            if (!nextFocusedElement) {
                updateActiveListItemUuid(undefined);
                return;
            }

            const nextFocusedListItem = nextFocusedElement.closest<HTMLElement>(
                `[data-uuid^="${listGroupUuid}---"]`,
            );

            if (!nextFocusedListItem) {
                updateActiveListItemUuid(undefined);
            }
        },
        [isInKeyboardNavigationGroup, listGroupUuid, updateActiveListItemUuid],
    );

    return {
        isFocusWithinListItem,
        handleFocus,
        handleBlur,
    };
};
