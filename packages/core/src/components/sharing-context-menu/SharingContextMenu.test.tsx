import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import SharingContextMenu from './SharingContextMenu';

vi.mock('chayns-api', () => ({
    getSite: () => ({ color: '#000000' }),
}));

vi.mock('../../utils/environment', () => ({
    useIsTouch: () => false,
}));

vi.mock('../context-menu/ContextMenu', () => ({
    default: ({ children, items }: { children: ReactNode; items: Array<{ key: string }> }) => (
        <div data-item-keys={items.map((item) => item.key).join(',')}>{children}</div>
    ),
}));

describe('SharingContextMenu', () => {
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
