let childIndex = -1;
let endOffset = -1;
let startOffset = -1;

interface SaveSelectionOptions {
    shouldIgnoreEmptyTextNodes?: boolean;
}

export const saveSelection = (
    element: HTMLDivElement,
    { shouldIgnoreEmptyTextNodes }: SaveSelectionOptions = {}
) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const { anchorNode } = selection;

    if (!anchorNode) {
        return;
    }

    const range = selection.getRangeAt(0);

    let childNodesArray = Array.from(element.childNodes);

    if (shouldIgnoreEmptyTextNodes) {
        childNodesArray = childNodesArray.filter(
            ({ nodeType, nodeValue }) => nodeType !== Node.TEXT_NODE || nodeValue !== ''
        );
    }

    childIndex = childNodesArray.indexOf(anchorNode as ChildNode);

    endOffset = range.endOffset;
    startOffset = range.startOffset;
};

export const restoreSelection = (element: HTMLDivElement) => {
    let childNode = element.childNodes[childIndex];

    const selection = window.getSelection();

    console.debug('restoreSelection', {
        childIndex,
        childNode,
        childNodes: element.childNodes,
        element,
        endOffset,
        selection,
        startOffset,
    });

    if (!childNode || !element || !selection) {
        return;
    }

    if (typeof childNode.nodeValue !== 'string') {
        const textNode = document.createTextNode('');

        childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

        childNode = textNode;

        endOffset = 0;
        startOffset = 0;
    } else if (childNode.nodeValue && endOffset > childNode.nodeValue.length) {
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

    const range = document.createRange();

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

export const setChildIndex = (index: number) => {
    childIndex = index;
};
