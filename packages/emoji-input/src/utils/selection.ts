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
    { shouldIgnoreEmptyTextNodes }: SaveSelectionOptions = {},
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
                nodeType !== Node.TEXT_NODE || (nodeValue !== '' && nodeValue !== '\u200B'),
        );
    }

    childIndex = childNodesArray.indexOf(anchorNode as ChildNode);

    endOffset = range.endOffset;
    startOffset = range.startOffset;
};

export const restoreSelection = (element: HTMLDivElement) => {
    // Search for \u200C in child nodes. If found, set the childIndex, startOffset, and endOffset to the
    // position of the \u200C character. Also remove the \u200C character from the child node. If not found,
    // the childIndex, startOffset, and endOffset will be like before.
    const childNodesArray = Array.from(element.childNodes);

    let hasFoundNoJoiner = false;

    childNodesArray.forEach((node) => {
        if (
            !hasFoundNoJoiner &&
            node.nodeType === Node.TEXT_NODE &&
            typeof node.nodeValue === 'string'
        ) {
            const noJoinerIndex = node.nodeValue.indexOf('\u200C');

            if (noJoinerIndex !== -1) {
                hasFoundNoJoiner = true;

                childIndex = childNodesArray.indexOf(node);
                startOffset = noJoinerIndex;
                endOffset = noJoinerIndex;
            }
        }
    });

    // Remove all no joiner characters from the child nodes if no joiner was found
    if (hasFoundNoJoiner) {
        childNodesArray.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && typeof node.nodeValue === 'string') {
                // eslint-disable-next-line no-param-reassign
                node.nodeValue = node.nodeValue.replace(/\u200C/g, '');
            }
        });
    }

    let childNode = element.childNodes[childIndex];

    const selection = window.getSelection();

    if (!childNode || !element || !selection) {
        return;
    }

    // noinspection SuspiciousTypeOfGuard
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
        if (childNode.nextSibling?.nodeValue) {
            let elementTextLength = childNode.nodeValue.length;

            childNode = childNode.nextSibling;

            // noinspection SuspiciousTypeOfGuard
            if (typeof childNode.nodeValue !== 'string') {
                elementTextLength += getElementTextLength(childNode as Element);

                if (childNode.nextSibling?.nodeValue) {
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

    // noinspection SuspiciousTypeOfGuard
    if (typeof childNode.nodeValue === 'string') {
        startOffset = clamp(startOffset, 0, childNode.nodeValue.length);
        endOffset = clamp(endOffset, 0, childNode.nodeValue.length);
    }

    try {
        range.setStart(childNode, startOffset);
        range.setEnd(childNode, endOffset);
    } catch (error) {
        // Do nothing
    }

    selection.removeAllRanges();
    selection.addRange(range);

    range.collapse(true);
};

export const insertInvisibleCursorMarker = (): void => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
        return;
    }

    const range = selection.getRangeAt(0);
    const textNode = range.startContainer;
    const offset = range.startOffset;

    // noinspection JSDeprecatedSymbols
    document.execCommand('delete', false);

    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.width = '0';
    span.style.height = '0';
    span.className = 'invisible-cursor-marker';

    const parent = textNode.parentNode;

    if (parent) {
        if (textNode.nodeType === Node.TEXT_NODE) {
            const textContent = textNode.textContent || '';
            const beforeText = textContent.slice(0, offset);
            const afterText = textContent.slice(offset);

            textNode.textContent = beforeText;

            parent.insertBefore(span, textNode.nextSibling);
            const afterTextNode = document.createTextNode(afterText);
            parent.insertBefore(afterTextNode, span.nextSibling);

            setTimeout(() => {
                // Set cursor to cursor element
                const newRange = document.createRange();
                newRange.setStartAfter(span);
                newRange.setEndAfter(span);
                selection.removeAllRanges();
                selection.addRange(newRange);

                // Remove cursor element
                span.remove();
            }, 10);
        }
    }
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
        (event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Unidentified')
    ) {
        return null;
    }

    if (event.key === 'Backspace' || event.key === 'Unidentified') {
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

interface FindAndSelectTextOptions {
    editorElement: HTMLDivElement;
    searchText: string;
}

export const findAndSelectText = ({
    editorElement,
    searchText,
}: FindAndSelectTextOptions): Range | null => {
    if (!editorElement.textContent?.includes(searchText)) {
        return null;
    }

    const range = document.createRange();

    let startNode: Node | null = null;
    let offset = -1;

    const searchNodesForText = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const index = node.textContent?.indexOf(searchText);

            if (typeof index === 'number' && index !== -1) {
                startNode = node;
                offset = index;

                range.setStart(node, index);
                range.setEnd(node, index + searchText.length);

                return true;
            }
        } else if (node.nodeName !== 'LC_MENTION') {
            return Array.from(node.childNodes).some(searchNodesForText);
        }

        return false;
    };

    searchNodesForText(editorElement);

    if (startNode && offset !== -1) return range;

    return null;
};
