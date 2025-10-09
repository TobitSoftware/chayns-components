import { loadScript } from './loadScript';

export const loadQrCodeDetector = async () => {
    try {
        await BarcodeDetector.getSupportedFormats();
    } catch {
        await loadScript('');
        await loadScript('');
        // @ts-expect-error polyfill is not defined in window
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        window.BarcodeDetector = barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
    }
};
