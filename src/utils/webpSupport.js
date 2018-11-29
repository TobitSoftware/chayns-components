let webpSupport = null;

/**
 * Tests if browser supports webp images.
 * @returns {Promise<>} - Promise is resolved when browser supports webp.
 */
export default function browserSupportsWebp() {
    return new Promise((resolve, reject) => {
        if (webpSupport === 3) {
            resolve(webpSupport);
        } else if (chayns.utils.isNumber(webpSupport) && webpSupport < 3) {
            reject(webpSupport);
        } else {
            const testImages = [
                'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
                'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
                'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=='
            ];
            let supportCounter = 0;
            testImages.forEach((image, index) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > 0 && img.height > 0) {
                        supportCounter += 1;
                        if (index === testImages.length - 1) {
                            webpSupport = supportCounter;
                            resolve(supportCounter);
                        }
                    } else if (index === testImages.length - 1) {
                        webpSupport = supportCounter;
                        reject(supportCounter);
                    }
                };
                img.onerror = () => {
                    if (index === testImages.length - 1) {
                        webpSupport = supportCounter;
                        reject(supportCounter);
                    }
                };
                img.src = `data:image/webp;base64,${image}`;
            });
        }
    });
}
