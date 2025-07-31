import { convertEmojisToUnicode } from './emoji';
import { loadEmojiShortList as loadList } from './asyncEmojiData';

let regShortnames: RegExp | undefined;
let shortNameList: Record<string, string> | undefined;

export const loadEmojiShortList = async () => {
    if (regShortnames && shortNameList) return;
    ({ regShortnames, shortNameList } = await loadList());
}

export const convertEmojisToUnicodeAsync = async (text: string) => {
    await loadEmojiShortList();
    return convertEmojiToUnicodeSync(text);
}

export const convertEmojiToUnicodeSync = (text: string) => {
    if (!regShortnames || !shortNameList) throw new Error("convertEmojisToUnicodeSync requires to call loadEmojiShortList before being called");
    return convertEmojisToUnicode(text, regShortnames, shortNameList);
}
