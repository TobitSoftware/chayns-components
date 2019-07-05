const HTML_REGEX = /<[^>]*>/g;

const removeHtml = (txt) => {
    let text = txt;
    const tags = text.match(HTML_REGEX);
    if (chayns.utils.isArray(tags)) {
        tags.forEach((tag) => {
            text = text.replace(tag, '');
        });
    }
    return text;
};

export default removeHtml;
