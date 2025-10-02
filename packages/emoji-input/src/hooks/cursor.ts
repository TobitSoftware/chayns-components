import { MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentCursorPosition } from '../utils/selection';

type UseCursorPositionOptions = {
    isDisabled?: boolean;
};

type UseCursorPositionReturn = {
    position: number | null;
    trigger: () => void;
    lastPositionRef: MutableRefObject<number | null>;
};

export const useCursorPosition = (
    editorRef: RefObject<HTMLDivElement>,
    onChange?: (position: number) => void,
    options?: UseCursorPositionOptions,
): UseCursorPositionReturn => {
    const { isDisabled } = options || {};
    const [position, setPosition] = useState<number | null>(null);

    const rafIdRef = useRef<number | null>(null);
    const lastPositionRef = useRef<number | null>(null);

    const emit = useCallback(() => {
        const el = editorRef.current;

        if (!el || isDisabled) return;

        const pos = getCurrentCursorPosition(el);

        if (pos !== null && pos !== lastPositionRef.current) {
            lastPositionRef.current = pos;
            setPosition(pos);

            if (typeof onChange === 'function') onChange(pos);
        }
    }, [editorRef, onChange, isDisabled]);

    const scheduleEmit = useCallback(() => {
        if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);

        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            emit();
        });
    }, [emit]);

    const trigger = useCallback(() => {
        scheduleEmit();
    }, [scheduleEmit]);

    useEffect(() => {
        const el = editorRef.current;

        if (!el) return () => {};

        const onKeyUp = (e: KeyboardEvent) => {
            const navKeys = [
                'ArrowLeft',
                'ArrowRight',
                'ArrowUp',
                'ArrowDown',
                'Home',
                'End',
                'PageUp',
                'PageDown',
                'Backspace',
                'Delete',
            ];

            if (navKeys.includes(e.key)) scheduleEmit();
        };

        el.addEventListener('keyup', onKeyUp, { passive: true });

        return () => el.removeEventListener('keyup', onKeyUp);
    }, [editorRef, scheduleEmit]);

    useEffect(() => {
        const el = editorRef.current;

        if (!el) return () => {};

        const onMouseUp = () => scheduleEmit();
        const onTouchEnd = () => scheduleEmit();

        el.addEventListener('mouseup', onMouseUp, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener('mouseup', onMouseUp);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [editorRef, scheduleEmit]);

    useEffect(() => {
        const onSelectionChange = () => {
            const el = editorRef.current;
            const sel = document.getSelection();

            if (!el || !sel) return;

            const { anchorNode } = sel;

            if (anchorNode && el.contains(anchorNode) && document.activeElement === el) {
                scheduleEmit();
            }
        };

        document.addEventListener('selectionchange', onSelectionChange, { passive: true });

        return () => document.removeEventListener('selectionchange', onSelectionChange);
    }, [editorRef, scheduleEmit]);

    useEffect(() => {
        const el = editorRef.current;

        if (!el) return () => {};

        const onFocus = () => scheduleEmit();
        const onBlur = () => {
            lastPositionRef.current = null;
            setPosition(null);
        };

        el.addEventListener('focus', onFocus, { passive: true });
        el.addEventListener('blur', onBlur, { passive: true });

        return () => {
            el.removeEventListener('focus', onFocus);
            el.removeEventListener('blur', onBlur);
        };
    }, [editorRef, scheduleEmit]);

    useEffect(
        () => () => {
            if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
        },
        [],
    );

    return { position, trigger, lastPositionRef };
};
