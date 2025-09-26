import React, { FC, isValidElement, useMemo } from 'react';
import type { IListItemRightElement, IListItemRightElements } from '../../../../../types/list';
import { StyledListItemRightElement } from './ListItemRightElement.styles';
import { getElementClickEvent } from '../../../../../utils/accordion';

type ListItemRightElementProps = {
    rightElements?: IListItemRightElements;
};

const ListItemRightElement: FC<ListItemRightElementProps> = ({ rightElements }) => {
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

    if (!centerElement) {
        return null;
    }

    return (
        <StyledListItemRightElement
            onClick={shouldPreventRightElementClick ? handlePreventClick : undefined}
        >
            {centerElement}
        </StyledListItemRightElement>
    );
};

ListItemRightElement.displayName = 'ListItemRightElement';

export default ListItemRightElement;
