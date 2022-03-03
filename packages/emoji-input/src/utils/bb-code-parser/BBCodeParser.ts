import BBCodeToHTMLParser from './bbcode-to-html-parser/BBCodeToHTMLParser';
import HTMLToBBCodeParser from './html-to-bbcode-parser/HTMLToBBCodeParser';

export enum InvalidTagPos {
    outer,
    middleTag,
}

export default class BBCodeParser {
    private _BBToHTMLParser: BBCodeToHTMLParser;
    private _HTMLToBBParser: HTMLToBBCodeParser;

    constructor(
        showBbTags = false,
        bbTagStyles = 'style="opacity: 0.5"',
        invalidTagPos = InvalidTagPos.outer
    ) {
        this._BBToHTMLParser = new BBCodeToHTMLParser(showBbTags, bbTagStyles, invalidTagPos);
        this._HTMLToBBParser = new HTMLToBBCodeParser(showBbTags, bbTagStyles, invalidTagPos);
    }
    bbCodeTextToHTML = (text: string): string => {
        return this._BBToHTMLParser.bbCodeTextToHTML(text);
    };
    bbCodeHTMLToText = (html: string): string => {
        return this._HTMLToBBParser.bbCodeHTMLToText(html);
    };
}
