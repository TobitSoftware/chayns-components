import { formatStringToHtml } from '@chayns-components/format';

const RICH_MIME_TYPES = ['text/plain', 'text/markdown', 'text/html'] as const;

const createClipboardItem = (data: Record<string, Blob>) => new ClipboardItem(data);

const supportsRichMimeTypes = () => {
    if (typeof ClipboardItem === 'undefined' || typeof ClipboardItem.supports !== 'function') {
        return true;
    }

    return RICH_MIME_TYPES.every((mimeType) => ClipboardItem.supports(mimeType));
};

const copyPlainText = async (source: string) => {
    if (typeof ClipboardItem !== 'undefined') {
        try {
            await navigator.clipboard.write([
                createClipboardItem({ 'text/plain': new Blob([source], { type: 'text/plain' }) }),
            ]);
            return;
        } catch {
            // Use writeText as the final browser-compatible fallback.
        }
    }

    await navigator.clipboard.writeText(source);
};

export const copyableContentToClipboard = async (source: string) => {
    if (!navigator.clipboard) {
        throw new Error('Clipboard API is not available.');
    }

    if (typeof ClipboardItem === 'undefined' || !supportsRichMimeTypes()) {
        await copyPlainText(source);
        return;
    }

    const { html } = formatStringToHtml(source);

    try {
        await navigator.clipboard.write([
            createClipboardItem({
                'text/plain': new Blob([source], { type: 'text/plain' }),
                'text/markdown': new Blob([source], { type: 'text/markdown' }),
                'text/html': new Blob([html], { type: 'text/html' }),
            }),
        ]);
    } catch {
        await copyPlainText(source);
    }
};
