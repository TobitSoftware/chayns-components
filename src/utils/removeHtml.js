const HTML_REGEX = /<[^>]*>/g;

const removeHtml = (txt) => {
    let text = txt;
    const tags = text.match(HTML_REGEX);
    if (Array.isArray(tags)) {
        tags.forEach((tag) => {
            text = text.replace(tag, '');
        });
    }
    return text;
};

export default removeHtml;
