/**
 * URLs of the services used to upload images and videos.
 */
export interface UploadUrls {
    /**
     * URL of the image service used to upload images.
     */
    imageServiceUrl: string;
    /**
     * URL of the image resizer service used to upload images larger than 10 MB.
     */
    imageResizerUrl: string;
    /**
     * URL of the streaming service used to upload videos.
     */
    videoServiceUrl: string;
}

/**
 * Default chayns upload service URLs that are used when no custom URLs have
 * been configured via {@link setUploadUrls}.
 */
export const DEFAULT_UPLOAD_URLS: UploadUrls = {
    imageServiceUrl: 'https://cube.tobit.cloud/image-service/v3/Images',
    imageResizerUrl: 'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image',
    videoServiceUrl: 'https://streamingservice.chayns.space/video',
};

let configuredUploadUrls: UploadUrls = { ...DEFAULT_UPLOAD_URLS };

/**
 * Overrides the URLs of the services used to upload images and videos, e.g. for
 * OnPremise deployments with self-hosted services.
 *
 * This has to be called once during the startup of the consuming application,
 * before an upload is triggered. Environment variables cannot be used inside
 * this package, because it is bundled before the consuming application is built
 * and therefore no longer contains replaceable `process.env` references.
 *
 * Only the URLs that are passed are overridden, all others keep their current
 * value.
 *
 * @example
 * ```ts
 * setUploadUrls({
 *     imageServiceUrl: process.env.PUBLIC_IMAGE_SERVICE_URL,
 *     imageResizerUrl: process.env.PUBLIC_IMAGE_RESIZER_URL,
 *     videoServiceUrl: process.env.PUBLIC_VIDEO_SERVICE_URL,
 * });
 * ```
 */
export const setUploadUrls = (urls?: Partial<UploadUrls>): void => {
    if (!urls) {
        return;
    }

    configuredUploadUrls = {
        imageServiceUrl: urls.imageServiceUrl ?? configuredUploadUrls.imageServiceUrl,
        imageResizerUrl: urls.imageResizerUrl ?? configuredUploadUrls.imageResizerUrl,
        videoServiceUrl: urls.videoServiceUrl ?? configuredUploadUrls.videoServiceUrl,
    };
};

/**
 * Returns the currently configured upload service URLs, optionally merged with
 * the given overrides. Overrides take precedence over the globally configured
 * URLs, which in turn take precedence over {@link DEFAULT_UPLOAD_URLS}.
 */
export const getUploadUrls = (overrides?: Partial<UploadUrls>): UploadUrls => {
    if (!overrides) {
        return configuredUploadUrls;
    }

    return {
        imageServiceUrl: overrides.imageServiceUrl ?? configuredUploadUrls.imageServiceUrl,
        imageResizerUrl: overrides.imageResizerUrl ?? configuredUploadUrls.imageResizerUrl,
        videoServiceUrl: overrides.videoServiceUrl ?? configuredUploadUrls.videoServiceUrl,
    };
};

/**
 * Resets the upload service URLs to {@link DEFAULT_UPLOAD_URLS}.
 */
export const resetUploadUrls = (): void => {
    configuredUploadUrls = { ...DEFAULT_UPLOAD_URLS };
};
