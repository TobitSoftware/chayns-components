import React, { FC, useEffect, useRef, useState } from 'react';
import { StyledMotionListItemBody } from './ListItemBody.styles';

interface ListItemBodyProps {
    id: string;
}

const ListItemBody: FC<ListItemBodyProps> = ({ children, id }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | 'auto'>('auto');

    useEffect(() => {
        if (containerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;
                    setHeight(observedHeight);
                }
            });

            resizeObserver.observe(containerRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, []);

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
