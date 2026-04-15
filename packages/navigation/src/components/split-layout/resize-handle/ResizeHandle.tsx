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
}

const ResizeHandle: FC<ResizeHandleProps> = ({ onDrag, onDragStart, onDragEnd, direction }) => {
    const handlePointerDown = useDragHandle({
        direction,
        onDrag,
        onDragStart,
        onDragEnd,
    });

    return (
        <StyledResizeHandle $direction={direction}>
            <StyledResizeHandleDrag $direction={direction} onPointerDown={handlePointerDown} />
            <StyledResizeHandleLine />
        </StyledResizeHandle>
    );
};

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
