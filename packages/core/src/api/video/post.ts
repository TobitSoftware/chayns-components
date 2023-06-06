export interface PostVideoResult {
    id: string;
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
}: PostVideoOptions): Promise<PostVideoResult | undefined> => {
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
        const data = (await response.json()) as PostVideoResult[];

        return data[0];
    }

    throw Error(`Failed to POST video (status code: ${response.status}).`);
};
