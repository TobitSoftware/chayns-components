import { getAccessToken, getSite, getUser } from 'chayns-api';
import type { Meta } from '../../types/file';

export interface PostImageResult {
    key: string;
    base: string;
    meta?: Meta;
}

interface Result {
    requestId: string;
    image: Image;
    baseDomain: string;
    signature: Signature;
}

export interface Image {
    path: string;
    width: number;
    height: number;
    size: number;
    hash: string;
    preview: string;
    isSecured: boolean;
    format: string;
    fileExtension: string;
}

export interface Signature {
    verify: string;
    signature: string;
    expires: Date;
}

interface PostImageOptions {
    file: File;
    shouldUploadImageToSite?: boolean;
}

const IMAGE_SERVICE_API_V3_URL = 'https://cube.tobit.cloud/image-service/v3/Images';
const IMAGE_RESIZER_API_URL = 'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image';

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

    // const body = await getFileAsArrayBuffer(file);

    const body = new FormData();

    body.append('File', file);

    const url =
        file.size > 10 * 1024 * 1024
            ? `${IMAGE_RESIZER_API_URL}/${shouldUploadImageToSite ? site.id : user.personId}`
            : `${IMAGE_SERVICE_API_V3_URL}/${shouldUploadImageToSite ? site.id : user.personId}`;

    const response = await fetch(url, {
        body,
        headers: {
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
        },
        method: 'POST',
    });

    if (response.ok) {
        const { image, baseDomain } = (await response.json()) as Result;
        // Maps image-service-api-v3 result to v2 result.
        return {
            key: image.path,
            // Removes trailing slash from baseDomain, since image-service-api-v2 doesn't have a trailing slash on base.
            base: baseDomain.endsWith('/') ? baseDomain.slice(0, -1) : baseDomain,
            meta: {
                preview: image.preview,
                width: String(image.width),
                height: String(image.height),
            },
        };
    }

    throw Error(`Failed to POST image (status code: ${response.status}).`);
};
