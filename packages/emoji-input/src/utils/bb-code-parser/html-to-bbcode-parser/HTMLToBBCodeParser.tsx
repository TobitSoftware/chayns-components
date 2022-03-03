import { InvalidTagPos } from '../BBCodeParser';
import type { CombinedItem } from '../bbCodeUtils';
import { BbCodes } from '../bbCodeUtils';

export default class HTMLToBBCodeParser {
    readonly showBbTags: boolean;
    readonly bbTagStyles: string;
    readonly invalidTagPos: InvalidTagPos;
    private totalLengthDifference: number = 0;

    constructor(showBbTags: boolean, bbTagStyles: string, invalidTagPos: InvalidTagPos) {
        this.showBbTags = showBbTags;
        this.bbTagStyles = bbTagStyles;
        this.invalidTagPos = invalidTagPos;
    }

    bbCodeHTMLToText = (text: string): string => {
        if (this.showBbTags) {
            const combinedList = this.getCombinedTagList(text);
            console.log(combinedList);
        }
        return '';
    };

    private getCombinedTagList = (text: string): CombinedItem[] => {
        let bbRegExString = '',
            tagRegExString = '';
        BbCodes.forEach((c, i) => {
            bbRegExString += c.bb;
            tagRegExString += c.tag || c.bb;
            if (i !== BbCodes.length - 1) {
                bbRegExString += '|';
                tagRegExString += '|';
            }
        });
        const regExOpenAndClose = `(<span\[^>\]*>\\[(?:${bbRegExString})\[^\\]\]*\\]<\/span><(?:${tagRegExString})\[^>\]*>)|(<\/(?:${tagRegExString})><span\[^>\]*>\\[\/(?:${bbRegExString})\\]<\/span>)`;

        // openClass Regex = /class=\\?["„']open([\d]{2,}?)["“']/gi
        // closeClass Regex = /class=\\?["„']close([\d]{2,}?)["“']/gi
        // match bbTag = /\[(?:b|link)[^\]]*]/gi => match tag => (not matchAll) => (?:b|link)
        // match id = /\d{2,}/gi

        const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));
        let combinedList = [...listOpenAndClose].map((i) => {
            const value: string = i[0].toLowerCase();
            const valueClasses: RegExpMatchArray | null = value.match(
                /class=\\?["„'](open|close)([\d]{2,}?)["“']/gi
            );
            const valueClass: string | null = valueClasses && (valueClasses[0] as string);
            const openStrings: RegExpMatchArray | null = valueClass?.match(/open/gi) || null;
            const open: boolean = !openStrings ? false : !!openStrings[0];
            const ids: RegExpMatchArray | null = valueClass?.match(/\d{2,}/gi) || null;
            const id: string | null = ids && ids[0] ? ids[0] : null;

            const bbCodeRegEx: string = `(\[(?:${bbRegExString})[^\]]*])|(\[\/(?:${bbRegExString})])`;
            const valueBbs: RegExpMatchArray | null = value.match(new RegExp(bbCodeRegEx, 'gi'));
            const valueBb: string | undefined = (valueBbs && valueBbs[0])
                ?.substring(open ? 1 : 2, value?.length - 1)
                .trim()
                .split(' ')[0];
            console.log(valueBb, id, open, value);
            if (!valueBb || value === null || open === null || id === null) {
                return null;
            }
            return {
                value,
                id,
                index: i.index as number,
                open,
                bb: valueBb,
            };
        });
        combinedList = combinedList.filter((c) => c !== null);
        // combinedList.sort((c1, c2) => (c1?.index || 0) - (c2?.index || 0));
        return combinedList as CombinedItem[];
    };
}
