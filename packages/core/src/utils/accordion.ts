import { Children, isValidElement, ReactNode } from 'react';
import type { AccordionHeadProps } from '../components/accordion/accordion-head/AccordionHead';

type GetAccordionHeadHeightOptions = Pick<AccordionHeadProps, 'isWrapped' | 'title'> & {
    width: number;
    hasSearch: boolean;
};

interface GetAccordionHeadHeightResult {
    closed: number;
    open: number;
}

export const getAccordionHeadHeight = ({
    isWrapped,
    title,
    width,
    hasSearch,
}: GetAccordionHeadHeightOptions): GetAccordionHeadHeightResult => {
    const element = document.createElement('div');

    element.style.fontSize = '1rem';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.whiteSpace = 'nowrap';
    element.style.width = `${width}px`;

    element.innerHTML = title;

    document.body.appendChild(element);

    const closedHeight = Math.max(element.clientHeight + 8, isWrapped ? 40 : 33);

    if (isWrapped) {
        element.style.fontWeight = 'bold';
        element.style.whiteSpace = 'nowrap';
    } else {
        element.style.fontSize = '1.3rem';
        element.style.whiteSpace = hasSearch ? 'nowrap' : 'normal';
    }

    const openHeight = Math.max(element.clientHeight + 8, isWrapped ? 40 : 33);

    document.body.removeChild(element);

    return { closed: closedHeight, open: openHeight };
};

export const getElementClickEvent = (element: ReactNode) => {
    let hasClickHandler = false;

    const checkForClickHandler = (el: ReactNode) => {
        if (!isValidElement(el)) return;

        if (
            typeof el.type !== 'string' &&
            'displayName' in el.type &&
            (el.type.displayName === 'Checkbox' ||
                el.type.displayName === 'ComboBox' ||
                el.type.displayName === 'SelectButton')
        ) {
            hasClickHandler = true;

            return;
        }

        if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            el.props.onClick ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            el.props.onPointerDown ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            el.props.onMouseDown ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            el.props.onTouchStart
        ) {
            hasClickHandler = true;

            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (el.props.children) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            Children.forEach(el.props.children, checkForClickHandler);
        }
    };

    checkForClickHandler(element);

    return hasClickHandler;
};
