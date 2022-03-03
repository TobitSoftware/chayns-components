import type { InvalidTagPos } from '../BBCodeParser';
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
        this.totalLengthDifference = 0;
        if (this.showBbTags) {
            return this.replaceBBCodeHTML(text);
        }
        return '';
    };

    private replaceBBCodeHTML = (text: string): string => {
        let tagRegExString = '';
        BbCodes.forEach((c, i) => {
            tagRegExString += c.tag || c.bb;
            if (i !== BbCodes.length - 1) {
                tagRegExString += '|';
            }
        });
        const regExOpenAndClose = `(<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>(<(?:${tagRegExString})[^>]*>)?)|((<\\/(?:${tagRegExString})>)?<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>)`;
        const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

        const openAndClosedArray = [...listOpenAndClose];
        for (let index = 0; index < openAndClosedArray.length; index++) {
            const i = openAndClosedArray[index];
            const value: string = i[0].toLowerCase();
            const tagRegEx = `<[^>]*>`; // specific tags already matched for value
            const valueReplacement = value.replace(new RegExp(tagRegEx, 'gi'), '');
            text = text.replace(value, valueReplacement);
        }
        return text;
    };
}
