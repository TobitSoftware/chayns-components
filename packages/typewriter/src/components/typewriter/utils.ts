/**
 * This function extracts a part of the text from an HTML text. The HTML elements themselves are
 * returned in the result. In addition, the function ensures that the closing tag of the Bold HTML
 * element is also returned for text that is cut off in the middle of a Bold element, for example.
 *
 * @param html - The text from which a part should be taken
 * @param length - The length of the text to be extracted
 *
 * @return string - The text part with the specified length - additionally the HTML elements are added
 */
export const getSubTextFromHTML = (html: string, length: number): string => {
    const div = document.createElement('div');

    div.innerHTML = html;

    let text = '';
    let currLength = 0;

    const traverse = (node: Node): boolean => {
        if (node.nodeType === 3 && typeof node.textContent === 'string') {
            const nodeText = node.textContent;

            if (currLength + nodeText.length <= length) {
                text += nodeText;
                currLength += nodeText.length;
            } else {
                text += nodeText.substring(0, length - currLength);

                return false;
            }
        } else if (node.nodeType === 1) {
            const nodeName = node.nodeName.toLowerCase();

            text += `<${nodeName}>`;

            for (let i = 0; i < node.childNodes.length; i++) {
                const childNode = node.childNodes[i];

                if (childNode && !traverse(childNode)) {
                    return false;
                }
            }

            text += `</${nodeName}>`;
        }

        return true;
    };

    for (let i = 0; i < div.childNodes.length; i++) {
        const childNode = div.childNodes[i];

        if (childNode && !traverse(childNode)) {
            return text;
        }
    }

    return text;
};
