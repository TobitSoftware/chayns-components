import React, { FC, isValidElement, useEffect, useMemo, useRef } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import { StyledListItemRightElement } from './ListItemRightElement.styles';
import { getElementClickEvent } from '../../../../../utils/accordion';

type ListItemRightElementProps = {
    rightElements?: IListItemRightElements;
    shouldAllowFocus?: boolean;
};

const ListItemRightElement: FC<ListItemRightElementProps> = ({
    rightElements,
    shouldAllowFocus = true,
}) => {
    const rightElementRef = useRef<HTMLDivElement>(null);

    const handlePreventClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const centerElement = useMemo(() => {
        if (typeof rightElements === 'string' || isValidElement(rightElements)) {
            return rightElements;
        }

        if (typeof rightElements === 'object' && rightElements && 'center' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).center;
        }

        return undefined;
    }, [rightElements]);

    const shouldPreventRightElementClick = useMemo(() => {
        if (centerElement) {
            return getElementClickEvent(centerElement);
        }

        return false;
    }, [centerElement]);

    useEffect(() => {
        const rightElement = rightElementRef.current;

        if (!rightElement) {
            return;
        }

        const focusableElements = Array.from(
            rightElement.querySelectorAll<HTMLElement>(
                'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
            ),
        );

        focusableElements.forEach((element) => {
            const currentElement = element;
            const datasetKey = 'listItemRightElementOriginalTabIndex';

            if (shouldAllowFocus) {
                const originalTabIndex = currentElement.dataset[datasetKey];

                if (typeof originalTabIndex === 'string') {
                    if (originalTabIndex === '') {
                        currentElement.removeAttribute('tabindex');
                    } else {
                        currentElement.setAttribute('tabindex', originalTabIndex);
                    }

                    delete currentElement.dataset[datasetKey];
                }
            } else {
                if (typeof currentElement.dataset[datasetKey] !== 'string') {
                    currentElement.dataset[datasetKey] =
                        currentElement.getAttribute('tabindex') ?? '';
                }

                currentElement.setAttribute('tabindex', '-1');
            }
        });
    }, [centerElement, shouldAllowFocus]);

    if (!centerElement) {
        return null;
    }

    return (
        <StyledListItemRightElement
            ref={rightElementRef}
            data-right-element="true"
            onClick={shouldPreventRightElementClick ? handlePreventClick : undefined}
        >
            {centerElement}
        </StyledListItemRightElement>
    );
};

ListItemRightElement.displayName = 'ListItemRightElement';

export default ListItemRightElement;
