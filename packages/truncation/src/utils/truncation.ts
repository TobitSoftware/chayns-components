const doesOverflow = (element: HTMLElement, referenceHeight: number): boolean =>
    element.scrollHeight > referenceHeight;

function hasOnlyText(element: HTMLElement): boolean {
    // Check if element has no child elements.
    if (element.children.length === 0) {
        // If element has text (not empty), it is only text.
        return element.textContent !== '';
    }
    // Element has child elements or no text, so it's not only text.
    return false;
}

const removeLastLeafElement = (element: HTMLElement) => {
    // remove last element of html element where the last element is a leaf element and its content is a string
    const lastChild: Element | null = element.lastElementChild;
    if (lastChild && !hasOnlyText(lastChild as HTMLElement) && lastChild.hasChildNodes()) {
        removeLastLeafElement(lastChild as HTMLElement);
    } else if (lastChild) {
        element.removeChild(lastChild);
    }
};
export const truncateElement = (element: HTMLElement, referenceHeight: number) => {
    while (doesOverflow(element, referenceHeight)) {
        removeLastLeafElement(element);
    }
};
