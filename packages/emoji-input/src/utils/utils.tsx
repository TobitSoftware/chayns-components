export const replaceAt = (
    text: string,
    startIndex: number,
    endIndex: number,
    replacementString: string
) => {
    return text.substring(0, startIndex) + replacementString + text.substring(endIndex + 1);
};
export const removeBrTag = (html: string) => {
    return html.substring(0, html.length - 4); // - <br>
};
export const addBrTag = (text: string) => text + '<br>';

export const replaceSpace = (text: string) => text.replace(/ /gi, '&nbsp;'); // &nbsp; => \xa0
export const replaceNbsp = (text: string) => text.replace(/&nbsp;/gi, ' ');
