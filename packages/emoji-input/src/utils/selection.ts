let childIndex = -1;
let endOffset = -1;
let startOffset = -1;

export const saveSelection = (element: HTMLDivElement) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const node = selection.anchorNode;

    if (!node) {
        return;
    }

    const range = selection.getRangeAt(0);

    childIndex = Array.from(element.childNodes).indexOf(node as ChildNode);

    endOffset = range.endOffset;
    startOffset = range.startOffset;
};

export const restoreSelection = (element: HTMLDivElement) => {
    let childNode = element.childNodes[childIndex];

    const selection = window.getSelection();

    if (!childNode || !element || !selection) {
        return;
    }

    const range = document.createRange();

    if (childNode.nodeValue && endOffset > childNode.nodeValue.length) {
        if (childNode.nextSibling) {
            childNode = childNode.nextSibling;

            if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
                endOffset = childNode.nodeValue.length;
                startOffset = childNode.nodeValue.length;
            } else {
                const textNode = document.createTextNode('');

                childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

                childNode = textNode;

                endOffset = 0;
                startOffset = 0;
            }
        } else {
            endOffset = childNode.nodeValue.length;
            startOffset = childNode.nodeValue.length;
        }
    }

    range.setStart(childNode, startOffset);
    range.setEnd(childNode, endOffset);

    selection.removeAllRanges();
    selection.addRange(range);

    range.collapse(true);
};

export const moveSelectionOffset = (distance: number) => {
    endOffset += distance;
    startOffset += distance;
};
