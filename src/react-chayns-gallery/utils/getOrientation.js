/**
 * This function returns the exif orientation data.
 * Idea from http://stackoverflow.com/a/32490603.
 *
 * @param file - The file that should be checked
 * @returns Promise(resolve: {exifOrientationCode, rotation, mirrored})
 */
export default async function getOrientation(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const view = new DataView(event.target.result);

            if (view.getUint16(0, false) !== 0xFFD8) return resolve(null);

            const length = view.byteLength;
            let offset = 2;

            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;

                if (marker === 0xFFE1) {
                    // eslint-disable-next-line no-cond-assign
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        return resolve(null);
                    }
                    const little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;

                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            const exifOrientationCode = view.getUint16(offset + (i * 12) + 8, little);
                            let rotation = 0;
                            if (exifOrientationCode > 6) {
                                rotation = 90;
                            } else if (exifOrientationCode > 4) {
                                rotation = 270;
                            } else if (exifOrientationCode > 2) {
                                rotation = 180;
                            }
                            return resolve({
                                exifOrientationCode,
                                rotation,
                                mirrored: [2, 4, 5, 7].indexOf(exifOrientationCode) >= 0,
                            });
                        }
                    }
                    // eslint-disable-next-line no-bitwise
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return resolve(null);
        };

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
}
