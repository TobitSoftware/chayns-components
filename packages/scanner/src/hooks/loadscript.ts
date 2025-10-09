import { useState } from 'react';
import { loadScript } from '../utils/loadScript';

let scannerPolyfillPromise: Promise<Event | UIEvent> | undefined;
let scannerWasmPromise: Promise<Event | UIEvent> | undefined;

const loadPolyfillScript = () => {
    if (!scannerPolyfillPromise) {
        scannerPolyfillPromise = loadScript('');
    }

    return scannerPolyfillPromise;
};

const loadWasmScript = () => {
    if (!scannerWasmPromise) {
        scannerWasmPromise = loadScript('');
    }

    return scannerWasmPromise;
};

export const useScannerPolyfill = () => {
    const [wasmLoaded, setWasmLoaded] = useState(false);
    const [polyfillLoaded, setPolyfillLoaded] = useState(false);

    const loadQrCodeDetector = async () => {
        try {
            await BarcodeDetector.getSupportedFormats();
        } catch {
            void loadWasmScript().then(() => setWasmLoaded(true));
            void loadPolyfillScript().then(() => setPolyfillLoaded(true));
            // @ts-expect-error polyfill is not defined in window
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            window.BarcodeDetector = barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
        }
    };

    return { loadQrCodeDetector, loaded: polyfillLoaded && wasmLoaded };
};
