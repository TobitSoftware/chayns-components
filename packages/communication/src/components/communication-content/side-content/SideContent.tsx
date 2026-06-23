import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';
import {
    StyledMotionDrag,
    StyledMotionSideContent,
    StyledMotionSideContentHandle,
} from './SideContent.styles';
import { CommunicationContentProps } from '../CommunicationContent.types';
import { PanInfo } from 'motion/react';

interface SideContentProps {
    children: ReactNode;
    config?: CommunicationContentProps['sideContentConfig'];
    onDragEnd?: CommunicationContentProps['onDragEnd'];
}

const SideContent: FC<SideContentProps> = ({ children, config, onDragEnd }) => {
    const { initialWidth = 360, minWidth = 280, maxWidth = 520 } = config ?? {};

    const [width, setWidth] = useState(initialWidth);

    const dragStartWidthRef = useRef(minWidth);

    const handleDragStart = useCallback(() => {
        dragStartWidthRef.current = width;
    }, [width]);

    const handleDrag = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const nextWidth = dragStartWidthRef.current + info.offset.x * 2;

            const newWidth = Math.min(Math.max(nextWidth, minWidth), maxWidth);

            setWidth(newWidth);
        },
        [maxWidth, minWidth],
    );

    const handleDragEnd = useCallback(() => {
        if (typeof onDragEnd === 'function') {
            onDragEnd(width);
        }
    }, [onDragEnd, width]);

    return (
        <StyledMotionSideContent animate={{ width }} transition={{ type: 'tween', duration: 0 }}>
            {children}
            <StyledMotionSideContentHandle>
                <StyledMotionDrag
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    style={{ x: '50%' }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                />
            </StyledMotionSideContentHandle>
        </StyledMotionSideContent>
    );
};

SideContent.displayName = 'SideContent';

export default SideContent;
