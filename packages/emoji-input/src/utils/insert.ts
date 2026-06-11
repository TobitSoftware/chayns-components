import {
    findAndSelectText,
    moveSelectionOffset,
    restoreSelection,
    saveSelection,
    setChildIndex,
    type ReplaceTextOptions as IReplaceTextOptions,
} from './selection';

interface InsertTextAtCursorPositionOptions {
    editorElement: HTMLDivElement;
    text: string;
    shouldUseSavedSelection?: boolean;
}

/**
 * This function inserts the passed text at the correct position in the editor element. If the
 * element has the focus, the new emoji is inserted at the cursor position. If not, the emoji
 * will be appended to the back of the input field content.
 *
 * In addition, this function also sets the cursor to the correct position when the input field
 * has the focus. For this purpose, the current position of the cursor or a selection is read to
 * calculate the cursor position after inserting the text.
 *
 * @param {Object} options - Object with element and text to insert
 * @param {HTMLDivElement} options.editorElement - Element to insert text into
 * @param {string} options.text - Text to insert into element
 */
export const insertTextAtCursorPosition = ({
    editorElement,
    text,
    shouldUseSavedSelection = false,
}: InsertTextAtCursorPositionOptions) => {
    if (shouldUseSavedSelection) {
        restoreSelection(editorElement);
    }

    const selection = window.getSelection();

    saveSelection(editorElement);

    if (selection?.anchorNode && editorElement.contains(selection.anchorNode)) {
        let range = selection.getRangeAt(0);

        const parts = text.split(/\r\n|\r|\n/);

        const firstPart = parts.shift();

        const textNodes = parts.map((part) => document.createTextNode(part));

        range.deleteContents();

        if (firstPart) {
            if (selection.anchorNode.nodeType === Node.TEXT_NODE) {
                const { nodeValue } = selection.anchorNode;

                if (typeof nodeValue === 'string') {
                    selection.anchorNode.nodeValue =
                        nodeValue.slice(0, range.startOffset) +
                        firstPart +
                        nodeValue.slice(range.startOffset);

                    moveSelectionOffset(firstPart.length);
                }
            } else if (selection.anchorNode === editorElement) {
                const textNode = document.createTextNode(firstPart);

                // Inserts the text node before the node at the anchor offset.
                // If that node doesn't exist, the text node is appended to the editor, as a fallback. I'm not sure if there is any case where this would happen.
                const insertBefore = editorElement.childNodes[selection.anchorOffset];
                if (insertBefore) {
                    insertBefore.before(textNode);
                } else {
                    editorElement.appendChild(textNode);
                }

                const textNodeIndex = Array.from(editorElement.childNodes).indexOf(textNode);

                moveSelectionOffset(firstPart.length);
                setChildIndex(textNodeIndex);
            }
        }

        restoreSelection(editorElement);

        if (textNodes.length > 0) {
            range = selection.getRangeAt(0);

            let brElement = document.createElement('br');

            range.insertNode(brElement);
            range.setEndAfter(brElement);
            range.setStartAfter(brElement);

            textNodes.forEach((textNode, index) => {
                range.insertNode(textNode);
                range.setEndAfter(textNode);
                range.setStartAfter(textNode);

                if (index !== textNodes.length - 1) {
                    brElement = document.createElement('br');

                    range.insertNode(brElement);
                    range.setEndAfter(brElement);
                    range.setStartAfter(brElement);
                }
            });

            range.collapse(false);

            selection.removeAllRanges();
            selection.addRange(range);
        }
    } else {
        // eslint-disable-next-line no-param-reassign
        editorElement.innerText += text;
    }
};

export interface ReplaceTextOptions {
    editorElement: HTMLDivElement;
    searchText: string;
    pasteText: string;
    options?: IReplaceTextOptions;
}

export const replaceText = ({
    editorElement,
    searchText,
    pasteText,
    options,
}: ReplaceTextOptions) => {
    const selection = window.getSelection();

    const rangeToReplace = findAndSelectText({ editorElement, searchText, options });

    if (rangeToReplace && selection) {
        selection.removeAllRanges();
        selection.addRange(rangeToReplace);

        insertTextAtCursorPosition({ editorElement, text: pasteText });
    }
};

