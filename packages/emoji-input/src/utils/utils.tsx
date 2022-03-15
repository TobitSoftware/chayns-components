export const replaceAt = (
    text: string,
    startIndex: number,
    endIndex: number,
    replacementString: string
) => {
    return text.substring(0, startIndex) + replacementString + text.substring(endIndex);
};
export const removeBrTag = (html: string) => {
    if (html.substring(html.length - 4, html.length) === '<br>') {
        return html.substring(0, html.length - 4); // - <br>
    }
    return html;
};
export const addBrTag = (text: string) => {
    if (text.substring(text.length - 4, text.length) !== '<br>') {
        text += '<br>';
    }
    return text;
};

export const replaceSpace = (text: string) => text.replace(/ /gi, '&nbsp;'); // &nbsp; => \xa0
export const replaceNbsp = (text: string) => text.replace(/&nbsp;/gi, ' ');
