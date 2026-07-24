/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import CopyableContent from './CopyableContent';

vi.mock('../icon/Icon', () => ({
    default: ({ icons }: { icons: string[] }) => <span data-icons={icons.join(' ')} />,
}));

vi.mock('../sharing-context-menu/SharingContextMenu', () => ({
    default: ({
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
}));

vi.mock('chayns-api', async (importOriginal) => ({
    ...(await importOriginal<typeof import('chayns-api')>()),
    createDialog: vi.fn(() => ({ open: vi.fn() })),
}));

const readBlob = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve(reader.result as string);
        reader.readAsText(blob);
    });

describe('CopyableContent', () => {
    it('renders formatted markdown without active input HTML', () => {
        render(
            <CopyableContent
                content={
                    '# Heading\n\n- Entry\n\n[Link](https://example.com)\n<script onload="x">bad</script>'
                }
            />,
        );

        expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
            'href',
            'https://example.com',
        );
        expect(document.querySelector('script')).not.toBeInTheDocument();
        expect(document.querySelector('[onload]')).not.toBeInTheDocument();
    });

    it('copies content instead of custom children', async () => {
        const write = vi.spyOn(navigator.clipboard, 'write').mockResolvedValue();
        render(<CopyableContent content="source markdown">Visible replacement</CopyableContent>);

        fireEvent.click(screen.getByRole('button', { name: 'Kopieren' }));

        await waitFor(() => expect(write).toHaveBeenCalled());
        const item = write.mock.calls[0][0][0] as unknown as ClipboardItem;
        await expect(readBlob(await item.getType('text/plain'))).resolves.toBe('source markdown');
    });

    it('shows a checkmark after a successful copy', async () => {
        vi.spyOn(navigator.clipboard, 'write').mockResolvedValue();
        const { container } = render(<CopyableContent content="source" />);

        fireEvent.click(screen.getByRole('button', { name: 'Kopieren' }));

        await waitFor(() => {
            expect(container.querySelector('[data-icons="fa fa-check"]')).toBeInTheDocument();
        });
    });

    it('offers sharing actions', () => {
        const { container } = render(<CopyableContent content="source" />);

        expect(screen.getByRole('button', { name: 'Teilen' })).toBeInTheDocument();
        expect(container.querySelector('[data-copy-action="false"]')).toBeInTheDocument();
        expect(container.querySelector('[data-calling-code-action="false"]')).toBeInTheDocument();
    });
});
