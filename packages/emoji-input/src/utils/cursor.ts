// https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div

import { replaceAt, replaceNbsp, replaceSpace } from './utils';

type BbTextWithSelection = {
    bb: string;
    sel: Selection;
};

export const replaceSelectionWithHTML = (
    bbText: string,
    html: string,
    selection: Selection
): BbTextWithSelection => {
    // change selection in reference
    let newBBText = replaceNbsp(bbText);

    const tempElem = document.createElement('div');
    tempElem.innerHTML = newBBText;

    const replaceIndexStart = getTextWithTagLength(tempElem, { count: selection.start });
    const replaceIndexEnd = getTextWithTagLength(tempElem, { count: selection.end });

    const replacedText = newBBText.substring(replaceIndexStart, replaceIndexEnd);

    newBBText = replaceAt(newBBText, replaceIndexStart, replaceIndexEnd - 1, html);
    newBBText = replaceSpace(newBBText);

    tempElem.innerHTML = html;
    const htmlTextLength = getNodeTextLength(tempElem);
    const newCursorPos = selection.end + htmlTextLength - replacedText.length;
    const newSelection = {
        start: newCursorPos,
        end: newCursorPos,
    };

    return {
        bb: newBBText,
        sel: newSelection,
    };
};

type RemainingLength = {
    count: number;
};

const getTextWithTagLength = (node: any, remainingLength: RemainingLength): number => {
    // change remainingLength in reference
    let length = 0;
    if (node.nodeName == '#text') {
        if (node.nodeValue.length > remainingLength.count) {
            length += remainingLength.count;
            remainingLength.count = 0;
            return length;
        }
        length += node.nodeValue.length;
        remainingLength.count -= node.nodeValue.length;
    } else if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
            length += getTextWithTagLength(node.childNodes[i], remainingLength);
            if (remainingLength.count === 0) {
                return length;
            }
        }
    } else {
        length += node.outerHTML.length;
        remainingLength.count--;
    } // any node without text content
    return length;
};

export const setCursorPosition = (selection: Selection, element: HTMLDivElement | null) => {
    if (element && selection) {
        const sel = window.getSelection();
        let range = createRange(element, element, selection);

        if (range && sel) {
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
};

const createRange = (element: any, node: any, selection: Selection, range: any | null = null) => {
    if (!range) {
        range = document.createRange();
    }

    if (node.nodeName == '#text') {
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
    } else if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i];
            range = createRange(element, childNode, selection, range);
            if (selection.start === 0 && selection.end === 0) {
                break;
            }
        }
    } else {
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
            node.scrollIntoView({ block: 'center' });
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
        let selection = window.getSelection();

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

    if (node.nodeName == '#text') textLength = node.nodeValue.length;
    else if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++)
            textLength += getNodeTextLength(node.childNodes[i]);
    } else textLength++; // any node without text content
    return textLength;
};

const getNodeOffset = (node: any): number => {
    return node == null ? -1 : 1 + getNodeOffset(node.previousSibling);
};
