import emojiList from 'unicode-emoji-json/data-by-emoji.json';
import { asciiList, regAscii, regShortnames, shortNameList } from '../constants/emoji';

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

export const unescapeHTML = (text: string) => {
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

    result = result.replace(/https?:\/\/.*?(?=$|\s)/gi, (fullMatch) =>
        fullMatch.replace(/:/g, '%3A')
    );

    result = result.replace(regShortnames, (shortname) => {
        if (shortname) {
            const unicode = shortNameList[shortname];

            if (unicode) {
                return convert(unicode.toUpperCase());
            }
        }

        return shortname;
    });

    result = result.replace(/https?%3A\/\/.*?(?=$|\s)/gi, (fullMatch) =>
        fullMatch.replace(/%3A/g, ':')
    );

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
