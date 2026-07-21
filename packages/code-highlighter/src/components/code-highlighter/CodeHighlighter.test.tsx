/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CodeHighlighterTheme } from '../../types/codeHighlighter';
import CodeHighlighter from './CodeHighlighter';

vi.mock('@chayns-components/core', () => ({
    Icon: () => <span />,
    SharingContextMenu: ({ children }: { children: React.ReactNode }) => children,
    useColorScheme: () => undefined,
}));

vi.mock('@chayns-components/textstring', () => ({
    ttsToITextString: (value: unknown) => value,
    useTextstringValue: ({ textstring }: { textstring: { fallback: string } }) =>
        textstring.fallback,
}));

vi.mock('chayns-api', () => ({
    DialogType: { TOAST: 1 },
    ToastType: { ERROR: 4, SUCCESS: 2 },
    createDialog: vi.fn(() => ({ open: vi.fn() })),
}));

describe('CodeHighlighter', () => {
    it('keeps the copy operation and renders sticky actions', () => {
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
        const { container } = render(
            <CodeHighlighter
                code="const value = true;"
                copyButtonText="Copy code"
                language="typescript"
                shouldShowLineNumbers
                theme={CodeHighlighterTheme.Dark}
            />,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));

        expect(writeText).toHaveBeenCalledWith('const value = true;');
        expect(container.querySelector('pre')).toHaveStyle({
            overflow: 'auto',
            padding: '0px 15px 15px',
        });
        expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgb(40, 44, 52)' });
    });

    it('formats code before highlighting when requested', async () => {
        const { container } = render(
            <CodeHighlighter
                code="const value={label:'Ada'};"
                language="typescript"
                shouldFormatCode
                theme={CodeHighlighterTheme.Light}
            />,
        );

        await waitFor(() => {
            expect(container.querySelector('pre')).toHaveTextContent(
                "const value = { label: 'Ada' };",
            );
        });
        expect(container.querySelector('pre span')).toBeInTheDocument();
        expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgb(250, 250, 250)' });
    });
});
