import emojiList from 'unicode-emoji-json/data-by-emoji.json';

const asciiList: { [key: string]: string } = {
    '*\\0/*': '1f646',
    '*\\O/*': '1f646',
    '-___-': '1f611',
    ":'-)": '1f602',
    "':-)": '1f605',
    "':-D": '1f605',
    '>:-)': '1f606',
    "':-(": '1f613',
    '>:-(': '1f620',
    ":'-(": '1f622',
    'O:-)': '1f607',
    '0:-3': '1f607',
    '0:-)': '1f607',
    '0;^)': '1f607',
    'O;-)': '1f607',
    '0;-)': '1f607',
    'O:-3': '1f607',
    '-__-': '1f611',
    ':-Þ': '1f61b',
    '</3': '1f494',
    ":')": '1f602',
    ':-D': '1f603',
    "':)": '1f605',
    "'=)": '1f605',
    "':D": '1f605',
    "'=D": '1f605',
    '>:)': '1f606',
    '>;)': '1f606',
    '>=)': '1f606',
    ';-)': '1f609',
    '*-)': '1f609',
    ';-]': '1f609',
    ';^)': '1f609',
    "':(": '1f613',
    "'=(": '1f613',
    ':-*': '1f618',
    ':^*': '1f618',
    '>:P': '1f61c',
    'X-P': '1f61c',
    '>:[': '1f61e',
    ':-(': '1f61e',
    ':-[': '1f61e',
    '>:(': '1f620',
    ":'(": '1f622',
    ';-(': '1f622',
    '>.<': '1f623',
    '#-)': '1f635',
    '%-)': '1f635',
    'X-)': '1f635',
    '\\0/': '1f646',
    '\\O/': '1f646',
    '0:3': '1f607',
    '0:)': '1f607',
    'O:)': '1f607',
    'O=)': '1f607',
    'O:3': '1f607',
    'B-)': '1f60e',
    '8-)': '1f60e',
    'B-D': '1f60e',
    '8-D': '1f60e',
    '-_-': '1f611',
    '>:\\': '1f615',
    '>:/': '1f615',
    ':-/': '1f615',
    ':-.': '1f615',
    ':-P': '1f61b',
    ':Þ': '1f61b',
    ':-b': '1f61b',
    ':-O': '1f62e',
    O_O: '1f62e',
    '>:O': '1f62e',
    ':-X': '1f636',
    ':-#': '1f636',
    ':-)': '1f642',
    '(y)': '1f44d',
    '<3': '2764-fe0f',
    '=D': '1f603',
    ';)': '1f609',
    '*)': '1f609',
    ';]': '1f609',
    ';D': '1f609',
    ':*': '1f618',
    '=*': '1f618',
    ':(': '1f61e',
    ':[': '1f61e',
    '=(': '1f61e',
    ':@': '1f620',
    ';(': '1f622',
    'D:': '1f628',
    ':$': '1f633',
    '=$': '1f633',
    '#)': '1f635',
    '%)': '1f635',
    'X)': '1f635',
    'B)': '1f60e',
    '8)': '1f60e',
    ':/': '1f615',
    ':\\': '1f615',
    '=/': '1f615',
    '=\\': '1f615',
    ':L': '1f615',
    '=L': '1f615',
    ':P': '1f61b',
    '=P': '1f61b',
    ':b': '1f61b',
    ':O': '1f62e',
    ':X': '1f636',
    ':#': '1f636',
    '=X': '1f636',
    '=#': '1f636',
    ':)': '1f642',
    '=]': '1f642',
    '=)': '1f642',
    ':]': '1f642',
    ':D': '1f604',
};

