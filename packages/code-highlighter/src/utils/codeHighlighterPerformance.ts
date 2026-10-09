/** React StrictMode and virtualized remounts must not nest translation wrappers. */
export const wrapLineNumbers = (root: HTMLElement | null): void => {
    root?.querySelectorAll('.linenumber').forEach((element) => {
        if (element.firstElementChild?.tagName.toLowerCase() === 'tw-ignore') return;

        const wrapper = document.createElement('tw-ignore');
        while (element.firstChild) wrapper.appendChild(element.firstChild);
        element.appendChild(wrapper);
    });
};
