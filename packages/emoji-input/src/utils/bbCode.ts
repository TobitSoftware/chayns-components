const defaultHtmlBbCodeParams = ['style'];
const defaultHtmlBbCodeButtonParams = [
    'url',
    'urlParameters',
    'tappId',
    'siteId',
    'locationId',
    'buttonName',
    'post',
    'sendAccessToken',
];

const BbCodes = [
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

type CombinedItem = {
    value: string;
    index: number;
    open: boolean;
    lengthDifferenceBBToTag: number;
    tag: string;
    params: string[];
};

const getCombinedTagList = (text: string): CombinedItem[] => {
    let bbRegExString = '';
    BbCodes.forEach((c, i) => {
        bbRegExString += c.bb;
        if (i !== BbCodes.length - 1) {
            bbRegExString += '|';
        }
    });
    const regExOpen = `\\[(?:${bbRegExString})\[^\\]\]*\]`;
    const regExClose = `\\[\/(?:${bbRegExString})\]`;
    const listOpen = text.matchAll(new RegExp(regExOpen, 'gi'));
    const listClose = text.matchAll(new RegExp(regExClose, 'gi'));
    const combinedList = [
        ...[...listOpen].map((i) => {
            const value: string = i[0].toLowerCase();
            const BbCodeEntry = BbCodes.find(
                (b) =>
                    b.bb ===
                    value
                        ?.substring(1, value?.length - 1)
                        .trim()
                        .split(' ')[0]
            );
            if (!BbCodeEntry || value === null) {
                return null;
            }
            const tag = BbCodeEntry.tag || BbCodeEntry.bb;
            return {
                value,
                index: i.index as number,
                open: true,
                tag,
                lengthDifferenceBBToTag: tag.length - BbCodeEntry.bb.length,
                params: value
                    .substring(1 + (BbCodeEntry.bb.length || 1), value.length - 1)
                    .split(' ')
                    .filter((p: string) => p !== ''),
            };
        }),
        ...[...listClose].map((i) => {
            const value: string = i[0].toLowerCase();
            const BbCodeEntry = BbCodes.find(
                (b) => b.bb === value?.substring(2, value?.length - 1).trim()
            );
            if (!BbCodeEntry || value === null) {
                return null;
            }
            const tag = BbCodeEntry.tag || BbCodeEntry.bb;
            return {
                value,
                index: i.index as number,
                open: false,
                tag,
                lengthDifferenceBBToTag: tag.length - BbCodeEntry.bb.length,
            };
        }),
    ];
    combinedList.filter((c) => c !== null);
    combinedList.sort((c1, c2) => (c1?.index || 0) - (c2?.index || 0));
    return combinedList as CombinedItem[];
};

type MatchingTagIndex = {
    open: number | null;
    close: number | null;
};

const replaceAt = (
    text: string,
    startIndex: number,
    endIndex: number,
    replacementString: string
) => {
    return text.substring(0, startIndex) + replacementString + text.substring(endIndex + 1);
};

let totalLengthDifference = 0; // global var

const replaceBbItemWithHTML = (text: string, item: CombinedItem): string => {
    const tagStartIndex = item.index + totalLengthDifference;
    let paramLength = 0;
    let paramString = '';
    item.params?.forEach((p) => {
        paramLength += p.length + 1; // +1 => space which was cut away via .split(' ') in getCombinedTagList
        paramString += ` ${p}`; // space added here
    });
    const tagEndIndex =
        tagStartIndex +
        paramLength +
        (item.tag.length - 1 - item.lengthDifferenceBBToTag) +
        (item.open ? 2 : 3);
    // b => [b] oder [/b] => length 3 / 4 (+2 / +3)

    let replacementString = '';
    let originalTag = '';
    if (item.open) {
        replacementString = `<${item.tag}${paramString}>`;
        originalTag = `[${item.tag}${paramString}]`;
    } else {
        replacementString = `</${item.tag}>`;
        originalTag = `[/${item.tag}]`;
    }
    // length difference is set only for next tag, because start & endIndex already set above
    totalLengthDifference +=
        item.lengthDifferenceBBToTag + (replacementString.length - originalTag.length);

    return replaceAt(text, tagStartIndex, tagEndIndex, replacementString);
};

export const bbCodeTextToHTML = (text: string) => {
    totalLengthDifference = 0;
    const combinedList = getCombinedTagList(text);
    console.log(combinedList);

    let invalidTags: MatchingTagIndex[] = [];
    const matchingTags: MatchingTagIndex[] = []; // open & closeIndex in object in CombinedList;
    combinedList.forEach((c, ci) => {
        let matchingIndex: number | null = null;
        if (!c.open) {
            matchingTags.forEach((m, mi) => {
                // takes last item from matchinIndex-List
                if (m.close === null && m.open !== null) {
                    const openItem = combinedList[m.open];
                    if (openItem?.tag === c.tag) {
                        matchingIndex = mi;
                    }
                }
            });
            if (matchingIndex !== null) {
                if (matchingIndex < matchingTags?.length) {
                    matchingTags[matchingIndex].close = ci;
                }
            } else {
                invalidTags.push({ open: null, close: ci });
            }
        } else {
            matchingTags.push({ open: ci, close: null });
        }
    });
    invalidTags = [...invalidTags, ...matchingTags.filter((m) => m.close === null)];
    const validTags = matchingTags.filter((m) => m.open !== null && m.close !== null);
    // ToDo tags at start(open) or end(close) are invalid => change to tag in middle???

    let newText = text;
    validTags.forEach((v) => {
        if (v.open !== null && v.close !== null) {
            const openItem = combinedList[v.open];
            const closeItem = combinedList[v.close];
            if (openItem && closeItem) {
                newText = replaceBbItemWithHTML(newText, openItem);
                newText = replaceBbItemWithHTML(newText, closeItem);
            }
        }
    });
    // ToDo show valid & invalid parameters in Tags
    console.log(newText, totalLengthDifference);
};
export const bbCodeHTMLToText = () => {};
