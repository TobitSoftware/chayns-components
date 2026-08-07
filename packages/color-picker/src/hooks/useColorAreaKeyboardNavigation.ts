import { type KeyboardEvent, useCallback } from 'react';

type UseColorAreaKeyboardNavigationOptions = {
    move: (x: number, y: number) => void;
    onChangeStart: VoidFunction;
    onChangeEnd: VoidFunction;
    x: { get: () => number };
    y: { get: () => number };
};

export const useColorAreaKeyboardNavigation = ({
    move,
    onChangeStart,
    onChangeEnd,
    x,
    y,
}: UseColorAreaKeyboardNavigationOptions) =>
    useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const step = event.shiftKey ? 10 : 1;
            const horizontalChange =
                event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
            const verticalChange =
                event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;

            if (horizontalChange === 0 && verticalChange === 0) {
                return;
            }

            event.preventDefault();
            onChangeStart();
            move(x.get() + horizontalChange, y.get() + verticalChange);
            onChangeEnd();
        },
        [move, onChangeEnd, onChangeStart, x, y],
    );
