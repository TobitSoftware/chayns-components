import React, { FC, ReactNode, useRef, useState } from 'react';
import { StyledMotionListItemBody } from './ListItemBody.styles';

interface ListItemBodyProps {
    children?: ReactNode;
    id: string;
}

const ListItemBody: FC<ListItemBodyProps> = ({ children, id }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [height] = useState<number | 'auto'>('auto');

    return (
        <StyledMotionListItemBody
            key={id}
            animate={{ height, opacity: 1 }}
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
