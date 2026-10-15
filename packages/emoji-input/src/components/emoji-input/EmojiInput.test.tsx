import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EmojiInput, { type EmojiInputRef } from './EmojiInput';
import { getCurrentCursorPosition } from '../../utils/selection';

vi.mock('@chayns-components/core', async () => {
    const { createContext } = await import('react');
    return {
        AreaContext: createContext({}),
        useFocusRingPortal: () => undefined,
        useIsTouch: () => false,
        useKeyboardFocusHighlighting: () => false,
    };
});

vi.mock('../emoji-picker-popup/EmojiPickerPopup', () => ({ default: () => null }));
vi.mock('../../utils/asyncEmojiData', () => ({
    loadEmojiShortList: async () => ({ shortNameList: {}, regShortnames: /:never:/ }),
}));

const select = (node: Node, offset: number) => {
    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
};

beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
        configurable: true,
        get() {
            return this.textContent ?? '';
        },
        set(value: string) {
            this.textContent = value;
        },
    });
    Object.defineProperty(document, 'execCommand', {
        configurable: true,
        value: vi.fn(() => true),
    });
});

afterEach(() => {
    act(() => vi.runOnlyPendingTimers());
    vi.useRealTimers();
    // @ts-expect-error - jsdom does not define innerText.
    delete HTMLElement.prototype.innerText;
});

const setupDeletion = async () => {
    const ref = createRef<EmojiInputRef>();
    const view = render(<EmojiInput ref={ref} value="" shouldPreventEmojiPicker />);
    await act(async () => {});
    const editor = screen.getByRole('textbox');
    editor.textContent = 'ab\u200Bcd';
    act(() => editor.focus());
    select(editor.firstChild!, 3);
    fireEvent.keyDown(editor, { key: 'Backspace' });
    // Simulate the native removal of the zero-width space before the input handler.
    editor.firstChild!.textContent = 'abcd';
    select(editor.firstChild!, 2);
    fireEvent.input(editor);
    expect(editor.querySelector('.invisible-cursor-marker')).not.toBeNull();
    return { ...view, editor, ref };
};

describe('EmojiInput delayed deletion cursor', () => {
    it('cancels and removes the marker on unmount without moving focus', async () => {
        const { unmount, editor } = await setupDeletion();
        unmount();
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
        const activeElement = document.activeElement;
        expect(() => act(() => vi.advanceTimersByTime(10))).not.toThrow();
        expect(document.activeElement).toBe(activeElement);
    });

    it('cancels the marker before the next keyboard operation', async () => {
        const { editor } = await setupDeletion();
        fireEvent.keyDown(editor, { key: 'ArrowLeft' });
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
        select(editor.firstChild!, 1);
        act(() => vi.advanceTimersByTime(10));
        expect(getCurrentCursorPosition(editor as HTMLDivElement)).toBe(1);
    });

    it('respects a newer imperative cursor position', async () => {
        const { editor, ref } = await setupDeletion();
        act(() => ref.current!.setCursorPosition(1));
        act(() => vi.advanceTimersByTime(10));
        expect(getCurrentCursorPosition(editor as HTMLDivElement)).toBe(1);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });
});
