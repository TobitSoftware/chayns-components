import type { InvalidTagPos } from '../BBCodeParser';
import { BbCodes } from '../bbCodeUtils';

export default class HTMLToBBCodeParser {
    readonly showBbTags: boolean;
    readonly bbTagStyles: string;
    readonly invalidTagPos: InvalidTagPos;

    constructor(showBbTags: boolean, bbTagStyles: string, invalidTagPos: InvalidTagPos) {
        this.showBbTags = showBbTags;
        this.bbTagStyles = bbTagStyles;
        this.invalidTagPos = invalidTagPos;
    }

    bbCodeHTMLToText = (text: string): string => {
        return this.replaceBBCodeHTML(text);
    };

    private replaceBBCodeHTML = (text: string): string => {
        let tagRegExString = '';
        BbCodes.forEach((c, i) => {
            tagRegExString += c.tag || c.bb;
            if (i !== BbCodes.length - 1) {
                tagRegExString += '|';
            }
        });
        let regExOpenAndClose = `(<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>(<(?:${tagRegExString})[^>]*>)?)|((<\\/(?:${tagRegExString})>)?<span( [^>]*)* class=["„'](open|close)["“'][^>]*>[^<]*<\\/span>)`;
        if (!this.showBbTags) {
            regExOpenAndClose = `(<span class=["„'](open|close)["“']><\\/span>(<(?:${tagRegExString})[^>]*>)?)|((<\\/(?:${tagRegExString})>)?<span class=["„'](open|close)["“']><\\/span>)`;
        }
        const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

        const openAndClosedArray = [...listOpenAndClose];
        for (let index = 0; index < openAndClosedArray.length; index++) {
            const i = openAndClosedArray[index];
            const value: string = i[0].toLowerCase();
            if (this.showBbTags) {
                const valueReplacement = value.replace(new RegExp('<[^>]*>', 'gi'), '');
                text = text.replace(value, valueReplacement);
            } else {
                const regExOpen = `<span class=["„']open["“']><\\/span>(<(?:${tagRegExString})[^>]*>)?`;
                const arrayOpen = [...value.matchAll(new RegExp(regExOpen, 'gi'))];
                if (arrayOpen && arrayOpen[0] && arrayOpen[0].length > 1) {
                    const openReplacement = arrayOpen[0][1]?.replace('<', '[')?.replace('>', ']');
                    text = text.replace(arrayOpen[0][0], openReplacement);
                }

                const regExClose = `(<\\/(?:${tagRegExString})>)?<span class=["„']close["“']><\\/span>`;
                const arrayClose = [...value.matchAll(new RegExp(regExClose, 'gi'))];
                if (arrayClose && arrayClose[0] && arrayClose[0].length > 1) {
                    const closeReplacement = arrayClose[0][1]
                        ?.replace('</', '[/')
                        ?.replace('>', ']');
                    text = text.replace(arrayClose[0][0], closeReplacement);
                }
            }
        }
        return text;
    };
}
