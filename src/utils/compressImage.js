const blobToDataUrl = (blob) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = (e) => {
            resolve(e.target.result);
        };
        fr.onerror = (e) => {
            reject(e);
        };
        fr.readAsDataURL(blob);
    });
};

const blobToCanvas = async (blob) => {
    const url = await blobToDataUrl(blob);

    const $img = document.createElement('img');
    await new Promise((resolve, reject) => {
        $img.onload = resolve;
        $img.onerror = reject;
        $img.src = url;
    });

    const $canvas = document.createElement('canvas');
    $canvas.width = $img.width;
    $canvas.height = $img.height;
    const ctx = $canvas.getContext('2d');
    ctx.drawImage($img, 0, 0);

    return $canvas;
};

const canvasToBlob = (canvas, quality = 0.8) => {
    return new Promise((resole) => {
        canvas.toBlob(resole, 'image/webp', quality);
    });
};

export const compressImage = async (file, maxFileSize, quality) => {
    const origCanvas = await blobToCanvas(file);
    const tempCanvas = document.createElement('canvas');
    let scale = 1;
    let step = 1;
    let lastFitScale = null;
    let lastFitBlob = null;

    if (chayns.env.isIOS) {
        scale = Math.min(1200 / origCanvas.width, 1200 / origCanvas.height, 1);
    }

    for (let i = 0; i < 10; i += 1) {
        await new Promise((resolve) => {
            setTimeout(resolve, 10);
        }); /* eslint-disable-line no-await-in-loop */

        tempCanvas.width = origCanvas.width * scale;
        tempCanvas.height = origCanvas.height * scale;

        if (chayns.env.isIOS) {
            if (tempCanvas.width > 1200 || tempCanvas.height > 1200) break;
        }

        tempCanvas
            .getContext('2d')
            .drawImage(
                origCanvas,
                0,
                0,
                origCanvas.width,
                origCanvas.height,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
            );

        const blob = await canvasToBlob(
            tempCanvas,
            quality
        ); /* eslint-disable-line no-await-in-loop */
        const blobSize = blob.size;
        if (blobSize > maxFileSize) {
            step *= 0.5;
            scale -= step;
        } else if (blobSize < maxFileSize) {
            lastFitScale = scale;
            lastFitBlob = blob;

            if (scale === 1) {
                break;
            }

            if (blobSize > maxFileSize * 0.8) {
                break;
            }

            step *= 0.5;
            scale += step;
        }
    }

    if (!lastFitBlob) {
        throw new Error(
            'failed to compress image down to maxFileSize within 10 iterations'
        );
    }

    return new File([lastFitBlob], file.filename, { type: 'image/webp' });
};