const asciiRegexp =
    "(\\*\\\\0\\/\\*|\\*\\\\O\\/\\*|\\-___\\-|\\:'\\-\\)|'\\:\\-\\)|'\\:\\-D|\\>\\:\\-\\)|>\\:\\-\\)|'\\:\\-\\(|\\>\\:\\-\\(|>\\:\\-\\(|\\:'\\-\\(|O\\:\\-\\)|0\\:\\-3|0\\:\\-\\)|0;\\^\\)|O;\\-\\)|0;\\-\\)|O\\:\\-3|\\-__\\-|\\:\\-Þ|\\:\\-Þ|\\<\\/3|<\\/3|\\:'\\)|\\:\\-D|'\\:\\)|'\\=\\)|'\\:D|'\\=D|\\>\\:\\)|>\\:\\)|\\>;\\)|>;\\)|\\>\\=\\)|>\\=\\)|;\\-\\)|\\*\\-\\)|;\\-\\]|;\\^\\)|'\\:\\(|'\\=\\(|\\:\\-\\*|\\:\\^\\*|\\>\\:P|>\\:P|X\\-P|\\>\\:\\[|>\\:\\[|\\:\\-\\(|\\:\\-\\[|\\>\\:\\(|>\\:\\(|\\:'\\(|;\\-\\(|\\>\\.\\<|>\\.<|#\\-\\)|%\\-\\)|X\\-\\)|\\\\0\\/|\\\\O\\/|0\\:3|0\\:\\)|O\\:\\)|O\\=\\)|O\\:3|B\\-\\)|8\\-\\)|B\\-D|8\\-D|\\-_\\-|\\>\\:\\\\|>\\:\\\\|\\>\\:\\/|>\\:\\/|\\:\\-\\/|\\:\\-\\.|\\:\\-P|\\:Þ|\\:Þ|\\:\\-b|\\:\\-O|O_O|\\>\\:O|>\\:O|\\:\\-X|\\:\\-#|\\:\\-\\)|\\(y\\)|\\<3|<3|\\=D|;\\)|\\*\\)|;\\]|;D|\\:\\*|\\=\\*|\\:\\(|\\:\\[|\\=\\(|\\:@|;\\(|D\\:|\\:\\$|\\=\\$|#\\)|%\\)|X\\)|B\\)|8\\)|\\:\\/|\\:\\\\|\\=\\/|\\=\\\\|\\:L|\\=L|\\:P|\\=P|\\:b|\\:O|\\:X|\\:#|\\=X|\\=#|\\:\\)|\\=\\]|\\=\\)|\\:\\]|\\:D)";

const regAscii = new RegExp(
    `<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|((\\s|^)${asciiRegexp}(?=\\s|$|[!,.?]))`,
    'gi'
);

const shortNameList: { [key: string]: string } = {};

let shortnameRegexp = '';

Object.entries(emojiList).forEach(([unicode, { slug }], index) => {
    const shortname = `:${slug}:`;

    shortNameList[shortname] = unicode;
    shortnameRegexp += `${index !== 0 ? '|' : ''}${shortname}`;
});

const regShortnames = new RegExp(
    `<object[^>]*>.*?</object>|<span[^>]*>.*?</span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(${shortnameRegexp})`,
    'gi'
);

const convert = (unicode: string) => {
    if (unicode.indexOf('-') > -1) {
        const parts = [];

        const s = unicode.split('-');

        for (let i = 0; i < s.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            let part: number | string = parseInt(s[i]!, 16);

            if (part >= 0x10000 && part <= 0x10ffff) {
                const hi = Math.floor((part - 0x10000) / 0x400) + 0xd800;
                const lo = ((part - 0x10000) % 0x400) + 0xdc00;

                part = String.fromCharCode(hi) + String.fromCharCode(lo);
            } else {
                part = String.fromCharCode(part);
            }

            parts.push(part);
        }

        return parts.join('');
    }

    const s = parseInt(unicode, 16);

    if (s >= 0x10000 && s <= 0x10ffff) {
        const hi = Math.floor((s - 0x10000) / 0x400) + 0xd800;
        const lo = ((s - 0x10000) % 0x400) + 0xdc00;

        return String.fromCharCode(hi) + String.fromCharCode(lo);
    }

    return String.fromCharCode(s);
};

const unescapeHTML = (text: string) => {
    const unescaped: { [key: string]: string } = {
        '&amp;': '&',
        '&#38;': '&',
        '&#x26;': '&',
        '&lt;': '<',
        '&#60;': '<',
        '&#x3C;': '<',
        '&gt;': '>',
        '&#62;': '>',
        '&#x3E;': '>',
        '&quot;': '"',
        '&#34;': '"',
        '&#x22;': '"',
        '&apos;': "'",
        '&#39;': "'",
        '&#x27;': "'",
    };

    return text.replace(
        /&(?:amp|#38|#x26|lt|#60|#x3C|gt|#62|#x3E|apos|#39|#x27|quot|#34|#x22);/gi,
        (match) => unescaped[match] ?? match
    );
};

export const convertEmojisToUnicode = (text: string): string => {
    let result = text;

    result = result.replace(regShortnames, (shortname) => {
        if (shortname) {
            const unicode = shortNameList[shortname];

            if (unicode) {
                return unicode;
            }
        }

        return shortname;
    });

    result = result.replace(regAscii, (fullMatch, m1, m2, m3) => {
        if (typeof m3 === 'string' && m3 !== '') {
            const unicode = asciiList[unescapeHTML(m3)];

            if (unicode) {
                return (m2 as string) + convert(unicode.toUpperCase());
            }
        }

        return fullMatch;
    });

    return result;
};

export const addSkinToneToEmoji = (emoji: string, skinTone: string): string =>
    emoji
        .split('\u{200D}')
        .map((rawEmoji) => {
            const parts = [rawEmoji.replace(/\ufe0f/, '')];

            // @ts-expect-error: Difficult to type external json file
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (emojiList[rawEmoji]?.skin_tone_support) {
                parts.push(skinTone);
            }

            return parts.join('');
        })
        .join('\u{200D}');
