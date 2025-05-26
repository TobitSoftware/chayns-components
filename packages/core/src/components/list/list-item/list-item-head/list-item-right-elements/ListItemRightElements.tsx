import React, { FC, isValidElement, useMemo } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import {
    StyledListItemRightElements,
    StyledListItemRightElementsLeft,
    StyledListItemRightElementsLeftBottom,
    StyledListItemRightElementsLeftPseudo,
    StyledListItemRightElementsLeftTop,
    StyledListItemRightElementsRight,
} from './ListItemRightElements.styles';

type ListItemRightElementsProps = {
    rightElements?: IListItemRightElements;
    shouldPreventRightElementClick?: boolean;
};

const ListItemRightElements: FC<ListItemRightElementsProps> = ({
    rightElements,
    shouldPreventRightElementClick,
}) => {
    const handlePreventClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const topElement = useMemo(() => {
        if (typeof rightElements === 'object' && rightElements && 'top' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).top;
        }

        return undefined;
    }, [rightElements]);

    const bottomElement = useMemo(() => {
        if (typeof rightElements === 'object' && rightElements && 'bottom' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).bottom;
        }

        return undefined;
    }, [rightElements]);

    const centerElement = useMemo(() => {
        if (typeof rightElements === 'string' || isValidElement(rightElements)) {
            return rightElements;
        }

        if (typeof rightElements === 'object' && rightElements && 'center' in rightElements) {
            return (rightElements as unknown as IListItemRightElement).center;
        }

        return undefined;
    }, [rightElements]);

    const { topAlignment, bottomAlignment } = useMemo(() => {
        if (
            typeof rightElements === 'object' &&
            ((rightElements && 'topAlignment' in rightElements) ||
                (rightElements && 'bottomAlignment' in rightElements))
        ) {
            return {
                topAlignment: rightElements.topAlignment,
                bottomAlignment: rightElements.bottomAlignment,
            };
        }

        return { topAlignment: undefined, bottomAlignment: undefined };
    }, [rightElements]);

    return (
        <StyledListItemRightElements
            onClick={shouldPreventRightElementClick ? handlePreventClick : undefined}
        >
            {(topElement || bottomElement) && (
                <StyledListItemRightElementsLeft>
                    {topElement ? (
                        <StyledListItemRightElementsLeftTop $alignment={topAlignment}>
                            {topElement}
                        </StyledListItemRightElementsLeftTop>
                    ) : (
                        <StyledListItemRightElementsLeftPseudo>
                            .
                        </StyledListItemRightElementsLeftPseudo>
                    )}
                    {bottomElement && (
                        <StyledListItemRightElementsLeftBottom $alignment={bottomAlignment}>
                            {bottomElement}
                        </StyledListItemRightElementsLeftBottom>
                    )}
                </StyledListItemRightElementsLeft>
            )}
            {centerElement && (
                <StyledListItemRightElementsRight>{centerElement}</StyledListItemRightElementsRight>
            )}
        </StyledListItemRightElements>
    );
};

ListItemRightElements.displayName = 'ListItemRightElements';

export default ListItemRightElements;
