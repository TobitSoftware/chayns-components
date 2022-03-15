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

export const replaceSpace = (text: string) => {
    // @ts-ignore
    const textMatches = [...text.matchAll(/(<[^>]* [^>]*>|<\/[^>]* [^>]*>)|( )/gi)];

    let newText = text;
    let indexOffset = 0;
    textMatches.forEach((m) => {
        if (m[0] === ' ') {
            // not in HTML-Tags
            const index = m.index + indexOffset;
            newText = replaceAt(newText, index, index + 1, '&nbsp;');
            indexOffset += 5; // diff ' ' to '&nbsp;' => 5
        }
    });
    return newText;
};
export const replaceNbsp = (text: string) => text.replace(/&nbsp;/gi, ' ');
