import { afterEach, describe, expect, it } from 'vitest';
import { DEFAULT_UPLOAD_URLS, getUploadUrls, resetUploadUrls, setUploadUrls } from './uploadUrls';

describe('uploadUrls', () => {
    afterEach(() => {
        resetUploadUrls();
    });

    it('returns the default urls when nothing has been configured', () => {
        expect(getUploadUrls()).toEqual(DEFAULT_UPLOAD_URLS);
    });

    it('overrides only the urls that are passed', () => {
        setUploadUrls({ imageServiceUrl: 'https://onprem.local/img' });

        expect(getUploadUrls()).toEqual({
            ...DEFAULT_UPLOAD_URLS,
            imageServiceUrl: 'https://onprem.local/img',
        });
    });

    it('keeps the configured url when an undefined value is passed', () => {
        setUploadUrls({ videoServiceUrl: 'https://onprem.local/video' });
        setUploadUrls({ videoServiceUrl: undefined });

        expect(getUploadUrls().videoServiceUrl).toBe('https://onprem.local/video');
    });

    it('ignores an undefined configuration', () => {
        setUploadUrls({ imageResizerUrl: 'https://onprem.local/resizer' });
        setUploadUrls(undefined);

        expect(getUploadUrls().imageResizerUrl).toBe('https://onprem.local/resizer');
    });

    it('prefers the given overrides over the configured urls', () => {
        setUploadUrls({ imageServiceUrl: 'https://onprem.local/img' });

        expect(getUploadUrls({ imageServiceUrl: 'https://call.local/img' }).imageServiceUrl).toBe(
            'https://call.local/img',
        );
    });

    it('does not change the configured urls when overrides are given', () => {
        setUploadUrls({ imageServiceUrl: 'https://onprem.local/img' });
        getUploadUrls({ imageServiceUrl: 'https://call.local/img' });

        expect(getUploadUrls().imageServiceUrl).toBe('https://onprem.local/img');
    });

    it('resets the urls back to the defaults', () => {
        setUploadUrls({
            imageServiceUrl: 'https://onprem.local/img',
            imageResizerUrl: 'https://onprem.local/resizer',
            videoServiceUrl: 'https://onprem.local/video',
        });
        resetUploadUrls();

        expect(getUploadUrls()).toEqual(DEFAULT_UPLOAD_URLS);
    });
});
