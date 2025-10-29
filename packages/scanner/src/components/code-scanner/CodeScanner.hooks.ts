import { useCallback, useEffect, useRef, useState } from 'react';
import { loadScript } from '../../utils/script';

const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

export default usePrevious;

const VERSION = 1;

let scannerPolyfillPromise: Promise<Event | UIEvent> | undefined;
let scannerWasmPromise: Promise<Event | UIEvent> | undefined;

const loadPolyfillScript = () => {
    if (!scannerPolyfillPromise) {
        scannerPolyfillPromise = loadScript(
            `https://api.chayns-static.space/polyfill/CodeScanner/v${VERSION}/barcode-detector-polyfill.js`,
        );
    }

    return scannerPolyfillPromise;
};

const loadWasmScript = () => {
    if (!scannerWasmPromise) {
        scannerWasmPromise = loadScript(
            `https://api.chayns-static.space/polyfill/CodeScanner/v${VERSION}/zbar-wasm.js`,
        );
    }

    return scannerWasmPromise;
};

export const useScannerPolyfill = () => {
    const [wasmLoaded, setWasmLoaded] = useState(false);
    const [polyfillLoaded, setPolyfillLoaded] = useState(false);

    const loadQrCodeDetector = useCallback(async () => {
        try {
            await BarcodeDetector.getSupportedFormats();
        } catch {
            await loadWasmScript().then(() => setWasmLoaded(true));
            await loadPolyfillScript().then(() => setPolyfillLoaded(true));
            // @ts-expect-error polyfill is not defined in window
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            window.BarcodeDetector = barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
        }
    }, []);

    return { loadQrCodeDetector, loaded: polyfillLoaded && wasmLoaded };
};
