import { describe, expect, it } from 'vitest';
import { convertHTMLToText, serializeHTMLToText } from './text';

const serializeHTML = (html: string) => {
    const container = document.createElement('div');
    container.innerHTML = html;

    return serializeHTMLToText(container.childNodes);
};

describe('serializeHTMLToText', () => {
    it('normalizes Safari styled spans without losing an empty line', () => {
        const result = serializeHTML(
            'question?<span style="font-size: var(--base-font-size, 15px);"></span><span style="font-size: var(--base-font-size, 15px);">Unsere Logs…</span>',
        );

        expect(result).toBe('question?<br>Unsere Logs…');
        expect(result).not.toContain('<span');
        expect(result).not.toContain('</span>');
        expect(result).not.toContain('style=');
        expect(result.match(/<br>/g) ?? []).toHaveLength(1);
    });

    it('preserves line breaks, nesting, and block structure inside spans', () => {
        expect(serializeHTML('<span><br></span>')).toBe('<br>');
        expect(serializeHTML('<span>before<span>nested</span>after</span>')).toBe(
            'beforenestedafter',
        );
        expect(serializeHTML('<span><div>first</div><p>second</p></span>')).toBe('first<br>second');
    });

    it('keeps semantic replacements and unsupported-element fallback behavior', () => {
        expect(
            convertHTMLToText('<span><span class="no-emoji-convert">:smile:</span></span>', {
                preserveSpaces: true,
            }),
        ).toBe('[ignoreEmoji]:smile:[/ignoreEmoji]');
        expect(
            convertHTMLToText(
                '<span><lc_mention id="user"><span>@</span>Jane</lc_mention></span>',
                { preserveSpaces: true },
            ),
        ).toBe('[lc_mention id="user"]Jane[/lc_mention]');
        expect(serializeHTML('<mark>highlighted</mark>')).toBe('<mark>highlighted</mark>');
    });
});
