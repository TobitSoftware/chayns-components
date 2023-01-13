const URL_REGEX =
    /(\s|^)(?:http(s)?:\/\/|www\.)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/gi;

const makeLinks = (txt) => {
    let text = txt;
    let urls = text.match(URL_REGEX);
    if (chayns.utils.isArray(urls)) {
        const indexArray = [];
        urls = urls.map((url) => url.trim());
        urls.forEach((url) => {
            indexArray.push(text.indexOf(url));
            text = text.replace(url, '');
        });
        urls.reverse();
        indexArray.reverse();
        urls.forEach((url, index) => {
            let link = url;
            if (!link.startsWith('http')) {
                link = `https://${url}`;
            }
            const position = indexArray[index];
            text = [
                text.slice(0, position),
                `<a onclick="chayns.openUrlInBrowser('${link}')">${url}</a>`,
                text.slice(position),
            ].join('');
        });
    }
    return text;
};

export default makeLinks;
