const getCaretClientRect = (): DOMRect | null => {
    const sel = window.getSelection();

    if (!sel || sel.rangeCount === 0) return null;

    // Clone the current range so we don't mess with the actual selection
    const range = sel.getRangeAt(0).cloneRange();

    if (!range.collapsed) range.collapse(false);

    // Try getting the rect directly
    let rect = range.getBoundingClientRect();

    const isEmptyRect = rect && rect.top === 0 && rect.bottom === 0;

    if (!rect || isEmptyRect) {
        // Fallback: insert a temporary invisible element to measure the caret position
        const span = document.createElement('span');

        span.appendChild(document.createTextNode('\u200B')); // zero-width space

        range.insertNode(span);

        // Move selection right after the temporary span
        const newRange = document.createRange();

        newRange.setStartAfter(span);
        newRange.collapse(true);

        sel.removeAllRanges();
        sel.addRange(newRange);

        // Measure the span's position
        rect = span.getBoundingClientRect();

        // Remove the temporary span
        if (span.parentNode) {
            span.parentNode.removeChild(span);
        }
    }

    return rect;
};

export const scrollCursorIntoView = (container: HTMLElement, padding = 8): void => {
    const rect = getCaretClientRect();

    // Fallback: scroll to bottom if caret position can't be determined
    if (!rect) {
        // eslint-disable-next-line no-param-reassign
        container.scrollTop = container.scrollHeight;

        return;
    }

    const containerRect = container.getBoundingClientRect();

    // Scroll down if caret is below the visible area
    if (rect.bottom > containerRect.bottom - padding) {
        // eslint-disable-next-line no-param-reassign
        container.scrollTop += rect.bottom - containerRect.bottom + padding;
    }
    // Scroll up if caret is above the visible area
    else if (rect.top < containerRect.top + padding) {
        // eslint-disable-next-line no-param-reassign
        container.scrollTop -= containerRect.top + padding - rect.top;
    }
};