interface RevertAsciiSmileyConversionOptions {
    editorElement: HTMLDivElement;
    /** The original ASCII smiley to restore (e.g. ":-)"). */
    original: string;
    /** The Unicode emoji that is currently in the DOM and should be replaced. */
    emoji: string;
    /**     * Whether to also remove the single character immediately following the     * emoji (typically the trigger whitespace / punctuation that caused the     * conversion). Defaults to `true` to mirror common autocorrect UX     * (Word, IntelliJ, ...).     */
    shouldRemoveTriggerChar?: boolean;
}

/** * Reverts the most recent ASCII-smiley-to-emoji conversion at the cursor * position. * * The emoji (and optionally the trigger character following it) is removed * and replaced by a `<span class="no-emoji-convert">{original}</span>` block. * The cursor is moved to the end of the inserted span. The span is then * protected against re-conversion by the existing `regAscii` rule that skips * the contents of any `<span>` element. * * @returns `true` if a revert was performed, `false` otherwise. */
export const revertAsciiSmileyConversion = ({
    editorElement,
    original,
    emoji,
    shouldRemoveTriggerChar = true,
}: RevertAsciiSmileyConversionOptions): boolean => {
    // Walk all text nodes and find the LAST one that contains the emoji.
    // The just-converted emoji is the most recent occurrence; using the last
    // match is correct because the conversion always inserts the emoji at
    // the (former) cursor position and the cursor is at the end of that
    // insertion when Backspace is pressed.
    const walker = document.createTreeWalker(editorElement, NodeFilter.SHOW_TEXT);

    let targetNode: Text | null = null;
    let targetIndex = -1;

    let current = walker.nextNode() as Text | null;
    while (current) {
        const idx = current.nodeValue?.lastIndexOf(emoji) ?? -1;
        if (idx !== -1) {
            targetNode = current;
            targetIndex = idx;
        }
        current = walker.nextNode() as Text | null;
    }

    if (!targetNode || targetIndex === -1) {
        return false;
    }

    const nodeValue = targetNode.nodeValue ?? '';
    const before = nodeValue.slice(0, targetIndex);
    const afterEmoji = nodeValue.slice(targetIndex + emoji.length);

    // Drop the single trigger char (space, ".", ",", "!", "?", ...) that
    // immediately follows the emoji. If the trigger sits in a different
    // text node or has already been removed, we silently keep the rest.
    const after =
        shouldRemoveTriggerChar && afterEmoji.length > 0 ? afterEmoji.slice(1) : afterEmoji;

    const parent = targetNode.parentNode;
    if (!parent) {
        return false;
    }

    // Build the protective span
    const span = document.createElement('span');
    span.className = 'no-emoji-convert';
    span.textContent = original;

    // Rewrite the original text node + insert span (+ remaining text node)
    targetNode.nodeValue = before;
    parent.insertBefore(span, targetNode.nextSibling);

    // ALWAYS ensure a real text node exists directly after the span and place
    // the cursor INSIDE it. Without this, contentEditable extends the span
    // when the user keeps typing — which would protect every subsequent
    // character from emoji conversion.
    let cursorNode: Text;
    let cursorOffset: number;

    if (after) {
        cursorNode = document.createTextNode(after);
        parent.insertBefore(cursorNode, span.nextSibling);
        cursorOffset = 0;
    } else {
        // Insert a zero-width space that is stripped by convertHTMLToText
        // (line 73 in text.ts), so it stays invisible to consumers.
        cursorNode = document.createTextNode('\u200B');
        parent.insertBefore(cursorNode, span.nextSibling);
        cursorOffset = cursorNode.length;
    }

    // If the leading text node is now empty, remove it to keep the DOM tidy
    if (before === '') {
        parent.removeChild(targetNode);
    }

    // Move cursor into the text node that sits OUTSIDE the protection span
    const selection = window.getSelection();
    if (selection) {
        const range = document.createRange();
        range.setStart(cursorNode, cursorOffset);
        range.setEnd(cursorNode, cursorOffset);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    return true;
};
