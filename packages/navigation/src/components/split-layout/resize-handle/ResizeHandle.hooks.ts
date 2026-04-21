import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { SplitLayoutDirection } from '../SplitLayout.types';

export interface UseDragHandleOptions {
    direction: SplitLayoutDirection;
    onDrag: (delta: number) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

const getPointerPosition = (
    event: PointerEvent | ReactPointerEvent,
    direction: SplitLayoutDirection,
): number => (direction === SplitLayoutDirection.HORIZONTAL ? event.clientX : event.clientY);

export const useDragHandle = ({
    direction,
    onDrag,
    onDragStart,
    onDragEnd,
}: UseDragHandleOptions): ((e: ReactPointerEvent<HTMLElement>) => void) => {
    const startPositionRef = useRef(0);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(
        () => () => {
            cleanupRef.current?.();
            cleanupRef.current = null;
        },
        [],
    );

    return useCallback(
        (event: ReactPointerEvent<HTMLElement>) => {
            event.preventDefault();

            startPositionRef.current = getPointerPosition(event, direction);

            const originalUserSelect = document.body.style.userSelect;
            const originalCursor = document.body.style.cursor;

            document.body.style.userSelect = 'none';
            document.body.style.cursor =
                direction === SplitLayoutDirection.HORIZONTAL ? 'col-resize' : 'row-resize';

            event.currentTarget.setPointerCapture?.(event.pointerId);

            if (typeof onDragStart === 'function') {
                onDragStart();
            }

            const onMove = (moveEvent: PointerEvent) => {
                moveEvent.preventDefault();

                const currentPosition = getPointerPosition(moveEvent, direction);
                const delta = currentPosition - startPositionRef.current;

                startPositionRef.current = currentPosition;

                onDrag(delta);
            };

            const cleanup = () => {
                document.body.style.userSelect = originalUserSelect;
                document.body.style.cursor = originalCursor;

                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                window.removeEventListener('pointercancel', onUp);

                cleanupRef.current = null;
            };

            const onUp = () => {
                cleanup();

                if (typeof onDragEnd === 'function') {
                    onDragEnd();
                }
            };

            cleanupRef.current = cleanup;

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);
            window.addEventListener('pointercancel', onUp);
        },
        [direction, onDrag, onDragEnd, onDragStart],
    );
};
