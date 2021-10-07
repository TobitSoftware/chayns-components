import React, { FC } from 'react';
import { StyledListItemContent } from './ListItemContent.styles';

const ListItemContent: FC = ({ children }) => (
    <StyledListItemContent className="beta-chayns-list-item-content">
        {children}
    </StyledListItemContent>
);

ListItemContent.displayName = 'ListItemContent';

export default ListItemContent;
