import { isString } from './is';

export default async function imageUpload(file, referenceId, personId, siteId, url = 'https://api.tsimg.cloud/image') {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            const headers = {
                Accept: 'application/json',
            };
            if (referenceId) {
                headers['X-Reference-Id'] = referenceId;
            }
            if (personId) {
                headers['X-Person-Id'] = personId;
            }
            if (siteId) {
                headers['X-Site-Id'] = siteId;
            }
            if (chayns.env.user.isAuthenticated) {
                headers.Authorization = `bearer ${chayns.env.user.tobitAccessToken}`;
            }

            const uploadFunction = async (body) => {
                const response = await fetch(url, {
                    method: 'POST',
                    body,
                    headers,
                });
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                } else {
                    reject(response.status);
                }
            };

            if (isString(file)) {
                headers['Content-Type'] = 'application/json';
                uploadFunction(JSON.stringify({ url: file }));
            } else {
                headers['Content-Type'] = 'image/*';

                const reader = new FileReader();
                reader.onload = (e) => uploadFunction(e.target.result);
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            }
        } catch (err) {
            reject(err);
        }
    });
}
