import { BbCodes } from '../bbCodeUtils';

const bbCodeHTMLToText = (text: string): string => {
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
    const invalidParamRegExStart = `<span(&nbsp;| )class=["„']param["“'][^>]*>`;
    const invalidParamRegExEnd = `<\\/span>`;
    const invalidParamRegEx = `${invalidParamRegExStart}([^<]|<br>)*${invalidParamRegExEnd}`;

    let regExOpen = `<span( [^>]*)* class=["„'](open)["“'][^>]*>((${invalidParamRegEx}|[^<]*|<br>)*)<\\/span>(<(?:${tagRegExString})((&nbsp;| )[^>]*)*>)?`;
    let regExClose = `(<\\/(?:${tagRegExString})>)?<span((&nbsp;| )[^>]*)*(&nbsp;| )class=["„'](close)["“'][^>]*>(([^<]|<br>)*)<\\/span>`;
    let regExOpenAndClose = `${regExOpen}|${regExClose}`;

    const listOpenAndClose = text.matchAll(new RegExp(regExOpenAndClose, 'gi'));

    const openAndClosedArray = [...listOpenAndClose];

    for (let index = 0; index < openAndClosedArray.length; index++) {
        const i = openAndClosedArray[index];
        const value: string = i[0].toLowerCase();
        let replacement = '';
        if (i[2] === 'open') {
            replacement = i[3];
            replacement = replacement
                .replace(new RegExp(invalidParamRegExStart, 'gi'), '')
                .replace(new RegExp(invalidParamRegExEnd, 'gi'), '');
        } else if (i[14] === 'close') {
            replacement = i[15];
        }
        text = text.replace(value, replacement);
    }
    return text;
};
export default bbCodeHTMLToText;
