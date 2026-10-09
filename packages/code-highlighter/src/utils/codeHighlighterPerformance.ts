const MAX_HIGHLIGHTED_CODE_LENGTH = 20_000;
const MAX_HIGHLIGHTED_LINE_COUNT = 500;
const MAX_HIGHLIGHTED_LINE_LENGTH = 2_000;

/** Bound synchronous grammar matching and the number of rendered token elements. */
export const shouldHighlightCode = (code: string): boolean => {
    if (code.length > MAX_HIGHLIGHTED_CODE_LENGTH) return false;

    const lines = code.split('\n');
    return (
        lines.length <= MAX_HIGHLIGHTED_LINE_COUNT &&
        lines.every((line) => line.length <= MAX_HIGHLIGHTED_LINE_LENGTH)
    );
};

/** React StrictMode and virtualized remounts must not nest translation wrappers. */
export const wrapLineNumbers = (root: HTMLElement | null): void => {
    root?.querySelectorAll('.linenumber').forEach((element) => {
        if (element.firstElementChild?.tagName.toLowerCase() === 'tw-ignore') return;

        const wrapper = document.createElement('tw-ignore');
        while (element.firstChild) wrapper.appendChild(element.firstChild);
        element.appendChild(wrapper);
    });
};
