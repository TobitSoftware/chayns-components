import { formatStringToHtml } from '@chayns-components/format';

interface ClipboardContent {
    html: string;
    plainText: string;
}

const getPlainTextFromHtml = (html: string) => {
    const document = new DOMParser().parseFromString(html, 'text/html');

    return Array.from(document.body.children)
        .map((element) => {
            if (element.tagName === 'UL' || element.tagName === 'OL') {
                return Array.from(element.children)
                    .map((item) => `• ${item.textContent?.trim() ?? ''}`)
                    .join('\n');
            }

            return element.textContent?.trim() ?? '';
        })
        .filter(Boolean)
        .join('\n\n');
};

const createClipboardContent = (source: string): ClipboardContent => {
    const { html } = formatStringToHtml(source);
    return { html, plainText: getPlainTextFromHtml(html) };
};

const copyWithClipboardItem = async ({ html, plainText }: ClipboardContent) => {
    const clipboardData = new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([html], { type: 'text/html' }),
    });

    await navigator.clipboard.write([clipboardData]);
};

const copyPlainText = async (plainText: string) => {
    if (typeof ClipboardItem !== 'undefined') {
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([plainText], { type: 'text/plain' }),
                }),
            ]);
            return;
        } catch {
            // Use writeText as the final browser-compatible fallback.
        }
    }

    await navigator.clipboard.writeText(plainText);
};

export const copyableContentToClipboard = async (source: string) => {
    const clipboardContent = createClipboardContent(source);

    if (!navigator.clipboard) {
        throw new Error('Clipboard API is not available.');
    }

    if (typeof ClipboardItem === 'undefined') {
        await copyPlainText(clipboardContent.plainText);
        return;
    }

    try {
        await copyWithClipboardItem(clipboardContent);
    } catch {
        // Use the plain-text fallback when the browser rejects rich MIME types.
        await copyPlainText(clipboardContent.plainText);
    }
};
