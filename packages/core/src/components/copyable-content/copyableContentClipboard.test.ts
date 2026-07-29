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
        vi.unstubAllGlobals();
    });

    it('writes readable plain text first and safe HTML second', async () => {
        const write = vi.spyOn(navigator.clipboard, 'write').mockResolvedValue();

        await copyableContentToClipboard(source);

        const item = write.mock.calls[0][0][0] as unknown as ClipboardItem & {
            items: Record<string, Blob>;
        };
        expect(Object.keys(item.items)).toEqual(['text/plain', 'text/html']);
        await expect(readBlob(await item.getType('text/plain'))).resolves.toBe('Heading\n\nLink');
        await expect(readBlob(await item.getType('text/html'))).resolves.toBe(
            formatStringToHtml(source).html,
        );
    });

    it('uses a plain ClipboardItem after a rejected rich write', async () => {
        const write = vi
            .spyOn(navigator.clipboard, 'write')
            .mockRejectedValueOnce(new Error('denied'))
            .mockResolvedValueOnce();
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

        await copyableContentToClipboard(source);

        expect(write).toHaveBeenCalledTimes(2);
        expect(writeText).not.toHaveBeenCalled();
        const item = write.mock.calls[1][0][0] as unknown as ClipboardItem & {
            items: Record<string, Blob>;
        };
        expect(Object.keys(item.items)).toEqual(['text/plain']);
        await expect(readBlob(await item.getType('text/plain'))).resolves.toBe('Heading\n\nLink');
    });

    it('uses writeText after all ClipboardItem writes fail', async () => {
        vi.spyOn(navigator.clipboard, 'write').mockRejectedValue(new Error('denied'));
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

        await copyableContentToClipboard(source);

        expect(writeText).toHaveBeenCalledWith('Heading\n\nLink');
    });

    it('uses writeText when ClipboardItem is unavailable', async () => {
        vi.stubGlobal('ClipboardItem', undefined);
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

        await copyableContentToClipboard(source);

        expect(writeText).toHaveBeenCalledWith('Heading\n\nLink');
    });
});
