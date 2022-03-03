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
        const regExOpenAndClose = `(<span( [^>]*)* class=["„'](open|close)([\\d]{2,}?)["“'][^>]*>[^<]*<\\/span><(?:${tagRegExString})[^>]*>)|(<\\/(?:${tagRegExString})><span( [^>]*)* class=["„'](open|close)([\\d]{2,}?)["“'][^>]*>[^<]*<\\/span>)`;

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

            let valueTag: string | null = null;
            if (open) {
                // last open-Tag
                const openTagRegEx: string = `<(?:${tagRegExString})[^>]*>`;
                const valueTags: RegExpMatchArray | null = value.match(
                    new RegExp(openTagRegEx, 'gi')
                );
                valueTag = valueTags && (valueTags[valueTags?.length - 1] as string);
            } else {
                // first close-Tag
                const closeTagRegEx: string = `<\/(?:${tagRegExString})>`;
                const valueTags: RegExpMatchArray | null = value.match(
                    new RegExp(closeTagRegEx, 'gi')
                );
                valueTag = valueTags && (valueTags[0] as string);
            }
            valueTag =
                valueTag &&
                (valueTag
                    .substring(open ? 1 : 2, valueTag.length - 1)
                    .trim()
                    .split(' ')[0] as string);
            const BbCodeEntry = BbCodes.find((b) => (b.tag || b.bb) === valueTag);
            console.log(valueTag, open, id, value);
            if (!BbCodeEntry || value === null || open === null || id === null) {
                return null;
            }
            const tag = BbCodeEntry.tag || BbCodeEntry.bb;
            return {
                value,
                id,
                index: i.index as number,
                open,
                bb: BbCodeEntry.bb,
                tag,
                lengthDifferenceBBToTag: tag.length - BbCodeEntry.bb.length,
            };
        });
        combinedList = combinedList.filter((c) => c !== null);
        // combinedList.sort((c1, c2) => (c1?.index || 0) - (c2?.index || 0));
        return combinedList as CombinedItem[];
    };
}
