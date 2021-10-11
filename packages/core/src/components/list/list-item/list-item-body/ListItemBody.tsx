import React, { FC } from 'react';
import { StyledMotionListItemBody } from './ListItemBody.styles';

const ListItemBody: FC = ({ children }) => (
    <StyledMotionListItemBody
        animate={{ height: 'auto', opacity: 1 }}
        className="beta-chayns-accordion-body"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
    >
        {children}
    </StyledMotionListItemBody>
);

ListItemBody.displayName = 'ListItemBody';

export default ListItemBody;
