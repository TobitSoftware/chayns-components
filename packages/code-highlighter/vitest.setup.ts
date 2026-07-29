import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

Object.assign(globalThis, {
    ResizeObserver: class {
        disconnect() {}
        observe() {}
        unobserve() {}
    },
});

Object.assign(navigator, {
    clipboard: {
        writeText: async () => undefined,
    },
});

afterEach(cleanup);
