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

    const img = new Image();
    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });

    const $canvas = document.createElement('canvas');
    $canvas.width = img.width;
    $canvas.height = img.height;
    const ctx = $canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return $canvas;
};

const canvasToBlob = (canvas, { type = 'image/webp', quality = 0.8 }) => {
    return new Promise((resolve, reject) => {
        try {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject();
                    }
                },
                type,
                quality
            );
        } catch (e) {
            reject(e);
        }
    });
};

const exportCanvasSized = async (
    origCanvas,
    fileName,
    maxFileSize,
    type,
    quality,
    isIOS
) => {
    let tempCanvas;
    let scale = 1;
    let step = 1;
    let lastFitBlob = null;

    if (isIOS) {
        scale = Math.min(1200 / origCanvas.width, 1200 / origCanvas.height, 1);
    }

    for (let i = 0; i < 10; i += 1) {
        await new Promise((resolve) => {
            setTimeout(resolve, 10);
        });

        if (typeof document !== 'undefined') {
            if (!tempCanvas) {
                tempCanvas = document.createElement('canvas');
                // eslint-disable-next-line no-loop-func
                tempCanvas.convertToBlob = (options) =>
                    canvasToBlob(tempCanvas, options);
            }
            tempCanvas.width = origCanvas.width * scale;
            tempCanvas.height = origCanvas.height * scale;
        } else if (typeof OffscreenCanvas === 'function') {
            postMessage({
                width: Math.round(origCanvas.width * scale),
                height: Math.round(origCanvas.height * scale),
                scale,
            });
            tempCanvas = new OffscreenCanvas(
                Math.round(origCanvas.width * scale),
                Math.round(origCanvas.height * scale)
            );
        } else {
            throw Error('offscreen canvas not supported');
        }

        if (isIOS) {
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

        // eslint-disable-next-line no-await-in-loop
        const blob = await tempCanvas.convertToBlob({ type, quality });
        const blobSize = blob?.size ?? maxFileSize + 1;
        if (blobSize > maxFileSize) {
            step *= 0.5;
            scale -= step;
        } else if (blobSize < maxFileSize) {
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

    return new File([lastFitBlob], fileName, { type });
};

const workerThread = () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = async (ev) => {
        const { file, maxFileSize, quality, isIOS } = ev.data;

        const bitmap = await createImageBitmap(file);
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);

        const type = file.type === 'image/jpg' ? 'image/jpg' : 'image/webp';

        try {
            const result = await exportCanvasSized(
                canvas,
                file.name,
                maxFileSize,
                type,
                quality,
                isIOS
            );
            postMessage({ success: true, file: result });
        } catch (e) {
            postMessage({ success: false, error: e });
        }
    };
};

const compressImage = async (file, maxFileSize, quality = 0.8) => {
    if (typeof OffscreenCanvas !== 'function') {
        const origCanvas = await blobToCanvas(file);
        const type = file.type === 'image/jpg' ? 'image/jpg' : 'image/webp';
        return exportCanvasSized(
            origCanvas,
            file.name,
            maxFileSize,
            type,
            quality,
            chayns.env.isIOS
        );
    }

    let workerScript = [exportCanvasSized]
        .map((f) => `const ${f.name} = ${f.toString()}`)
        .join('\n');

    workerScript += `\n(${workerThread.toString()})()`;

    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
        const worker = new Worker(url);
        worker.onmessage = (ev) => {
            if (typeof ev.data.success !== 'boolean') return;
            if (ev.data.success) {
                resolve(ev.data.file);
            } else {
                reject(ev.data.error);
            }
            worker.terminate();
        };

        worker.postMessage({
            file,
            maxFileSize,
            quality,
            isIOS: chayns.env.isIOS,
        });
    });
};

export default compressImage;
