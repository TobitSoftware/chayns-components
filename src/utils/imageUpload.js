const IMAGE_SERVICE_API_V3_URL =
    'https://cube.tobit.cloud/image-service/v3/Images';
const IMAGE_RESIZER_API_URL =
    'https://cube.tobit.cloud/image-resizer-backend/api/v1.0/image';

/**
 * Uploads an image to the tsimg cloud service.
 *
 * @export
 * @param {string | File} file A URL as a string or a `File` object that should be uploaded.
 * @param {object} options object
 * @param {string} [options.personId] A person is that should be associated with the uploaded image.
 * @param {string} [options.siteId] A site id that should be associated with the uploaded image.
 * @param {string} [options.accessToken=chayns.env.user.tobitAccessToken] The tobitAccessToken
 * @param {string} _personId A person is that should be associated with the uploaded image. (deprecated, use options instead)
 * @param {string} _siteId A site id that should be associated with the uploaded image. (deprecated, use options instead)
 * @return {Promise<object>} The response data for the image upload.
 */
export default async function imageUpload(file, options, _personId, _siteId) {
    const headers = new Headers({ Accept: 'application/json' });

    let personId;
    let siteId;
    let accessToken;
    if (options && typeof options === 'object') {
        ({ personId, siteId, accessToken } = options);
    } else {
        personId = _personId;
        siteId = _siteId;
    }

    if (
        !accessToken &&
        typeof chayns !== 'undefined' &&
        chayns?.env?.user?.isAuthenticated
    ) {
        accessToken = chayns.env.user.tobitAccessToken;
    }

    if (!personId) {
        personId = chayns.env.user.personId;
    }

    const owner = siteId || personId;

    if (accessToken) headers.set('Authorization', `bearer ${accessToken}`);

    // Build formData object.
    const body = new FormData();
    if (typeof file === 'string') {
        body.append('SourceUrl', file);
    } else {
        body.append('File', file);
    }

    const url =
        file.size > 10 * 1024 * 1024
            ? `${IMAGE_RESIZER_API_URL}/${owner}`
            : `${IMAGE_SERVICE_API_V3_URL}/${owner}`;

    const response = await fetch(url, { method: 'POST', body, headers });

    if (response.ok) {
        return response.json();
    }

    throw new Error(
        `Uploading the image failed with status code ${response.status}.`
    );
}
