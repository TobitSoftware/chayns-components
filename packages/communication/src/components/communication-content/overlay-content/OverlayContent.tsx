import React, { FC, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { PanInfo } from 'motion/react';
import {
    StyledMotionOverlayContent,
    StyledMotionOverlayContentHandleWrapper,
    StyledOverlayContentHandle,
} from './OverlayContent.styles';
import { OverlayContentConfig } from '../CommunicationContent.types';

interface OverlayContentProps {
    children: ReactNode;
    config?: OverlayContentConfig;
    height: number;
}

const getClosestSnapPoint = (value: number, snapPoints: number[]) =>
    snapPoints.reduce((closest, snapPoint) =>
        Math.abs(snapPoint - value) < Math.abs(closest - value) ? snapPoint : closest,
    );

const OverlayContent: FC<OverlayContentProps> = ({ children, config, height }) => {
    const { topOffset = 0, minHeight = 26 } = config ?? {};

    const dragStartHeightRef = useRef(minHeight);
    const isDraggingRef = useRef(false);

    const snapPoints: [number, number, number] = useMemo(() => {
        const maxHeight = Math.max(minHeight, height - topOffset);
        const middleHeight = minHeight + (maxHeight - minHeight) / 2;

        return [minHeight, middleHeight, maxHeight];
    }, [height, minHeight, topOffset]);

    const [contentHeight, setContentHeight] = useState(minHeight);

    const handleDragStart = useCallback(() => {
        dragStartHeightRef.current = contentHeight;
    }, [contentHeight]);

    const handleDrag = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            isDraggingRef.current = true;

            const nextHeight = dragStartHeightRef.current - info.offset.y;

            setContentHeight(Math.min(Math.max(nextHeight, snapPoints[0]), snapPoints[2]));
        },
        [snapPoints],
    );

    const handleDragEnd = useCallback(() => {
        isDraggingRef.current = false;

        setContentHeight((currentHeight) => getClosestSnapPoint(currentHeight, snapPoints));
    }, [snapPoints]);

    return (
        <StyledMotionOverlayContent
            animate={{ height: contentHeight }}
            transition={
                isDraggingRef.current
                    ? { type: 'tween', duration: 0 }
                    : {
                          type: 'spring',
                          stiffness: 320,
                          damping: 32,
                      }
            }
        >
            <StyledMotionOverlayContentHandleWrapper
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            >
                <StyledOverlayContentHandle />
            </StyledMotionOverlayContentHandleWrapper>

            {children}
        </StyledMotionOverlayContent>
    );
};

OverlayContent.displayName = 'OverlayContent';

export default OverlayContent;
