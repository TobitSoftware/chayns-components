interface InsertTextAtCursorPositionOptions {
    editorElement: HTMLDivElement;
    text: string;
}

/**
 * This function inserts the passed text at the correct position in the editor element. If the
 * element has the focus, the new emoji is inserted at the cursor position. If not, the emoji
 * will be appended to the back of the input field content.
 *
 * In addition, this function also sets the cursor to the correct position when the input field
 * has the focus. For this purpose, the current position of the cursor or a selection is read to
 * calculate the cursor position after inserting the text.
 *
 * @param {Object} options - Object with element and text to insert
 * @param {HTMLDivElement} options.editorElement - Element to insert text into
 * @param {string} options.text - Text to insert into element
 */
export const insertTextAtCursorPosition = ({
    editorElement,
    text,
}: InsertTextAtCursorPositionOptions) => {
    const selection = window.getSelection();

    if (selection?.anchorNode && editorElement.contains(selection.anchorNode)) {
        const { endOffset, startOffset } = selection.getRangeAt(0);

        const rangeDistance = endOffset - startOffset;

        let offset = endOffset + text.length - rangeDistance;

        let { anchorNode } = selection;

        if (anchorNode.nodeValue) {
            anchorNode.nodeValue =
                anchorNode.nodeValue.substring(0, startOffset) +
                text +
                anchorNode.nodeValue.substring(endOffset);
        } else if (anchorNode === editorElement) {
            const newTextNode = document.createTextNode(text);

            editorElement.appendChild(newTextNode);

            anchorNode = newTextNode;
        }

        const newRange = document.createRange();

        if (anchorNode.nodeValue) {
            offset = Math.min(offset, anchorNode.nodeValue.length);
        }

        newRange.setStart(anchorNode, offset);
        newRange.setEnd(anchorNode, offset);

        selection.removeAllRanges();
        selection.addRange(newRange);
    } else {
        // eslint-disable-next-line no-param-reassign
        editorElement.innerText += text;
    }
};
