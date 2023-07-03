import type { KeyboardEvent } from 'react';
import { clamp } from './number';
import { getElementTextLength } from './text';

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
            ({ nodeType, nodeValue }) =>
                nodeType !== Node.TEXT_NODE || (nodeValue !== '' && nodeValue !== '\u200B')
        );
    }

    childIndex = childNodesArray.indexOf(anchorNode as ChildNode);

    endOffset = range.endOffset;
    startOffset = range.startOffset;
};

export const restoreSelection = (element: HTMLDivElement) => {
    let childNode = element.childNodes[childIndex];

    const selection = window.getSelection();

    if (!childNode || !element || !selection) {
        return;
    }

    if (typeof childNode.nodeValue !== 'string') {
        const elementTextLength = getElementTextLength(childNode as Element);

        if (childNode.nextSibling) {
            childNode = childNode.nextSibling;

            if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
                endOffset -= elementTextLength;
                startOffset -= elementTextLength;

                if (childNode.nodeValue.charCodeAt(endOffset) === 8203) {
                    endOffset += 1;
                    startOffset += 1;
                }
            } else {
                const textNode = document.createTextNode('\u200B');

                childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

                childNode = textNode;

                endOffset = textNode.length;
                startOffset = textNode.length;
            }
        } else {
            const textNode = document.createTextNode('\u200B');

            childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

            childNode = textNode;

            endOffset = textNode.length;
            startOffset = textNode.length;
        }
    } else if (childNode.nodeValue && endOffset > childNode.nodeValue.length) {
        if (childNode.nextSibling) {
            let elementTextLength = childNode.nodeValue.length;

            childNode = childNode.nextSibling;

            if (typeof childNode.nodeValue !== 'string') {
                elementTextLength += getElementTextLength(childNode as Element);

                if (childNode.nextSibling) {
                    childNode = childNode.nextSibling;

                    if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue) {
                        endOffset -= elementTextLength;
                        startOffset -= elementTextLength;

                        if (childNode.nodeValue.charCodeAt(endOffset) === 8203) {
                            endOffset += 1;
                            startOffset += 1;
                        }
                    } else {
                        const textNode = document.createTextNode('\u200B');

                        childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

                        childNode = textNode;

                        endOffset = textNode.length;
                        startOffset = textNode.length;
                    }
                } else {
                    const textNode = document.createTextNode('\u200B');

                    childNode.parentNode?.insertBefore(textNode, childNode.nextSibling);

                    childNode = textNode;

                    endOffset = textNode.length;
                    startOffset = textNode.length;
                }
            }
        } else {
            endOffset = childNode.nodeValue.length;
            startOffset = childNode.nodeValue.length;
        }
    }

    const range = document.createRange();

    if (childNode.nodeValue) {
        startOffset = clamp(startOffset, 0, childNode.nodeValue.length);
        endOffset = clamp(endOffset, 0, childNode.nodeValue.length);
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

export const setChildIndex = (index: number) => {
    childIndex = index;
};

/**
 * This function returns the code of the character that will be removed by the KeyDown event in the
 * next step, if the "Backspace" or "Delete" key was pressed and there is no selection of multiple
 * characters.
 *
 * @param event - Keyboard event from "onKeyDown"
 */
export const getCharCodeThatWillBeDeleted = (event: KeyboardEvent<HTMLDivElement>) => {
    const range = window.getSelection()?.getRangeAt(0);

    /**
     * At this point the function is aborted if there is no selection range, several characters have
     * been selected and therefore no single letter is removed or neither the "Backspace" nor the
     * "Delete" key has been pressed.
     */
    if (
        !range ||
        range.endOffset !== range.startOffset ||
        (event.key !== 'Backspace' && event.key !== 'Delete')
    ) {
        return null;
    }

    if (event.key === 'Backspace') {
        const { nodeValue, previousSibling } = range.startContainer;

        if (range.startOffset > 0) {
            return nodeValue?.charCodeAt(range.startOffset - 1);
        }

        return previousSibling?.nodeValue?.charCodeAt(previousSibling.nodeValue.length - 1);
    }

    const { nextSibling, nodeValue } = range.endContainer;

    if (range.endOffset < (nodeValue?.length ?? 0)) {
        return nodeValue?.charCodeAt(range.endOffset);
    }

    return nextSibling?.nodeValue?.charCodeAt(0);
};
