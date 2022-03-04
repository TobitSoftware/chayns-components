import BBCodeToHTMLParser from './bbcode-to-html-parser/BBCodeToHTMLParser';
import { BbCodes } from './bbCodeUtils';

export enum InvalidTagPos {
    outer,
    middleTag,
}
export enum BBConvertType {
    showBBTags,
    hideBBTags_convertable,
    hideBBTags_not_convertable,
}

export default class BBCodeParser {
    private readonly _BBToHTMLParser: BBCodeToHTMLParser;
    private readonly bbConvertType: BBConvertType;

    // showBBTags = false => no styles for BB-Tag possible!
    constructor(
        bbConvertType = BBConvertType.showBBTags,
        bbTagParams = 'style="opacity: 0.5"',
        invalidTagPos = InvalidTagPos.outer
    ) {
        this.bbConvertType = bbConvertType;
        this._BBToHTMLParser = new BBCodeToHTMLParser(bbConvertType, bbTagParams, invalidTagPos);
    }
    bbCodeTextToHTML = (text: string): string => {
        return this._BBToHTMLParser.bbCodeTextToHTML(text);
    };
    bbCodeHTMLToText = (ref: HTMLDivElement): string | null => {
        if (this.bbConvertType === BBConvertType.showBBTags) {
            return ref.innerText;
        } else if (this.bbConvertType === BBConvertType.hideBBTags_convertable) {
            return this.convertHiddenBbCodeHTMLToText(ref.innerHTML);
        }
        throw 'BBCodeParser: html content not convertable with this ConvertType';
    };

    private convertHiddenBbCodeHTMLToText = (text: string): string => {
        let tagRegExString = '';
        BbCodes.forEach((c, i) => {
            tagRegExString += c.tag || c.bb;
            if (i !== BbCodes.length - 1) {
                tagRegExString += '|';
            }
        });
        let regExOpenAndClose = `(<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>(<(?:${tagRegExString})[^>]*>)?)|((<\\/(?:${tagRegExString})>)?<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>)`;
        const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

        const openAndClosedArray = [...listOpenAndClose];
        for (let index = 0; index < openAndClosedArray.length; index++) {
            const i = openAndClosedArray[index];
            const value: string = i[0].toLowerCase();
            const regExOpen = `<span class=["„']open["“']><\\/span>(<(?:${tagRegExString})[^>]*>)?`;
            const arrayOpen = [...value.matchAll(new RegExp(regExOpen, 'gi'))];
            if (arrayOpen && arrayOpen[0] && arrayOpen[0].length > 1) {
                const openReplacement = arrayOpen[0][1]?.replace('<', '[')?.replace('>', ']');
                text = text.replace(arrayOpen[0][0], openReplacement);
            }

            const regExClose = `(<\\/(?:${tagRegExString})>)?<span class=["„']close["“']><\\/span>`;
            const arrayClose = [...value.matchAll(new RegExp(regExClose, 'gi'))];
            if (arrayClose && arrayClose[0] && arrayClose[0].length > 1) {
                const closeReplacement = arrayClose[0][1]?.replace('</', '[/')?.replace('>', ']');
                text = text.replace(arrayClose[0][0], closeReplacement);
            }
        }
        return text;
    };
}
