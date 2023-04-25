export const convertQuotes = (text: string) => {
    const regexForQuotes =
        /(?:\s|^)"(?=\w)|(?<=\w)"(?=\s|$)|(?<=\w)"(?=\w)|(?<=[^\w\s])"(?=\w)|(?<=[^\w\s])"(?=\^)|(?<=[^\w\s])"(?<=[^\w\s])|(?<=\w)"(?<=[^\w\s])/g;

    const regexForQuoteStart = /„(\s|$)/g;

    const formattedQuotes = text.replace(regexForQuotes, (match) => {
        if (match.startsWith(' ') || text.startsWith(match)) {
            return match.startsWith(' ')
                ? ` ${String.fromCharCode(8222)}`
                : String.fromCharCode(8222);
        }
        return String.fromCharCode(8220);
    });

    return formattedQuotes.replace(regexForQuoteStart, '"');
};
