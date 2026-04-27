import React, { useRef } from 'react';

export const useDragHandle = (
    onDrag: (deltaX: number) => void,
): ((e: React.MouseEvent) => void) => {
    const startX = useRef(0);

    return (e: React.MouseEvent) => {
        e.preventDefault();
        startX.current = e.clientX;

        const originalUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = 'none';

        const onMove = (ev: MouseEvent) => {
            ev.preventDefault();
            const delta = ev.clientX - startX.current;
            startX.current = ev.clientX;
            onDrag(delta);
        };

        const onUp = () => {
            document.body.style.userSelect = originalUserSelect;

            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };
};

export const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));
