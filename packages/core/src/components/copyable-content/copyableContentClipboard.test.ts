import { formatStringToHtml } from '@chayns-components/format';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyableContentToClipboard } from './copyableContentClipboard';

const source = '# Heading\n\n[Link](https://example.com)';

const readBlob = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(blob);
    });

describe('copyableContentToClipboard', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('writes exact source as plain text and markdown with safe HTML', async () => {
        const write = vi.spyOn(navigator.clipboard, 'write').mockResolvedValue();

        await copyableContentToClipboard(source);

        const item = write.mock.calls[0][0][0] as unknown as ClipboardItem;
        await expect(readBlob(await item.getType('text/plain'))).resolves.toBe(source);
        await expect(readBlob(await item.getType('text/markdown'))).resolves.toBe(source);
        await expect(readBlob(await item.getType('text/html'))).resolves.toBe(
            formatStringToHtml(source).html,
        );
    });

    it('uses a plain ClipboardItem when rich MIME types are unsupported', async () => {
        vi.stubGlobal('ClipboardItem', Object.assign(class {}, { supports: () => false }));
        const write = vi.spyOn(navigator.clipboard, 'write').mockResolvedValue();

        await copyableContentToClipboard(source);

        expect(write).toHaveBeenCalledTimes(1);
    });

    it('uses writeText after ClipboardItem writes fail', async () => {
        vi.spyOn(navigator.clipboard, 'write').mockRejectedValue(new Error('denied'));
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

        await copyableContentToClipboard(source);

        expect(writeText).toHaveBeenCalledWith(source);
    });
});
