import React, { FC, ReactNode } from 'react';
import { StyledListItemContent } from './ListItemContent.styles';

type ListItemContentProps = {
    /**
     * The Elements that should be shown inside the LIstItemContent
     */
    children: ReactNode;
};

const ListItemContent: FC<ListItemContentProps> = ({ children }) => (
    <StyledListItemContent className="beta-chayns-list-item-content">
        {children}
    </StyledListItemContent>
);

ListItemContent.displayName = 'ListItemContent';

export default ListItemContent;
