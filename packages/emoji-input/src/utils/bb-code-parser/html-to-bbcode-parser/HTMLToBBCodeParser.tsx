import { BbCodes } from '../bbCodeUtils';

const bbCodeHTMLToText = (text: string): string => {
    console.log('text: ', text);
    let tagRegExString = '';
    let bbRegExString = '';
    BbCodes.forEach((c, i) => {
        tagRegExString += c.tag || c.bb;
        bbRegExString += c.bb;
        if (i !== BbCodes.length - 1) {
            tagRegExString += '|';
            bbRegExString += '|';
        }
    });
    const parameterRegEx = `[\\w]*?=("[^"]*?"|'[^']*?'|„[^„“]*?“)`;
    const invalidParameterRegEx = `<span class=["„']param["“'][^>]*>[\\w]*?=("[^"]*?"|\'[^\']*?\'|„[^„“]*?“)<\\/span>`;
    const regExOpenWithInvalid = `\\[(${bbRegExString})( (${parameterRegEx}|${invalidParameterRegEx}))*\\]`;
    const regExClose = `\\[\/(${bbRegExString})\\]`;

    let regExOpenAndClose = `(<span( [^>]*)* class=["„']open["“'][^>]*>(${regExOpenWithInvalid})<\\/span>(<(?:${tagRegExString})[^>]*>)?)|((<\\/(?:${tagRegExString})>)?<span( [^>]*)* class=["„']close["“'][^>]*>(${regExClose})<\\/span>)`;

    const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

    const openAndClosedArray = [...listOpenAndClose];
    console.log('openAndClosedArray: ', openAndClosedArray);
    for (let index = 0; index < openAndClosedArray.length; index++) {
        const i = openAndClosedArray[index];
        const value: string = i[0].toLowerCase();
        let replacement;
        if (i[9]) {
            // openTag
            replacement = i[3];
            replacement = replacement
                .replace(new RegExp(`<span class=["„']param["“'][^>]*>`, 'gi'), '')
                .replace(new RegExp('<\\/span>', 'gi'), '');
        } else if (i[11]) {
            // closeTag
            replacement = i[13];
        }
        text = text.replace(value, replacement);
    }
    return text;
};
export default bbCodeHTMLToText;
