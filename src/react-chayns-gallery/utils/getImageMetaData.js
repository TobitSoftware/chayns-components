export async function getImageMetaDataFromApi(url) {
    const response = await fetch(url, {
        method: 'HEAD',
    });

    const height = parseInt(response.headers.get('x-amz-meta-height'), 10);
    const width = parseInt(response.headers.get('x-amz-meta-width'), 10);

    if (height && width) {
        return {
            height,
            width,
        };
    }

    throw new Error();
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
