import { getAccessToken } from 'chayns-api';
import { getUploadUrls, type UploadUrls } from '../../config/uploadUrls';

export interface PostVideoResult {
    id: string;
    originalVideoQuality: string;
    thumbnailUrl: string;
    url: string;
    urlMP4: string;
}

interface PostVideoOptions {
    file: File | Blob;
    /**
     * Overrides the globally configured upload service URLs for this upload.
     */
    uploadUrls?: Partial<UploadUrls>;
}

/**
 * Uploads a video to the streaming service
 */
export const postVideo = async ({
    file,
    uploadUrls,
}: PostVideoOptions): Promise<PostVideoResult | undefined> => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    const formData = new FormData();

    formData.append('files', file);

    const { videoServiceUrl } = getUploadUrls(uploadUrls);

    const response = await fetch(`${videoServiceUrl}?disableIntercom=true`, {
        body: formData,
        headers: {
            Authorization: `bearer ${accessToken}`,
        },
        method: 'POST',
    });

    if (response.ok) {
        const data = (await response.json()) as PostVideoResult[];

        return data[0];
    }

    throw Error(`Failed to POST video (status code: ${response.status}).`);
};
