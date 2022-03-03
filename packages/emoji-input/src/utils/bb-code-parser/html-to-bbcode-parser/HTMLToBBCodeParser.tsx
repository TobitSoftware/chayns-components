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
        }
        return '';
    };

    private getCombinedTagList = (text: string): CombinedItem[] => {
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
        let combinedList = [
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
                const params = value.matchAll(/([\w]*?)=\\?["„'](.*?)["“']/gi);
                return {
                    value,
                    index: i.index as number,
                    open: true,
                    tag,
                    bb: BbCodeEntry.bb,
                    lengthDifferenceBBToTag: tag.length - BbCodeEntry.bb.length,
                    params: [...params].map((p) => {
                        const split = p.split('=');
                        return {
                            together: p,
                            param: split[0],
                            value: split[1],
                        };
                    }),
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
                    bb: BbCodeEntry.bb,
                    lengthDifferenceBBToTag: tag.length - BbCodeEntry.bb.length,
                };
            }),
        ];
        combinedList = combinedList.filter((c) => c !== null);
        combinedList.sort((c1, c2) => (c1?.index || 0) - (c2?.index || 0));
        return combinedList as CombinedItem[];
    };
}
