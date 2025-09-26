import React, { FC, ReactNode, useMemo } from 'react';
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
};

const ListItemSubtitle: FC<ListItemSubtitleProps> = ({ rightElements, subtitle, isOpen }) => {
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

    return (
        <StyledListItemSubtitle>
            <StyledListItemHeadSubtitleText $isOpen={isOpen}>
                {subtitle}
            </StyledListItemHeadSubtitleText>
            {bottomElement && (
                <StyledListItemBottomRightElement
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
