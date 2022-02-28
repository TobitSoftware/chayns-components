const defaultHtmlBbCodeParams = ['style'];
const defaultHtmlBbCodeButtonParams = ['style'];

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

export const bbCodeTextToHTML = (text: string) => {
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
            const value = i[0].toLowerCase();
            const BbCodeEntry = BbCodes.find(
                (b) =>
                    b.bb ===
                    value
                        ?.substring(1, value?.length - 1)
                        .trim()
                        .split(' ')[0]
            );
            return {
                value,
                index: i.index,
                open: true,
                tag: BbCodeEntry?.tag || BbCodeEntry?.bb,
                params: value
                    .substring(1 + (BbCodeEntry?.bb?.length || 1), value?.length - 1)
                    .split(' ')
                    .filter((p: string) => p !== ''),
            };
        }),
        ...[...listClose].map((i) => {
            const value = i[0].toLowerCase();
            const BbCodeEntry = BbCodes.find(
                (b) => b.bb === value?.substring(2, value?.length - 1).trim()
            );
            return {
                value,
                index: i.index,
                open: false,
                tag: BbCodeEntry?.tag || BbCodeEntry?.bb,
            };
        }),
    ];
    combinedList.sort((e1, e2) => e1.index - e2.index);
    console.log(combinedList);
    combinedList.forEach((e) => {});
    //const reg = new RegExp();
};
export const bbCodeHTMLToText = () => {};
