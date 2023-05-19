/**
 * Uploads an image to the tsimg cloud service.
 *
 * @export
 * @param {string | File} file A URL as a string or a `File` object that should be uploaded.
 * @param {string} referenceId
 * @param {string} personId A person is that should be associated with the uploaded image.
 * @param {string} siteId A site id that should be associated with the uploaded image.
 * @param {string} [url='https://api.tsimg.cloud/image']
 * @return {Promise<object>} The response data for the image upload.
 */
export default async function imageUpload(
    file,
    referenceId,
    personId,
    siteId,
    url = 'https://api.tsimg.cloud/image'
) {
    const headers = new Headers({ Accept: 'application/json' });

    if (referenceId) headers.set('X-Reference-Id', referenceId);
    if (personId) headers.set('X-Person-Id', personId);
    if (siteId) headers.set('X-Site-Id', siteId);

    if (chayns.env.user.isAuthenticated) {
        headers.set(
            'Authorization',
            `bearer ${chayns.env.user.tobitAccessToken}`
        );
    }

    /** @type {string | ArrayBuffer} */
    let body;

    if (typeof file === 'string') {
        headers.set('Content-Type', 'application/json');
        body = JSON.stringify({ url: file });
    } else {
        headers.set('Content-Type', 'image/*');
        body = await getFileArrayBuffer(file);
    }

    const response = await fetch(url, { method: 'POST', body, headers });

    if (response.ok) {
        return response.json();
    }

    throw new Error(
        `Uploading the image failed with status code ${response.status}.`
    );
}

/**
 * Returns the array buffer for an input file.
 *
 * @param {File} file The input `File` object.
 * @return {Promise<string | ArrayBuffer>}
 */
function getFileArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result);
            } else {
                reject(Error('Could not get array buffer.'));
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
