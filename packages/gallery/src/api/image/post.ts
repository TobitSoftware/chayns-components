import type { Meta } from '../../types/file';
import { getFileAsArrayBuffer } from '../../utils/file';

export interface PostImageResult {
    key: string;
    base: string;
    meta?: Meta;
}

interface PostImageOptions {
    accessToken: string;
    file: File;
    personId: string;
}

/**
 * Uploads an image to the tsimg cloud service
 */
export const postImage = async ({
    accessToken,
    file,
    personId,
}: PostImageOptions): Promise<PostImageResult> => {
    const body = await getFileAsArrayBuffer(file);

    const response = await fetch('https://api.tsimg.cloud/image', {
        body,
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
            'Content-Type': 'image/*',
            'X-Person-Id': personId,
        },
        method: 'POST',
    });

    if (response.ok) {
        return (await response.json()) as PostImageResult;
    }

    throw Error(`Failed to POST image (status code: ${response.status}).`);
};
