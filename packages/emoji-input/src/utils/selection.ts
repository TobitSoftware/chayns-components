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
    const childNode = element.childNodes[childIndex];
    const selection = window.getSelection();

    if (!childNode || !element || !selection) {
        return;
    }

    const range = document.createRange();

    if (childNode.nodeValue) {
        endOffset = Math.min(endOffset, childNode.nodeValue.length);
        startOffset = Math.min(startOffset, childNode.nodeValue.length);
    }

    range.setStart(childNode, startOffset);
    range.setEnd(childNode, endOffset);

    selection.removeAllRanges();
    selection.addRange(range);

    range.collapse(true);
};
