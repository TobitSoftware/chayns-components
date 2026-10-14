import { fireEvent, render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import SharingContextMenu from './SharingContextMenu';

const { shareWithApp, shareWithUrl } = vi.hoisted(() => ({
    shareWithApp: vi.fn(),
    shareWithUrl: vi.fn(),
}));

vi.mock('chayns-api', () => ({
    getSite: () => ({ color: '#000000' }),
}));

vi.mock('../../utils/sharingBar', () => ({
    copyToClipboard: vi.fn(),
    shareWithApp,
    shareWithUrl,
}));

vi.mock('../../utils/environment', () => ({
    useIsTouch: () => false,
}));

vi.mock('../context-menu/ContextMenu', () => ({
    default: ({
        children,
        items,
    }: {
        children: ReactNode;
        items: Array<{ key: string; onClick: VoidFunction }>;
    }) => (
        <div data-item-keys={items.map((item) => item.key).join(',')}>
            {items.map((item) => (
                <button key={item.key} type="button" onClick={item.onClick}>
                    {item.key}
                </button>
            ))}
            {children}
        </div>
    ),
}));

describe('SharingContextMenu', () => {
    it('shares the optional text via WhatsApp, mail, and X only', () => {
        const { getByRole } = render(
            <SharingContextMenu link="https://example.com" text="Check this out">
                <button type="button">Share</button>
            </SharingContextMenu>,
        );

        fireEvent.click(getByRole('button', { name: 'whatsapp' }));
        fireEvent.click(getByRole('button', { name: 'mail' }));
        fireEvent.click(getByRole('button', { name: 'twitter' }));

        expect(shareWithUrl).toHaveBeenNthCalledWith(
            1,
            'https://api.whatsapp.com/send?text=Check%20this%20out%0A%0Ahttps%3A%2F%2Fexample.com',
        );
        expect(shareWithUrl).toHaveBeenNthCalledWith(
            2,
            'mailto:?body=Check%20this%20out%0A%0Ahttps%3A%2F%2Fexample.com',
        );
        expect(shareWithUrl).toHaveBeenNthCalledWith(
            3,
            'http://twitter.com/intent/tweet?text=Check%20this%20out&url=https%3A%2F%2Fexample.com&hashtags=chayns',
        );
        expect(shareWithApp).not.toHaveBeenCalled();
    });

    it('keeps copy and calling-code actions enabled by default', () => {
        const { container } = render(
            <SharingContextMenu link="https://example.com">
                <button type="button">Share</button>
            </SharingContextMenu>,
        );

        expect((container.firstChild as HTMLElement).getAttribute('data-item-keys')).toBe(
            'copy,whatsapp,facebook,twitter,mail,callingCode',
        );
    });

    it('can hide copy and calling-code actions for dedicated content actions', () => {
        const { container } = render(
            <SharingContextMenu
                link="https://example.com"
                shouldShowCallingCodeAction={false}
                shouldShowCopyAction={false}
            >
                <button type="button">Share</button>
            </SharingContextMenu>,
        );

        expect((container.firstChild as HTMLElement).getAttribute('data-item-keys')).toBe(
            'whatsapp,facebook,twitter,mail',
        );
    });
});
