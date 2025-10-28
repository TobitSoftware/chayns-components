/**
 * Returns a substring of an HTML string while preserving HTML structure.
 *
 * Core rules:
 * - Element nodes are re-serialized as tags (start/end) to keep structure.
 * - Text nodes are always HTML-escaped on output. This prevents that previously
 *   escaped text (like "&lt;div&gt;") turns into real tags during the DOM round trip.
 * - Attribute values are HTML-escaped on output.
 * - Void elements are serialized without closing tags.
 * - For TWIGNORE/TW-IGNORE elements, the innerHTML is passed through so that
 *   their content (including real HTML) remains untouched.
 * - On early cutoff (once the length limit is reached), already opened tags are
 *   properly closed to keep the result valid HTML.
 *
 * Note on length counting:
 * - The length is based on the decoded textContent length (as the DOM provides),
 *   not on byte length nor escaped entity length. This mirrors how the text is perceived.
 *
 * @param html   The input HTML string; may contain a mix of real HTML and already escaped HTML.
 * @param length The maximum number of text characters (based on textContent) to include.
 * @returns A valid HTML string containing up to the specified number of text characters,
 *          preserving HTML tags and keeping escaped text escaped.
 */
export const getSubTextFromHTML = (html: string, length: number): string => {
    const div = document.createElement('div');

    div.innerHTML = html;

    let text = '';
    let currLength = 0;

    // Escape text node content to ensure that decoded "<" and ">" do not become real tags.
    const escapeText = (value: string): string =>
        value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Escape attribute values safely.
    const escapeAttr = (value: string): string =>
        String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

    // HTML void elements (must not have closing tags)
    const VOID_ELEMENTS = new Set([
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
    ]);

    // Traverses nodes and appends to "text".
    // Returns false to signal "stop traversal" once the length limit is reached.
    const traverse = (node: Node): boolean => {
        // Text node
        if (node.nodeType === 3 && typeof node.textContent === 'string') {
            const nodeText = node.textContent;
            const remaining = length - currLength;

            if (remaining <= 0) {
                return false;
            }

            if (nodeText.length <= remaining) {
                // Always escape text before writing to output
                text += escapeText(nodeText);
                currLength += nodeText.length;
            } else {
                // Cut the text and stop traversal
                text += escapeText(nodeText.substring(0, remaining));
                currLength += remaining;
                return false;
            }

            return true;
        }

        // Element node
        if (node.nodeType === 1) {
            const element = node as Element;

            // Pass-through for TWIGNORE/TW-IGNORE: keep their HTML as-is.
            if (element.nodeName === 'TWIGNORE' || element.nodeName === 'TW-IGNORE') {
                // element.innerHTML serializes children; escaped text stays escaped,
                // real HTML stays HTML — exactly what we want here.
                text += element.innerHTML;
                return true;
            }

            const nodeName = element.nodeName.toLowerCase();

            // Serialize attributes safely
            let attributes = '';
            // @ts-expect-error: attributes is a NodeListOf<Attr>
            // eslint-disable-next-line no-restricted-syntax
            for (const attribute of element.attributes) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-argument
                attributes += ` ${attribute.name}="${escapeAttr(attribute.value)}"`;
            }

            // Open tag
            text += `<${nodeName}${attributes}>`;

            // Void elements: do not recurse children and do not emit a closing tag
            const isVoid = VOID_ELEMENTS.has(nodeName);
            if (!isVoid) {
                // Recurse through children until limit is reached
                for (let i = 0; i < element.childNodes.length; i++) {
                    const childNode = element.childNodes[i];
                    if (childNode && !traverse(childNode)) {
                        // On early stop: close this tag to keep valid HTML, then bubble stop.
                        text += `</${nodeName}>`;
                        return false;
                    }
                }

                // Close tag after all children
                text += `</${nodeName}>`;
            }

            return true;
        }

        // Other node types (comments, etc.) are ignored for text length
        return true;
    };

    // Traverse top-level children
    for (let i = 0; i < div.childNodes.length; i++) {
        const childNode = div.childNodes[i];
        if (childNode && !traverse(childNode)) {
            return text;
        }
    }

    return text;
};

export const getCharactersCount = (html: string): number => {
    const div = document.createElement('div');

    div.innerHTML = html;

    let count = 0;

    const traverse = (node: Node): void => {
        if (node.nodeName === 'TWIGNORE') {
            count += 1;
        } else if (node.nodeType === 3 && typeof node.textContent === 'string') {
            count += node.textContent.trim().length;
        } else if (node.nodeType === 1) {
            if (node.nodeName === 'CODE' && node.textContent !== null) {
                count += node.textContent.length;

                return;
            }

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

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [result[i], result[j]] = [result[j]!, result[i]!];
    }

    return result;
};

interface CalculateAutoSpeedProps {
    fullTextLength: number;
    currentPosition: number;
    baseSpeedFactor: number;
}

export const calculateAutoSpeed = ({
    fullTextLength,
    currentPosition,
    baseSpeedFactor,
}: CalculateAutoSpeedProps): { speed: number; steps: number } => {
    const MIN_SPEED = 1;
    const MAX_SPEED = 10;

    const remainingLength = fullTextLength - currentPosition;

    // Calculate the speed with the remaining text length and the baseSpeedFactor
    const speed = Math.min(baseSpeedFactor / remainingLength, MAX_SPEED);

    if (speed < MIN_SPEED) {
        return { speed: 1, steps: 2 };
    }

    return { speed, steps: 1 };
};
