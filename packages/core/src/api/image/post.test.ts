import { afterEach, describe, expect, it, vi } from 'vitest';
import { resetUploadUrls } from '../../config/uploadUrls';
import { postImage } from './post';

vi.mock('chayns-api', () => ({
    getAccessToken: vi.fn().mockResolvedValue({ accessToken: 'access-token' }),
    getSite: vi.fn().mockReturnValue({ id: 'site-id' }),
    getUser: vi.fn().mockReturnValue({ personId: 'person-id' }),
}));

describe('postImage', () => {
    afterEach(() => {
        resetUploadUrls();
        vi.unstubAllGlobals();
    });

    it('uses an explicitly provided upload path instead of the default user path', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                baseDomain: 'https://tsimg.cloud/',
                image: {
                    path: 'image-path',
                    preview: 'preview',
                    width: 1,
                    height: 1,
                },
            }),
        });
        vi.stubGlobal('fetch', fetchMock);

        await postImage({
            file: new File(['image'], 'image.png', { type: 'image/png' }),
            uploadPath: 'threads/thread-id',
        });

        expect(fetchMock).toHaveBeenCalledWith(
            'https://cube.tobit.cloud/image-service/v3/Images/threads/thread-id',
            expect.objectContaining({ method: 'POST' }),
        );
    });
});
