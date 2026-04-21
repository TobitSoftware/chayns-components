import { NavigationLayoutItem } from '../../../NavigationLayout.types';

export interface Coordinates {
    x: number;
    y: number;
}

interface AreCoordinatesEqualOptions {
    coordinatesA: Coordinates | null;
    coordinatesB: Coordinates | null;
}

interface GetSidebarItemPopupCoordinatesOptions {
    container: HTMLElement;
    item: HTMLElement;
    offset?: number;
}

interface GetScrollableAncestorElementsOptions {
    element: HTMLElement;
    boundaryElement?: HTMLElement | null;
}

const SCROLLABLE_OVERFLOW_VALUES = ['auto', 'scroll', 'overlay'];

const isScrollableElement = (element: HTMLElement): boolean => {
    const { overflowX, overflowY } = window.getComputedStyle(element);

    return [overflowX, overflowY].some((value) => SCROLLABLE_OVERFLOW_VALUES.includes(value));
};

export const areCoordinatesEqual = ({
    coordinatesA,
    coordinatesB,
}: AreCoordinatesEqualOptions): boolean => {
    if (!coordinatesA || !coordinatesB) {
        return coordinatesA === coordinatesB;
    }

    return coordinatesA.x === coordinatesB.x && coordinatesA.y === coordinatesB.y;
};

export const getSidebarItemPopupCoordinates = ({
    container,
    item,
    offset = 5,
}: GetSidebarItemPopupCoordinatesOptions): Coordinates => {
    const { left: itemLeft, top: itemTop, width, height } = item.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } = container.getBoundingClientRect();

    return {
        x: Math.round(itemLeft - containerLeft + width + offset),
        y: Math.round(itemTop - containerTop + height / 2),
    };
};

export const getScrollableAncestorElements = ({
    element,
    boundaryElement,
}: GetScrollableAncestorElementsOptions): HTMLElement[] => {
    const scrollableElements: HTMLElement[] = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (isScrollableElement(currentElement)) {
            scrollableElements.push(currentElement);
        }

        if (currentElement === boundaryElement) {
            break;
        }

        currentElement = currentElement.parentElement;
    }

    return scrollableElements;
};

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
