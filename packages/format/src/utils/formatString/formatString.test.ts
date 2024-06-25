import { expect, test } from 'vitest';
import { formatStringToHtml } from './formatString';

test('formatStringToHtml', () => {
    const result = formatStringToHtml('# test123');
    expect(result).toEqual({
        html: '',
        tables: [],
    });
});
