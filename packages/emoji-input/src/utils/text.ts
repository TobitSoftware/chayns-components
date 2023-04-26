export const convertQuotes = (text: string) => {
    const regexForQuotes =
        /(?:\s|^|[\u{1F000}-\u{1F9FF}])"(?=\w)|(?<=\w)"(?=\s|$|[\u{1F000}-\u{1F9FF}])|(?<=\w)"(?=\w)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])"(?=\w)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])"(?=\^)|(?<=[^\w\s\u{1F000}-\u{1F9FF}])"(?<=[^\w\s\u{1F000}-\u{1F9FF}])|(?<=\w)"(?<=[^\w\s\u{1F000}-\u{1F9FF}])/gu;

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
