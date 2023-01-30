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
