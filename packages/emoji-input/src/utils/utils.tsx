export const replaceAt = (
    text: string,
    startIndex: number,
    endIndex: number,
    replacementString: string
) => {
    return text.substring(0, startIndex) + replacementString + text.substring(endIndex + 1);
};
export const formatInputHTML = (html: string) => {
    html = html.substring(0, html.length - 4); // - <br>
    return html;
};
export const formatInputText = (text: string) => {
    text = text.replace('&nbsp;', ' ');
    return text;
};
export const addBrToText = (text: string) => text + '<br>';
