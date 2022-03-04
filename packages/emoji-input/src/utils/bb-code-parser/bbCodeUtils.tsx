export const defaultHtmlBbCodeParams = ['style'];
export const defaultHtmlBbCodeButtonParams = [
    'url',
    'urlParameters',
    'tappId',
    'siteId',
    'locationId',
    'buttonName',
    'post',
    'sendAccessToken',
];

export const BbCodes = [
    {
        bb: 'b',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'i',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'u',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'd',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'center',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'h1',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'h2',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'h3',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'ul',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'ol',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'li',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'p',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'span',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'button',
        params: ['inline', ...defaultHtmlBbCodeButtonParams],
    },
    {
        bb: 'link',
        tag: 'a',
        params: defaultHtmlBbCodeParams,
    },
];

export type Param = {
    together: string;
    param: string;
    value: string;
};

export type CombinedItem = {
    value: string;
    index: number;
    open: boolean;
    lengthDifferenceBBToTag?: number;
    tag?: string;
    bb: string;
    params?: Param[];
};

export type MatchingTag = {
    tag: string;
    open: number | null;
    close: number | null;
};

export const replaceAt = (
    text: string,
    startIndex: number,
    endIndex: number,
    replacementString: string
) => {
    return text.substring(0, startIndex) + replacementString + text.substring(endIndex + 1);
};
