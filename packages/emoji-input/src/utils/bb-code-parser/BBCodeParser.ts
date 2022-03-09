import BBCodeToHTMLParser from './bbcode-to-html-parser/BBCodeToHTMLParser';
import bbCodeHTMLToText from './html-to-bbcode-parser/HTMLToBBCodeParser';

export enum InvalidTagPos {
    outer,
    middleTag,
}
export enum BBConvertType {
    showBBTags,
    hideBBTags_not_convertable,
}

export default class BBCodeParser {
    private readonly _BBToHTMLParser: BBCodeToHTMLParser;
    private readonly bbConvertType: BBConvertType;

    // showBBTags = false => no styles for BB-Tag possible!
    constructor(
        bbConvertType = BBConvertType.showBBTags,
        bbTagParams = 'style="opacity: 0.25"',
        invalidTagPos = InvalidTagPos.outer
    ) {
        this.bbConvertType = bbConvertType;
        this._BBToHTMLParser = new BBCodeToHTMLParser(bbConvertType, bbTagParams, invalidTagPos);
    }
    bbCodeTextToHTML = (text: string): string => {
        return this._BBToHTMLParser.bbCodeTextToHTML(text);
    };
    bbCodeHTMLToText = (html: string): string => {
        if (this.bbConvertType === BBConvertType.showBBTags) {
            return bbCodeHTMLToText(html);
        }
        throw 'BBCodeParser: html content not convertable with this ConvertType';
    };
}
