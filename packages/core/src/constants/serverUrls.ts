/**
 * URL of the image service used to upload images.
 *
 * Can be overridden via the `PUBLIC_IMAGE_SERVICE_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted image service). The
 * variable is expected to be substituted for its value by a pre-deploy
 * script that replaces literal `process.env.PUBLIC_IMAGE_SERVICE_URL`
 * occurrences with a quoted string, mirroring the approach used in the
 * chayns-threads project.
 *
 * Accessing `process` is wrapped in a try/catch so that a `ReferenceError`
 * thrown in environments where the substitution did not run and `process`
 * is not defined (e.g. in the browser) is swallowed, falling back to the
 * default chayns image service instead. Unlike a `typeof process` guard,
 * this does not suppress an already-substituted literal value at runtime,
 * since that value no longer depends on `process` being defined.
 */
export const IMAGE_SERVICE_URL = ((): string => {
    try {
        return (
            process.env.PUBLIC_IMAGE_SERVICE_URL ??
            'https://cube.tobit.cloud/image-service/v3/Images'
        );
    } catch {
        return 'https://cube.tobit.cloud/image-service/v3/Images';
    }
})();

/**
 * URL of the image resizer service used to upload images larger than 10 MB.
 *
 * Can be overridden via the `PUBLIC_IMAGE_RESIZER_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted image service). See
 * {@link IMAGE_SERVICE_URL} for details on the substitution mechanism.
 */
export const IMAGE_RESIZER_URL = ((): string => {
    try {
        return (
            process.env.PUBLIC_IMAGE_RESIZER_URL ??
            'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image'
        );
    } catch {
        return 'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image';
    }
})();

/**
 * URL of the streaming service used to upload videos.
 *
 * Can be overridden via the `PUBLIC_VIDEO_SERVICE_URL` environment variable
 * (e.g. for OnPremise deployments with a self-hosted video service). See
 * {@link IMAGE_SERVICE_URL} for details on the substitution mechanism.
 */
export const VIDEO_SERVICE_URL = ((): string => {
    try {
        return (
            process.env.PUBLIC_VIDEO_SERVICE_URL ?? 'https://streamingservice.chayns.space/video'
        );
    } catch {
        return 'https://streamingservice.chayns.space/video';
    }
})();
