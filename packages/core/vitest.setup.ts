import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

class ClipboardItemPolyfill {
    static supports = () => true;

    constructor(public readonly items: Record<string, Blob>) {}

    getType(type: string) {
        return Promise.resolve(this.items[type]!);
    }
}

Object.assign(globalThis, {
    ClipboardItem: ClipboardItemPolyfill,
    ResizeObserver: class {
        disconnect() {}
        observe() {}
        unobserve() {}
    },
});

Object.assign(navigator, {
    clipboard: {
        write: async () => undefined,
        writeText: async () => undefined,
    },
});

afterEach(cleanup);
