/**
 * Reads an environment variable defensively so that accessing `process.env` does
 * not throw a `ReferenceError` in browser environments where `process` is not
 * defined. Returns `undefined` if the variable is not set or not accessible.
 */
const readEnv = (key: string): string | undefined => {
    try {
        if (typeof process !== 'undefined' && process.env) {
            const value = process.env[key];

            if (typeof value === 'string' && value.length > 0) {
                return value;
            }
        }
    } catch {
        // Accessing `process` can throw in some sandboxed environments.
    }

    return undefined;
};

/**
 * URL of the image service used to upload images.
 *
 * Can be overridden via the `CHAYNS_IMAGE_SERVICE_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted image service). Falls back
 * to the default chayns image service when the variable is not defined.
 */
export const IMAGE_SERVICE_API_V3_URL =
    process.env.CHAYNS_IMAGE_SERVICE_URL ?? 'https://cube.tobit.cloud/image-service/v3/Images';

/**
 * URL of the image resizer service used to upload images larger than 10 MB.
 *
 * Can be overridden via the `CHAYNS_IMAGE_RESIZER_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted image service). Falls back
 * to the default chayns image resizer when the variable is not defined.
 */
export const IMAGE_RESIZER_API_URL =
    process.env.CHAYNS_IMAGE_RESIZER_URL ??
    'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image';

/**
 * URL of the streaming service used to upload videos.
 *
 * Can be overridden via the `CHAYNS_VIDEO_SERVICE_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted video service). Falls back
 * to the default chayns streaming service when the variable is not defined.
 */
export const VIDEO_SERVICE_URL =
    process.env.CHAYNS_VIDEO_SERVICE_URL ?? 'https://streamingservice.chayns.space/video';
