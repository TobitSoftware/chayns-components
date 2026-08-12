import { describe, expect, it } from 'vitest';
import { convertEmojisToUnicode } from './emoji';
import { regAscii } from '../constants/emoji';
import { regShortnames, shortNameList } from './emojiShortList';

describe('convertEmojisToUnicode', () => {
    it('does not replace shortnames adjacent to letters or numbers', () => {
        expect(convertEmojisToUnicode('x:smile:', regShortnames, shortNameList)).toBe('x:smile:');
        expect(convertEmojisToUnicode(':smile:x', regShortnames, shortNameList)).toBe(':smile:x');
        expect(convertEmojisToUnicode('x:smile:1', regShortnames, shortNameList)).toBe('x:smile:1');
    });

    it('replaces shortnames next to spaces or punctuation', () => {
        const emoji = convertEmojisToUnicode(':smile:', regShortnames, shortNameList);

        expect(convertEmojisToUnicode(' :smile: ', regShortnames, shortNameList)).toBe(
            ` ${emoji} `,
        );
        expect(convertEmojisToUnicode('(:smile:),', regShortnames, shortNameList)).toBe(
            `(${emoji}),`,
        );
    });
});
