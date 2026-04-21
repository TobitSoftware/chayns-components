import React, { FC } from 'react';
import {
    StyledResizeHandle,
    StyledResizeHandleDrag,
    StyledResizeHandleLine,
} from './ResizeHandle.styles';
import { useDragHandle } from './ResizeHandle.hooks';
import { SplitLayoutDirection } from '../SplitLayout.types';

interface ResizeHandleProps {
    onDrag: (delta: number) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    direction: SplitLayoutDirection;
    size: number;
}

const ResizeHandle: FC<ResizeHandleProps> = ({
    onDrag,
    onDragStart,
    onDragEnd,
    direction,
    size,
}) => {
    const handlePointerDown = useDragHandle({
        direction,
        onDrag,
        onDragStart,
        onDragEnd,
    });

    return (
        <StyledResizeHandle $direction={direction} $size={size}>
            <StyledResizeHandleDrag $direction={direction} onPointerDown={handlePointerDown} />
            <StyledResizeHandleLine />
        </StyledResizeHandle>
    );
};

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
