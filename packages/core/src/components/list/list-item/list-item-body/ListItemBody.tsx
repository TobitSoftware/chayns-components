import React, { FC, ReactNode, useRef, useState } from 'react';
import { StyledMotionListItemBody } from './ListItemBody.styles';

interface ListItemBodyProps {
    children?: ReactNode;
    id: string;
    shouldHideBody: boolean;
}

const ListItemBody: FC<ListItemBodyProps> = ({ children, id, shouldHideBody }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <StyledMotionListItemBody
            key={id}
            animate={{ height: shouldHideBody ? '0' : 'auto', opacity: shouldHideBody ? 0 : 1 }}
            className="beta-chayns-list-item-body"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween' }}
        >
            <div ref={containerRef}>{children}</div>
        </StyledMotionListItemBody>
    );
};

ListItemBody.displayName = 'ListItemBody';

export default ListItemBody;
