import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Truncation from './Truncation';

vi.mock('@chayns-components/textstring', () => ({
    Textstring: () => 'Mehr anzeigen',
    TextstringProvider: ({ children }: { children: React.ReactNode }) => children,
    ttsToITextString: vi.fn(),
}));

type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

const resizeObserverCallbacks: ResizeObserverCallback[] = [];

class ResizeObserverMock {
    constructor(callback: ResizeObserverCallback) {
        resizeObserverCallbacks.push(callback);
    }

    disconnect() {}

    observe() {}

    unobserve() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const triggerResize = (height: number) => {
    resizeObserverCallbacks.forEach((callback) => {
        callback([
            {
                contentRect: { height } as DOMRectReadOnly,
            } as ResizeObserverEntry,
        ]);
    });
};

afterEach(() => {
    resizeObserverCallbacks.length = 0;
});

describe('Truncation', () => {
    it('shows the more action when content exceeds the collapsed height', async () => {
        render(
            <Truncation collapsedHeight={100}>
                <div>Long content</div>
            </Truncation>,
        );

        triggerResize(240);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Mehr anzeigen' })).toBeInTheDocument();
        });
    });

    it('keeps short content expanded without a more action', async () => {
        render(
            <Truncation collapsedHeight={100}>
                <div>Short content</div>
            </Truncation>,
        );

        triggerResize(64);

        await waitFor(() => {
            expect(screen.queryByRole('button', { name: 'Mehr anzeigen' })).not.toBeInTheDocument();
        });
    });
});
