// https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div

export const insertHTMLTagAtCursor = (tag: string) => {
    const sel = window.getSelection();
    if (sel) {
        const range = sel.getRangeAt(0);
        console.log('sel: ', sel);
        const newElement = document.createElement(tag);

        const pNode = sel.focusNode?.parentNode;
        if (pNode && pNode['tagName'] === 'SPAN') {
            console.log('in HTML TAG');
            // ToDo && Cursor at End of Node
            if (pNode['className'] === 'open') {
                range.setStart(pNode?.nextSibling as Node, 0);
            } else if (pNode['className'] === 'close' || pNode['className'] === 'param') {
                range.selectNode(pNode);
                range.collapse(false);
            }
            range.insertNode(newElement);
        } else {
            console.log('outside');
            range.insertNode(newElement);
            range.setStartBefore(newElement);
            //range.deleteContents();
        }

        // range.insertNode(newElement);

        //range.setStartAfter(newElement);

        sel.removeAllRanges();
        sel.addRange(range);
    }
};
export const setCurrentCursorPosition = (selection: Selection, element: HTMLDivElement | null) => {
    if (element && selection.end) {
        console.log('set Cursor Pos: ', selection);
        const sel = window.getSelection();

        let range = createRange(element, { count: selection.start });

        if (range && sel) {
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);

            //  scroll to cursor if scrollbar ... ???
            //  element.scrollTop = element.scrollHeight;
        }
    }
};

export const setCursorToEnd = (target: HTMLDivElement | null) => {
    if (target) {
        const range = document.createRange();
        const sel = window.getSelection();
        if (sel && range) {
            range.selectNode(target);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            target.focus();
            range.detach();

            target.scrollTop = target.scrollHeight;
        }
    }
};

type charCount = {
    count: number;
};

const createRange = (node: any, char: charCount, range: any | null = null) => {
    if (!range) {
        range = document.createRange();
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (char.count === 0) {
        range.setEnd(node, char.count);
    } else if (node && char.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
        } else if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent && node.textContent.length < char.count) {
                char.count -= node.textContent.length;
            } else {
                range.setEnd(node, char.count);
                char.count = 0;
            }
        } else {
            for (let lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], char, range);

                if (char.count === 0) {
                    break;
                }
            }
        }
    }
    return range;
};

export type Selection = {
    start: number;
    end: number;
};

export const getTextSelection = function (element: HTMLDivElement | null): Selection | null {
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

const getTextLength = function (element: HTMLDivElement, node: any, offset: number): number {
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
