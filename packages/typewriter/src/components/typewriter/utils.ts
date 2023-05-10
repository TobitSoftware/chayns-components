/**
 * This function extracts a part of the text from an HTML text. The HTML elements themselves are
 * returned in the result. In addition, the function ensures that the closing tag of the Bold HTML
 * element is also returned for text that is cut off in the middle of a Bold element, for example.
 *
 * @param html - The text from which a part should be taken
 * @param length - The length of the text to be extracted
 *
 * @return GetSubTextFromHTMLResult - The text part with the specified length, the current character and the remaining characters of the word - additionally the HTML elements are added
 */

interface GetSubTextFromHTMLResult {
    shownText: string;
    shownWordCharacters: string;
    remainingWordCharacters: string;
}

export const getSubTextFromHTML = (html: string, length: number): GetSubTextFromHTMLResult => {
    const div = document.createElement('div');

    div.innerHTML = html;

    let shownText = '';
    let shownWordCharacters = '';
    let remainingWordCharacters = '';
    let currLength = 0;

    const traverse = (element: Element): boolean => {
        if (element.nodeType === 3 && typeof element.textContent === 'string') {
            const nodeText = element.textContent;

            if (currLength + nodeText.length <= length) {
                shownText += nodeText;
                currLength += nodeText.length;
                shownWordCharacters = '';
                remainingWordCharacters = '';
            } else {
                const lastSpaceIndex = nodeText.lastIndexOf(' ', length - 1);
                const substring = nodeText.substring(length);
                const nextSpaceIndex = substring.indexOf(' ');
                const endIndex = nextSpaceIndex !== -1 ? nextSpaceIndex : nodeText.length;

                shownText += nodeText.substring(0, lastSpaceIndex + 1);
                shownWordCharacters = nodeText.substring(lastSpaceIndex + 1, length);
                remainingWordCharacters = substring.substring(0, endIndex);

                return false;
            }
        } else if (element.nodeType === 1) {
            const nodeName = element.nodeName.toLowerCase();

            let attributes = '';

            // @ts-expect-error: Type is correct here
            // eslint-disable-next-line no-restricted-syntax
            for (const attribute of element.attributes) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                attributes += ` ${attribute.name}="${attribute.value}"`;
            }

            shownText += `<${nodeName}${attributes}>`;

            console.log(element.childNodes, element.childNodes.length);

            for (let i = 0; i < element.childNodes.length; i++) {
                const childNode = element.childNodes[i];

                console.log(childNode);

                if (childNode && !traverse(childNode as Element)) {
                    return false;
                }
            }

            shownText += `</${nodeName}>`;
        }

        return true;
    };

    for (let i = 0; i < div.childNodes.length; i++) {
        const childNode = div.childNodes[i];

        if (childNode && !traverse(childNode as Element)) {
            return { shownText, shownWordCharacters, remainingWordCharacters };
        }
    }

    return { shownText, shownWordCharacters, remainingWordCharacters };
};

export const getCharactersCount = (html: string): number => {
    const div = document.createElement('div');

    div.innerHTML = html;

    let count = 0;

    const traverse = (node: Node): void => {
        if (node.nodeType === 3 && typeof node.textContent === 'string') {
            count += node.textContent.trim().length;
        } else if (node.nodeType === 1) {
            Array.from(node.childNodes).forEach(traverse);
        }
    };

    Array.from(div.childNodes).forEach(traverse);

    return count;
};

export const shuffleArray = <T>(array: T[]): T[] => {
    const result = Array.from(array);

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j]!, result[i]!];
    }

    return result;
};
