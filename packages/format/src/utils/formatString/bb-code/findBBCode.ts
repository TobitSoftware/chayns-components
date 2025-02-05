// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const BB_REGEX = /(\[([a-zA-Z0-9_]*)(.*?)\])(.*?)(\[\/\2\])/s;
// Also matches "\" before quote to fix button for voucher messages
const PARAMETER_REGEX = /([\w]*?)=\\?["„“‚'‘](.*?)["“”‘'’]/g;

export interface BBCodeMatch {
    fullMatch: string;
    tag: string;
    parameters: Record<string, string>;
    content: string;
    index: number;
    openingTag: string;
    closingTag: string;
}

// TODO Use external package instead of RegExp to parse BBCode.
//  It is not recommended to use RegExp to parse markup languages like BBCode, because it is not possible to parse nested tags with it.

// Finds and returns the first BBCode tag in the input string.
export function findFirstBBCode(inputString: string): BBCodeMatch | null {
    const matches = BB_REGEX.exec(inputString);

    if (matches !== null) {
        const [fullMatch, openingTag, tag, params, content, closingTag] = matches;
        const { index } = matches;

        if (
            fullMatch === undefined ||
            tag === undefined ||
            params === undefined ||
            content === undefined ||
            openingTag === undefined ||
            closingTag === undefined
        )
            return null;

        const parameters: Record<string, string> = {};

        let match: RegExpExecArray | null = null;
        // eslint-disable-next-line no-cond-assign
        while ((match = PARAMETER_REGEX.exec(params))) {
            const [, key, value] = match;

            if (value) {
                parameters[key || 'url'] = value;
            }
        }

        return {
            fullMatch,
            tag,
            parameters,
            content,
            index,
            openingTag,
            closingTag,
        };
    }

    return null;
}
