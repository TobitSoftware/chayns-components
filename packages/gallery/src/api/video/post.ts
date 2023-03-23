import { VIDEO_STORAGE_BASE_URL } from '../../constants/externalServerUrl';
import type { ApiFunctionResult } from '../../types/api';

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

export const postVideo = async ({
    accessToken,
    file,
}: PostVideoOptions): Promise<ApiFunctionResult<PostVideoResult>> => {
    const formData = new FormData();

    formData.append('files', file);

    const requestInit: RequestInit = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: formData,
    };

    const url = `${VIDEO_STORAGE_BASE_URL}/video?disableIntercom=true`;

    const response = await fetch(url, requestInit);

    if (response.status === 202) {
        const data = (await response.json()) as PostVideoResult;

        return { data, status: 202 };
    }

    return { status: response.status };
};
