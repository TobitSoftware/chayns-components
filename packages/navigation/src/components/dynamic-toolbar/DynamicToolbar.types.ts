import type { IconProps } from '@chayns-components/core';

export enum DynamicToolbarLayout {
    Hidden = 'hidden',
    Floating = 'floating',
    Flush = 'flush',
}

export type DynamicToolbarItem = {
    // Unique identifier that drives selection state and callbacks.
    badgeCount?: number;
    // Icon names that are forwarded to the shared Icon component.
    icons: IconProps['icons'];
    // Human-readable label for accessibility announcements.
    id: string;
    // Optional badge count that highlights pending conversations.
    isDisabled?: boolean;
    // Marks the action as temporarily unavailable.
    label: string;
    // Optional visual separator to highlight contextual groups.
    hasRightSeparator?: boolean;
};

export type DynamicToolbarProps = {
    /**
     * @description Identifier of the action that should appear as active.
     * @example
     * <DynamicToolbar activeItemId="chat" items={[...]} />
     * @optional
     */
    activeItemId?: string | null;
    /**
     * @description Custom class name passed to the root container for styled-component overrides.
     * @example
     * <DynamicToolbar className="support-toolbar" items={[...]} />
     * @optional
     */
    className?: string;
    /**
     * @description Ordered collection of toolbar actions that should be rendered.
     * @example
     * <DynamicToolbar items={[{ id: 'chat', icons: ['far fa-comment'], label: 'Chat' }]} />
     */
    items: DynamicToolbarItem[];
    /**
     * @description Controls whether the toolbar floats, snaps to the edges, or is hidden.
     * @example
     * <DynamicToolbar layout={DynamicToolbarLayout.FLUSH} items={[...]} />
     * @default DynamicToolbarLayout.Floating
     * @optional
     */
    layout?: DynamicToolbarLayout;
    /**
     * @description Callback that receives the item triggered by the user.
     * @example
     * <DynamicToolbar onItemSelect={(item) => console.log(item.id)} items={[...]} />
     * @optional
     */
    onItemSelect?: (item: DynamicToolbarItem) => void;
};
