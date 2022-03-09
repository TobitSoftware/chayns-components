// https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div

export const insertHTMLTagAtCursor = (tag: string) => {
    const sel = window.getSelection();
    if (sel) {
        const range = sel.getRangeAt(0);
        console.log('sel,range: ', sel);
        const newElement = document.createElement(tag);

        const node = sel.focusNode;
        const pNode = node?.parentNode;
        if (range.startContainer === range.endContainer && range.startOffset === range.endOffset) {
            if (pNode && pNode['tagName'] === 'SPAN') {
                const currentElemLength = getNodeTextLength(pNode);
                const cursorSelection = getCursorPosition(pNode as HTMLDivElement);

                if (cursorSelection?.end === currentElemLength) {
                    if (pNode['className'] === 'open') {
                        range.setStart(pNode?.nextSibling as Node, 0); // after z.B <strong>
                    } else if (pNode['className'] === 'close' || pNode['className'] === 'param') {
                        range.selectNode(pNode);
                        range.collapse(false);
                    }
                }
                range.insertNode(newElement);
            } else {
                range.insertNode(newElement);
                range.setStartBefore(newElement);
            }
        } else {
            // ToDo, marked => delete marked => replace with br
        }

        sel.removeAllRanges();
        sel.addRange(range);
    }
};
export const setCursorPosition = (selection: Selection, element: HTMLDivElement | null) => {
    if (element && selection) {
        const sel = window.getSelection();

        let range = createRange(element, selection);

        if (range && sel) {
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);

            //  scroll to cursor if scrollbar ... ???
            //  element.scrollTop = element.scrollHeight;
        }
    }
};

const createRange = (node: any, selection: Selection, range: any | null = null) => {
    if (!range) {
        range = document.createRange();
    }

    if (node.nodeName == 'BR') {
        if (selection.start > 0) {
            selection.start--;
        } else {
            range.setStartBefore(node);
            selection.start = 0;
        }
        if (selection.end > 1) {
            selection.end--;
        } else {
            range.setEndAfter(node);
            selection.end = 0;
        }
    } else if (node.nodeName == '#text') {
        if (selection.start > node.nodeValue.length) {
            selection.start -= node.nodeValue.length;
        } else {
            range.setStart(node, selection.start);
            selection.start = 0;
        }
        if (selection.end > node.nodeValue.length) {
            selection.end -= node.nodeValue.length;
        } else {
            range.setEnd(node, selection.end);
            selection.end = 0;
        }
    } else if (node.childNodes != null) {
        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i];
            range = createRange(childNode, selection, range);
            if (selection.start === 0 && selection.end === 0) {
                break;
            }
        }
    }
    return range;
};

export const setCursorToEnd = (node: HTMLDivElement | null) => {
    if (node?.childNodes?.length) {
        const range = document.createRange();
        const sel = window.getSelection();
        if (sel && range) {
            const lastNode = node.childNodes[node.childNodes.length - 1] as Node;
            range.selectNode(lastNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);

            node.focus();
            node.scrollTop = node.scrollHeight;
        }
    }
};

export type Selection = {
    start: number;
    end: number;
};

export const getCursorPosition = (element: HTMLDivElement | null): Selection | null => {
    if (element) {
        const selection = window.getSelection();

        if (selection != null && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            return {
                start: getTextLength(element, range.startContainer, range.startOffset),
                end: getTextLength(element, range.endContainer, range.endOffset),
            };
        }
    }
    return null;
};

const getTextLength = (element: HTMLDivElement, node: any, offset: number): number => {
    let textLength = 0;

    if (node.nodeName == '#text') {
        textLength += offset;
    } else
        for (let i = 0; i < offset; i++) {
            textLength += getNodeTextLength(node.childNodes[i]);
        }

    if (node != element) textLength += getTextLength(element, node.parentNode, getNodeOffset(node));
    return textLength;
};

const getNodeTextLength = (node: any): number => {
    let textLength = 0;

    if (node.nodeName == 'BR') textLength = 1;
    else if (node.nodeName == '#text') textLength = node.nodeValue.length;
    else if (node.childNodes != null)
        for (let i = 0; i < node.childNodes.length; i++)
            textLength += getNodeTextLength(node.childNodes[i]);
    return textLength;
};

const getNodeOffset = (node: any): number => {
    return node == null ? -1 : 1 + getNodeOffset(node.previousSibling);
};
