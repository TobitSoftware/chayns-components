import { isValidElement, ReactNode, type ReactElement } from 'react';

export const isTextOnlyElement = (element: ReactNode): boolean => {
    if (typeof element === 'string') {
        return true;
    }

    if (!isValidElement(element)) {
        return false;
    }

    const validTags = ['p', 'span', 'div'];
    if (!validTags.includes(element.type as string)) {
        return false;
    }

    const { children } = (element as ReactElement).props;

    return typeof children === 'string';
};
