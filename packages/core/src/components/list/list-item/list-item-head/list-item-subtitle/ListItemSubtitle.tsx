import React, { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import {
    StyledListItemHeadSubtitleText,
    StyledListItemSubtitle,
    StyledListItemBottomRightElement,
} from './ListItemSubtitle.styles';
import { getElementClickEvent } from '../../../../../utils/accordion';

type ListItemSubtitleProps = {
    rightElements?: IListItemRightElements;
    subtitle?: ReactNode;
    isOpen: boolean;
    shouldAllowRightElementFocus?: boolean;
};

const ListItemSubtitle: FC<ListItemSubtitleProps> = ({
    rightElements,
    subtitle,
    isOpen,
    shouldAllowRightElementFocus = true,
}) => {
    const bottomElementRef = useRef<HTMLDivElement>(null);

    const handlePreventClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const bottomElement = useMemo(() => {
        if (typeof rightElements === 'object' && rightElements && 'bottom' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).bottom;
        }

        return undefined;
    }, [rightElements]);

    const shouldPreventRightElementClick = useMemo(() => {
        if (bottomElement) {
            return getElementClickEvent(bottomElement);
        }

        return false;
    }, [bottomElement]);

    useEffect(() => {
        const bottomElementWrapper = bottomElementRef.current;

        if (!bottomElementWrapper) {
            return;
        }

        const focusableElements = Array.from(
            bottomElementWrapper.querySelectorAll<HTMLElement>(
                'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
            ),
        );

        focusableElements.forEach((element) => {
            const currentElement = element;
            const datasetKey = 'listItemRightElementOriginalTabIndex';

            if (shouldAllowRightElementFocus) {
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
    }, [bottomElement, shouldAllowRightElementFocus]);

    return (
        <StyledListItemSubtitle>
            <StyledListItemHeadSubtitleText $isOpen={isOpen}>
                {subtitle}
            </StyledListItemHeadSubtitleText>
            {bottomElement && (
                <StyledListItemBottomRightElement
                    data-right-element="true"
                    ref={bottomElementRef}
                    onClick={shouldPreventRightElementClick ? handlePreventClick : undefined}
                >
                    {bottomElement}
                </StyledListItemBottomRightElement>
            )}
        </StyledListItemSubtitle>
    );
};

ListItemSubtitle.displayName = 'ListItemSubtitle';

export default ListItemSubtitle;
