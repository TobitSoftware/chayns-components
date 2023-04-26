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

    console.debug('saveSelection 0', { childNodes: Array.from(element.childNodes), node });

    childIndex = Array.from(element.childNodes).indexOf(node as ChildNode);

    endOffset = range.endOffset;
    startOffset = range.startOffset;

    console.log('saveSelection 1', { childIndex, endOffset, startOffset });
};

export const restoreSelection = (element: HTMLDivElement) => {
    const childNode = element.childNodes[childIndex];
    const selection = window.getSelection();

    console.log('restoreSelection 0', { childNode, childNodes: element.childNodes, childIndex });

    if (!childNode || !element || !selection) {
        return;
    }

    const range = document.createRange();

    console.log('restoreSelection 1', { childIndex, endOffset, startOffset });

    if (childNode.nodeValue) {
        endOffset = Math.min(endOffset, childNode.nodeValue.length);
        startOffset = Math.min(startOffset, childNode.nodeValue.length);
    }

    console.log('restoreSelection 2', { childIndex, endOffset, startOffset });

    range.setStart(childNode, startOffset);
    range.setEnd(childNode, endOffset);

    selection.removeAllRanges();
    selection.addRange(range);

    range.collapse(true);
};
