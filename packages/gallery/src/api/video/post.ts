export interface PostVideoResult {
    id: number;
    originalVideoQuality: string;
    thumbnailUrl: string;
    url: string;
    urlMP4: string;
}

interface PostVideoOptions {
    accessToken: string;
    file: File | Blob;
}

/**
 * Uploads a video to the streaming service
 */
export const postVideo = async ({
    accessToken,
    file,
}: PostVideoOptions): Promise<PostVideoResult> => {
    const formData = new FormData();

    formData.append('files', file);
    const response = await fetch(
        'https://streamingservice.chayns.space/video?disableIntercom=true',
        {
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
        }
    );

    if (response.ok) {
        return (await response.json()) as PostVideoResult;
    }

    throw Error(`Failed to POST video (status code: ${response.status}).`);
};
