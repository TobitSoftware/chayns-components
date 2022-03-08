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
    const invalidParamRegExStart = `<span class=["„']param["“'][^>]*>`;
    const invalidParamRegExEnd = `<\\/span>`;
    const invalidParamRegEx = `${invalidParamRegExStart}([^<]|<br>)*${invalidParamRegExEnd}`;

    let regExOpen = `<span( [^>]*)* class=["„'](open)["“'][^>]*>((${invalidParamRegEx}|[^<]*|<br>)*)<\\/span>(<(?:${tagRegExString})( [^>]*)*>)?`;
    let regExClose = `(<\\/(?:${tagRegExString})>)?<span( [^>]*)* class=["„'](close)["“'][^>]*>(([^<]|<br>)*)<\\/span>`;
    let regExOpenAndClose = `${regExOpen}|${regExClose}`;

    const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

    const openAndClosedArray = [...listOpenAndClose];
    console.log('openAndClosedArray: ', openAndClosedArray);

    for (let index = 0; index < openAndClosedArray.length; index++) {
        const i = openAndClosedArray[index];
        const value: string = i[0].toLowerCase();
        let replacement = '';
        if (i[2] === 'open') {
            replacement = i[3];
            replacement = replacement
                .replace(new RegExp(invalidParamRegExStart, 'gi'), '')
                .replace(new RegExp(invalidParamRegExEnd, 'gi'), '');
        } else if (i[10] === 'close') {
            replacement = i[11];
        }
        text = text.replace(value, replacement);
    }
    return text;
};
export default bbCodeHTMLToText;
