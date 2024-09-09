import React, { FC, isValidElement, useMemo } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import {
    StyledListItemRightElements,
    StyledListItemRightElementsLeft,
    StyledListItemRightElementsLeftBottom,
    StyledListItemRightElementsLeftTop,
    StyledListItemRightElementsRight,
} from './ListItemRightElements.styles';

type ListItemRightElementsProps = {
    rightElements?: IListItemRightElements;
};

const ListItemRightElements: FC<ListItemRightElementsProps> = ({ rightElements }) => {
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

    return (
        <StyledListItemRightElements>
            {(topElement || bottomElement) && (
                <StyledListItemRightElementsLeft>
                    {topElement && (
                        <StyledListItemRightElementsLeftTop>
                            {topElement}
                        </StyledListItemRightElementsLeftTop>
                    )}
                    {bottomElement && (
                        <StyledListItemRightElementsLeftBottom>
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
