export async function getImageMetaDataFromApi(url) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url, {
            method: 'HEAD',
        });
        if (response.status === 200) {
            resolve({
                height: parseInt(response.headers.get('x-amz-meta-height'), 10),
                width: parseInt(response.headers.get('x-amz-meta-width'), 10),
                preview: response.headers.get('x-amz-meta-preview'),
            });
        } else {
            reject(response.status);
        }
    });
}

export function getImageMetaDataFromPreview(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = new Image();
            image.src = url;
            image.onload = () => {
                const height = image.naturalHeight;
                const width = image.naturalWidth;
                if (height && width) {
                    resolve({ height, width });
                } else {
                    reject();
                }
            };
        } catch (err) {
            reject(err);
        }
    });
}
