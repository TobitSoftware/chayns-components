import { getAccessToken } from 'chayns-api';

export interface PostVideoResult {
    id: string;
    originalVideoQuality: string;
    thumbnailUrl: string;
    url: string;
    urlMP4: string;
}

interface PostVideoOptions {
    file: File | Blob;
}

/**
 * Uploads a video to the streaming service
 */
export const postVideo = async ({
    file,
}: PostVideoOptions): Promise<PostVideoResult | undefined> => {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
        return undefined;
    }

    const formData = new FormData();

    formData.append('files', file);

    const response = await fetch(
        'https://streamingservice.chayns.space/video?disableIntercom=true',
        {
            body: formData,
            headers: {
                Authorization: `bearer ${accessToken}`,
            },
            method: 'POST',
        },
    );

    if (response.ok) {
        const data = (await response.json()) as PostVideoResult[];

        return data[0];
    }

    throw Error(`Failed to POST video (status code: ${response.status}).`);
};
