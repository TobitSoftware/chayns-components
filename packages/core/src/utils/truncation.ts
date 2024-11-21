const doesElementOverflow = (element: HTMLElement, referenceHeight: number): boolean =>
    element.scrollHeight > referenceHeight;

const doesElementHasOnlyText = (element: HTMLElement): boolean => {
    // Check if element has no child elements.
    if (element.children.length === 0) {
        // If element has text (not empty), it is only text.
        return element.textContent !== '';
    }

    // Element has child elements or no text, so it's not only text.
    return false;
};

const removeLastLeafElement = (element: HTMLElement) => {
    // remove last element of html element where the last element is a leaf element and its content is a string
    const { lastElementChild, lastChild } = element;

    if (
        lastElementChild &&
        !doesElementHasOnlyText(lastElementChild as HTMLElement) &&
        lastElementChild.hasChildNodes()
    ) {
        removeLastLeafElement(lastElementChild as HTMLElement);
    } else if (
        lastChild &&
        lastChild.nodeType === Node.TEXT_NODE &&
        lastChild.textContent &&
        lastChild.textContent.length > 25
    ) {
        lastChild.textContent = `${lastChild.textContent.substring(0, lastChild.textContent.length - 25)} ...`;
    } else if (
        lastElementChild &&
        doesElementHasOnlyText(lastElementChild as HTMLElement) &&
        lastElementChild.textContent &&
        lastElementChild.textContent.length > 25
    ) {
        lastElementChild.textContent = `${lastElementChild.textContent.substring(
            0,
            lastElementChild.textContent.length - 25,
        )} ...`;
    } else if (lastChild) {
        element.removeChild(lastChild);
    } else if (lastElementChild) {
        element.removeChild(lastElementChild);
    }
};
export const truncateElement = (element: HTMLElement, referenceHeight: number) => {
    while (doesElementOverflow(element, referenceHeight)) {
        removeLastLeafElement(element);
    }
};
