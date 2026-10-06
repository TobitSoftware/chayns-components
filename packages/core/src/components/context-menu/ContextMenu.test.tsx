import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createDialog } from 'chayns-api';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContextMenu from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu.types';

const environment = vi.hoisted(() => ({ isTouch: false }));

vi.mock('../../utils/environment', () => ({
    useIsTouch: () => environment.isTouch,
}));

vi.mock('chayns-api', async (importOriginal) => ({
    ...(await importOriginal<typeof import('chayns-api')>()),
    createDialog: vi.fn(),
    useSite: () => ({ colorMode: 0 }),
}));

const renderMenu = (items: ContextMenuItem[]) => {
    render(
        <ContextMenu items={items} coordinates={{ x: 0, y: 0 }}>
            <button type="button">Options</button>
        </ContextMenu>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Options' }));
};

const createItems = (): ContextMenuItem[] => [
    { key: 'edit', text: 'Edit', onClick: vi.fn() },
    {
        key: 'delete',
        text: 'Delete',
        isDisabled: true,
        disabledReason: 'You do not have permission to delete this entry.',
        onClick: vi.fn(),
    },
];

beforeEach(() => {
    environment.isTouch = false;
    vi.clearAllMocks();
});

describe('ContextMenu disabled items', () => {
    it('keeps disabled items visible and leaves the menu open when clicked', async () => {
        const items = createItems();
        renderMenu(items);

        const disabledItem = await screen.findByRole('menuitem', { name: 'Delete' });
        expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
        expect(disabledItem).toHaveAccessibleDescription(items[1]?.disabledReason);
        expect(disabledItem).toHaveStyle({ opacity: '0.5', cursor: 'default' });

        fireEvent.click(disabledItem);

        expect(items[1]?.onClick).not.toHaveBeenCalled();
        expect(disabledItem).toBeInTheDocument();
        await waitFor(() => {
            expect(document.querySelector('[data-ispopup="true"]')).toHaveTextContent(
                items[1]?.disabledReason ?? '',
            );
        });
    });

    it('shows the disabled reason on hover', async () => {
        renderMenu(createItems());
        const disabledItem = await screen.findByRole('menuitem', { name: 'Delete' });

        fireEvent.mouseEnter(disabledItem);

        await waitFor(() => {
            expect(document.querySelector('[data-ispopup="true"]')).toHaveTextContent(
                'You do not have permission to delete this entry.',
            );
        });
    });

    it.each(['Enter', ' '])('does not activate a disabled item using %s', async (key) => {
        const items = createItems();
        renderMenu(items);
        const disabledItem = await screen.findByRole('menuitem', { name: 'Delete' });

        disabledItem.focus();
        fireEvent.keyDown(disabledItem, { key });

        expect(items[1]?.onClick).not.toHaveBeenCalled();
        expect(disabledItem).toBeInTheDocument();
    });

    it('prevents activating disabled items reached using arrow keys', async () => {
        const items = createItems();
        renderMenu(items);
        await screen.findByRole('menuitem', { name: 'Delete' });
        const trigger = screen.getByRole('button', { name: 'Options' });

        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        fireEvent.keyDown(trigger, { key: 'Enter' });

        expect(items[1]?.onClick).not.toHaveBeenCalled();
        expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();

        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        fireEvent.keyDown(trigger, { key: 'Enter' });

        expect(items[0]?.onClick).toHaveBeenCalledOnce();
    });

    it('does not initially select a disabled item marked as selected', async () => {
        const items = createItems().map((item) => ({
            ...item,
            isSelected: item.isDisabled,
        }));
        renderMenu(items);
        await screen.findByRole('menuitem', { name: 'Delete' });

        fireEvent.keyDown(screen.getByRole('button', { name: 'Options' }), { key: 'Enter' });

        expect(items[1]?.onClick).not.toHaveBeenCalled();
        expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
    });

    it('still activates enabled items and closes the menu', async () => {
        const items = createItems();
        renderMenu(items);

        fireEvent.click(await screen.findByRole('menuitem', { name: 'Edit' }));

        expect(items[0]?.onClick).toHaveBeenCalledOnce();
        await waitFor(() => expect(screen.queryByRole('menuitem')).not.toBeInTheDocument());
    });

    it('supports disabled items without a reason', async () => {
        const onClick = vi.fn();
        renderMenu([{ key: 'delete', text: 'Delete', isDisabled: true, onClick }]);

        fireEvent.click(await screen.findByRole('menuitem', { name: 'Delete' }));

        expect(onClick).not.toHaveBeenCalled();
        expect(document.querySelector('[data-ispopup="true"]')).not.toBeInTheDocument();
    });

    it('passes disabled items and their reasons to the native select dialog on touch devices', async () => {
        environment.isTouch = true;
        const items = createItems();
        const open = vi.fn().mockResolvedValue({ result: [] });
        vi.mocked(createDialog).mockReturnValue({
            open,
        } as unknown as ReturnType<typeof createDialog>);

        renderMenu(items);

        await waitFor(() => expect(open).toHaveBeenCalledOnce());
        expect(createDialog).toHaveBeenCalledWith(
            expect.objectContaining({
                list: [
                    expect.objectContaining({
                        id: 0,
                        name: 'Edit',
                        disabled: undefined,
                        subtitle: undefined,
                    }),
                    expect.objectContaining({
                        id: 1,
                        name: 'Delete',
                        disabled: true,
                        subtitle: items[1]?.disabledReason,
                    }),
                ],
            }),
        );
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
        expect(items[0]?.onClick).not.toHaveBeenCalled();
        expect(items[1]?.onClick).not.toHaveBeenCalled();
    });

    it('does not activate a disabled item even if the native dialog returns it', async () => {
        environment.isTouch = true;
        const items = createItems();
        const open = vi.fn().mockResolvedValue({ result: [1] });
        vi.mocked(createDialog).mockReturnValue({
            open,
        } as unknown as ReturnType<typeof createDialog>);

        renderMenu(items);

        await waitFor(() => expect(open).toHaveBeenCalledOnce());
        expect(items[1]?.onClick).not.toHaveBeenCalled();
    });

    it('keeps using the native select dialog on touch devices for enabled items', async () => {
        environment.isTouch = true;
        const onClick = vi.fn();
        vi.mocked(createDialog).mockReturnValue({
            open: vi.fn().mockResolvedValue({ result: [0] }),
        } as unknown as ReturnType<typeof createDialog>);

        renderMenu([{ key: 'edit', text: 'Edit', onClick }]);

        await waitFor(() => expect(onClick).toHaveBeenCalledOnce());
        expect(createDialog).toHaveBeenCalledOnce();
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });
});
