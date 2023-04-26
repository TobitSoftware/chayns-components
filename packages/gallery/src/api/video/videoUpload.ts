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
 * Uploads a video to the chayns.space
 */
export const videoUpload = async ({
    accessToken,
    file,
}: PostVideoOptions): Promise<PostVideoResult> => {
    const formData = new FormData();

    formData.append('files', file);

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: formData,
    };

    const url = `https://streamingservice.chayns.space/video?disableIntercom=true`;

    const response = await fetch(url, requestInit);

    if (response.status === 202) {
        return (await response.json()) as PostVideoResult;
    }

    throw Error(`Uploading the Video failed with status code ${response.status}.`);
};
