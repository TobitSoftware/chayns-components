const URL_REGEX = /(\s|^)(?:http(s)?:\/\/|www\.)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/gi;

const makeLinks = (txt) => {
    let text = txt;
    const urls = text.match(URL_REGEX);
    if (chayns.utils.isArray(urls)) {
        const indexArray = [];
        urls.forEach((url) => {
            const space = (url.startsWith('w') || url.startsWith('h') ? 0 : 1);
            indexArray.push(text.indexOf(url) + space);
            text = text.replace(url, space ? ' ' : '');
        });
        urls.reverse();
        indexArray.reverse();
        urls.forEach((url, index) => {
            let link = url.substring(url.startsWith('w') || url.startsWith('h') ? 0 : 1);
            if (!link.startsWith('http')) {
                link = `https://${url}`;
            }
            const position = indexArray[index];
            text = [text.slice(0, position), `<a onclick="chayns.openUrlInBrowser('${link}')">${url}</a>`, text.slice(position)].join('');
        });
    }
    return text;
};

export default makeLinks;
