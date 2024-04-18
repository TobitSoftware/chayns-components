import { getAccessToken, getSite, getUser } from 'chayns-api';
import type { Meta } from '../../types/file';
import { getFileAsArrayBuffer } from '../../utils/fileDialog';

export interface PostImageResult {
    key: string;
    base: string;
    meta?: Meta;
}

interface PostImageOptions {
    file: File;
    shouldUploadImageToSite?: boolean;
}

/**
 * Uploads an image to the tsimg cloud service
 */
export const postImage = async ({
    file,
    shouldUploadImageToSite,
}: PostImageOptions): Promise<PostImageResult | undefined> => {
    const { accessToken } = await getAccessToken();
    const user = getUser();
    const site = getSite();

    if (!accessToken || !user?.personId) {
        return undefined;
    }

    let head: { [key: string]: string } = { 'X-Person-Id': user.personId };

    if (shouldUploadImageToSite && site.id) {
        head = { 'X-Site-Id': site.id };
    }

    const body = await getFileAsArrayBuffer(file);

    const response = await fetch('https://api.tsimg.cloud/image', {
        body,
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
            'Content-Type': 'image/*',
            ...head,
        },
        method: 'POST',
    });

    if (response.ok) {
        return (await response.json()) as PostImageResult;
    }

    throw Error(`Failed to POST image (status code: ${response.status}).`);
};
