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
        tag: 'strong', //'span style="font-weight: bold"',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'i',
        tag: 'em',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 'u',
        tag: 'span style="text-decoration: underline"',
        params: defaultHtmlBbCodeParams,
    },
    {
        bb: 's',
        tag: 'span style="text-decoration: line-through"',
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
    {
        bb: 'lc_mention',
        tag: 'a',
        params: ['id'],
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
