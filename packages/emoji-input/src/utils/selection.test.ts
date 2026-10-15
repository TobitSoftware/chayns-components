import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    getCurrentCursorPosition,
    insertInvisibleCursorMarker,
    setCursorPositionByAbsIndex,
} from './selection';

const select = (node: Node, offset: number) => {
    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
};

const createEditor = () => {
    const editor = document.createElement('div');
    editor.setAttribute('contenteditable', 'true');
    editor.textContent = 'abcd';
    document.body.append(editor);
    editor.focus();
    select(editor.firstChild!, 2);
    return editor;
};

beforeEach(() => {
    vi.useFakeTimers();
    // These single-line fixtures do not need layout-dependent innerText semantics.
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
        configurable: true,
        get() {
            return this.textContent ?? '';
        },
        set(value: string) {
            this.textContent = value;
        },
    });
    // jsdom has Selection/Range but does not implement browser editing commands.
    Object.defineProperty(document, 'execCommand', { configurable: true, value: vi.fn() });
});

afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    // @ts-expect-error - jsdom does not define innerText.
    delete HTMLElement.prototype.innerText;
    document.body.replaceChildren();
    window.getSelection()!.removeAllRanges();
});

describe('insertInvisibleCursorMarker', () => {
    it('does not restore a cursor after the editor content was removed', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        editor.replaceChildren();
        expect(() => vi.advanceTimersByTime(10)).not.toThrow();
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('does not restore a cursor after the editor was detached', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        editor.remove();
        const focus = document.activeElement;
        expect(() => vi.advanceTimersByTime(10)).not.toThrow();
        expect(document.activeElement).toBe(focus);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('does not use a marker moved into another editor', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        const marker = editor.querySelector('.invisible-cursor-marker')!;
        const other = document.createElement('div');
        other.setAttribute('contenteditable', 'true');
        document.body.append(other);
        other.append(marker);
        const anchorNode = window.getSelection()!.anchorNode;
        vi.advanceTimersByTime(10);
        expect(window.getSelection()!.anchorNode).toBe(anchorNode);
        expect(marker.isConnected).toBe(false);
    });

    it('preserves focus and the caret of another input', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        const input = document.createElement('input');
        input.value = 'other';
        document.body.append(input);
        input.focus();
        input.setSelectionRange(1, 3);
        vi.advanceTimersByTime(10);
        expect(document.activeElement).toBe(input);
        expect([input.selectionStart, input.selectionEnd]).toEqual([1, 3]);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('preserves a selection moved into another contenteditable', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        const other = createEditor();
        select(other.firstChild!, 1);
        vi.advanceTimersByTime(10);
        expect(document.activeElement).toBe(other);
        expect(getCurrentCursorPosition(other)).toBe(1);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('preserves a newer cursor operation in the same editor', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        setCursorPositionByAbsIndex({ editorElement: editor, position: 1 });
        vi.advanceTimersByTime(10);
        expect(getCurrentCursorPosition(editor)).toBe(1);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('respects a replaced selection even at the same interim coordinates', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        const selection = window.getSelection()!;
        select(selection.anchorNode!, selection.anchorOffset);
        const expectedRange = selection.getRangeAt(0);
        vi.advanceTimersByTime(10);
        expect(selection.getRangeAt(0)).toBe(expectedRange);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('supersedes an older marker operation', () => {
        const editor = createEditor();
        insertInvisibleCursorMarker(editor);
        vi.advanceTimersByTime(5);
        select(editor.lastChild!, 1);
        insertInvisibleCursorMarker(editor);
        expect(editor.querySelectorAll('.invisible-cursor-marker')).toHaveLength(1);
        vi.advanceTimersByTime(5);
        expect(editor.querySelectorAll('.invisible-cursor-marker')).toHaveLength(1);
        vi.advanceTimersByTime(5);
        expect(getCurrentCursorPosition(editor)).toBe(3);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });

    it('cleans up immediately when cancelled', () => {
        const editor = createEditor();
        const cancel = insertInvisibleCursorMarker(editor);
        const timerCount = vi.getTimerCount();
        cancel?.();
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
        expect(vi.getTimerCount()).toBe(timerCount - 1);
    });

    it('restores the cursor after backward deletion and removes the marker', () => {
        const editor = createEditor();
        vi.mocked(document.execCommand).mockImplementation(() => {
            const range = window.getSelection()!.getRangeAt(0);
            range.setStart(range.startContainer, range.startOffset - 1);
            range.deleteContents();
            return true;
        });
        insertInvisibleCursorMarker(editor);
        vi.advanceTimersByTime(10);
        expect(document.execCommand).toHaveBeenCalledWith('delete', false);
        expect(editor.textContent).toBe('acd');
        expect(getCurrentCursorPosition(editor)).toBe(1);
        expect(document.activeElement).toBe(editor);
        expect(editor.querySelector('.invisible-cursor-marker')).toBeNull();
    });
});
