import {
    Children,
    isValidElement,
    type KeyboardEvent,
    type ReactElement,
    type ReactNode,
} from 'react';
import { LIST_ITEM_MARKER } from './list-item/ListItem.utils';

export interface ListItemMetaProps {
    isExpandable?: boolean;
    shouldHideIndicator?: boolean;
    children?: ReactNode;
}

type ListItemMarkedType = {
    $$listItem?: typeof LIST_ITEM_MARKER;
};

export const isDirectListItemElement = (node: ReactNode): node is ReactElement<ListItemMetaProps> =>
    isValidElement(node) && (node.type as { displayName?: string }).displayName === 'ListItem';

export const isMarkedListItemElement = (node: ReactNode): node is ReactElement<ListItemMetaProps> =>
    isValidElement(node) &&
    typeof node.type !== 'string' &&
    (node.type as ListItemMarkedType).$$listItem === LIST_ITEM_MARKER;

export const shouldShowExpandIndicator = (node: ReactNode): boolean =>
    Children.toArray(node).some((child) => {
        if (isDirectListItemElement(child)) {
            return child.props.shouldHideIndicator !== true && child.props.children !== undefined;
        }

        if (isMarkedListItemElement(child)) {
            return child.props.isExpandable === true && child.props.shouldHideIndicator !== true;
        }

        if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
            return shouldShowExpandIndicator(child.props.children);
        }

        return false;
    });

const LEFT_ELEMENT_FOCUSABLE_SELECTOR =
    '[data-left-element="true"] a[href], [data-left-element="true"] button, [data-left-element="true"] input, [data-left-element="true"] select, [data-left-element="true"] textarea, [data-left-element="true"] [tabindex], [data-left-element="true"] [contenteditable="true"]';

const RIGHT_ELEMENT_FOCUSABLE_SELECTOR =
    '[data-right-element="true"] a[href], [data-right-element="true"] button, [data-right-element="true"] input, [data-right-element="true"] select, [data-right-element="true"] textarea, [data-right-element="true"] [tabindex], [data-right-element="true"] [contenteditable="true"]';

const getFocusableElements = (root: HTMLElement, selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (element) => !element.hasAttribute('disabled') && element.getAttribute('tabindex') !== '-1',
    );

const getFocusedElementIndex = (elements: HTMLElement[], targetElement: HTMLElement | null) => {
    if (!targetElement || elements.length === 0) {
        return -1;
    }

    return elements.findIndex(
        (element) => element === targetElement || element.contains(targetElement),
    );
};

export const handleHorizontalArrowNavigation = ({
    event,
    currentListItemElement,
    targetElement,
    isCurrentListItemTarget,
}: {
    event: KeyboardEvent<HTMLDivElement>;
    currentListItemElement: HTMLDivElement;
    targetElement: HTMLElement | null;
    isCurrentListItemTarget: boolean;
}) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
        return false;
    }

    const focusableLeftElements = getFocusableElements(
        currentListItemElement,
        LEFT_ELEMENT_FOCUSABLE_SELECTOR,
    );

    const focusableRightElements = getFocusableElements(
        currentListItemElement,
        RIGHT_ELEMENT_FOCUSABLE_SELECTOR,
    );

    const focusedLeftElementIndex = getFocusedElementIndex(focusableLeftElements, targetElement);

    if (focusedLeftElementIndex !== -1) {
        event.preventDefault();

        if (event.key === 'ArrowLeft') {
            const previousLeftElement = focusableLeftElements[focusedLeftElementIndex - 1];

            if (previousLeftElement) {
                previousLeftElement.focus();
            } else {
                currentListItemElement.focus();
            }

            return true;
        }

        const nextLeftElement = focusableLeftElements[focusedLeftElementIndex + 1];

        if (nextLeftElement) {
            nextLeftElement.focus();
        } else if (focusableRightElements.length > 0) {
            focusableRightElements[0]?.focus();
        }

        return true;
    }

    const focusedRightElementIndex = getFocusedElementIndex(focusableRightElements, targetElement);

    if (focusedRightElementIndex !== -1) {
        event.preventDefault();

        if (event.key === 'ArrowRight') {
            focusableRightElements[focusedRightElementIndex + 1]?.focus();
            return true;
        }

        const previousRightElement = focusableRightElements[focusedRightElementIndex - 1];

        if (previousRightElement) {
            previousRightElement.focus();
        } else if (focusableLeftElements.length > 0) {
            focusableLeftElements[focusableLeftElements.length - 1]?.focus();
        } else {
            currentListItemElement.focus();
        }

        return true;
    }

    if (isCurrentListItemTarget) {
        if (event.key === 'ArrowLeft' && focusableLeftElements.length > 0) {
            event.preventDefault();
            focusableLeftElements[focusableLeftElements.length - 1]?.focus();
            return true;
        }

        if (event.key === 'ArrowRight' && focusableRightElements.length > 0) {
            event.preventDefault();
            focusableRightElements[0]?.focus();
            return true;
        }
    }

    return false;
};

export const handleVerticalListGroupNavigation = ({
    event,
    isCurrentListItemTarget,
    isInKeyboardNavigationGroup,
    listItemUuids,
    currentUuid,
    listGroupUuid,
    updateActiveListItemUuid,
}: {
    event: KeyboardEvent<HTMLDivElement>;
    isCurrentListItemTarget: boolean;
    isInKeyboardNavigationGroup: boolean;
    listItemUuids?: string[];
    currentUuid: string;
    listGroupUuid?: string;
    updateActiveListItemUuid?: (uuid?: string) => void;
}) => {
    const isTab = event.key === 'Tab';
    const isShiftTab = isTab && event.shiftKey;

    if (
        !isCurrentListItemTarget ||
        !isInKeyboardNavigationGroup ||
        !listItemUuids?.length ||
        (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && !isTab)
    ) {
        return false;
    }

    const currentIndex = listItemUuids.indexOf(currentUuid);

    if (currentIndex === -1) {
        return true;
    }

    const isBackward = event.key === 'ArrowUp' || isShiftTab;

    // For Tab at the boundaries, let the browser handle natural tab order
    if (isTab) {
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex === listItemUuids.length - 1;

        if ((isShiftTab && isAtStart) || (!isShiftTab && isAtEnd)) {
            return false;
        }
    }

    event.preventDefault();

    const nextIndex = isBackward
        ? (currentIndex - 1 + listItemUuids.length) % listItemUuids.length
        : (currentIndex + 1) % listItemUuids.length;

    const nextListItemUuid = listItemUuids[nextIndex];

    if (
        nextListItemUuid &&
        nextListItemUuid !== currentUuid &&
        typeof listGroupUuid === 'string' &&
        typeof updateActiveListItemUuid === 'function'
    ) {
        const nextListItemElement = document.querySelector<HTMLDivElement>(
            `[data-uuid="${listGroupUuid}---${nextListItemUuid}"]`,
        );

        if (nextListItemElement) {
            updateActiveListItemUuid(nextListItemUuid);
            nextListItemElement.focus();
        }
    }

    return true;
};
