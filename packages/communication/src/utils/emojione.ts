import emojione from '../constants/emojione.json';

const emojiRegex = /:[a-zA-Z0-9_+\-]+:/g;

export const replaceEmojis = (text: string): string =>
    text.replace(emojiRegex, (match) => emojione[match as keyof typeof emojione] ?? match);
