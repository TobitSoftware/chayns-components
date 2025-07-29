import { convertEmojisToUnicode } from './emoji';
import { loadEmojiShortList } from './asyncEmojiData';

let regShortnames: RegExp | undefined;
let shortNameList: Record<string, string> | undefined;

const getEmojiShortList = async () => {
    if ( regShortnames &&  shortNameList ) return { regShortnames, shortNameList };
    ({ regShortnames, shortNameList } = await loadEmojiShortList());
    return { regShortnames, shortNameList };
}

export const convertEmojisToUnicodeAsync = async (text: string) => {
    const {regShortnames: reg, shortNameList: shortNames} = await getEmojiShortList();
    return convertEmojisToUnicode(text, reg, shortNames);
}
