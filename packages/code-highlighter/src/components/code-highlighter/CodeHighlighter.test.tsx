/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { CodeHighlighterTheme } from '../../types/codeHighlighter';
import CodeHighlighter from './CodeHighlighter';

vi.mock('@chayns-components/core', () => ({
    Icon: ({ icons }: { icons: string[] }) => <span data-icons={icons.join(' ')} />,
    SharingContextMenu: ({
        children,
        shouldShowCallingCodeAction,
        shouldShowCopyAction,
    }: {
        children: React.ReactNode;
        shouldShowCallingCodeAction?: boolean;
        shouldShowCopyAction?: boolean;
    }) => (
        <div
            data-calling-code-action={shouldShowCallingCodeAction}
            data-copy-action={shouldShowCopyAction}
        >
            {children}
        </div>
    ),
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
    it('keeps the copy operation and renders sticky actions', async () => {
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

        await waitFor(() => {
            expect(writeText).toHaveBeenCalledWith('const value = true;');
            expect(container.querySelector('[data-icons="fa fa-check"]')).toBeInTheDocument();
        });
        expect(container.querySelector('pre')).toHaveStyle({
            overflow: 'auto',
            padding: '0px 15px 15px',
        });
        expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgb(40, 44, 52)' });
        expect(container.querySelector('[data-copy-action="false"]')).toBeInTheDocument();
        expect(container.querySelector('[data-calling-code-action="false"]')).toBeInTheDocument();
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
