import { ReactNode } from 'react';
import { PopupAlignment } from '../../types/popup';

export type PopupProps = {
    /**
     * The preferred alignment of the popup relative to its trigger element.
     * @description
     * Use this prop to influence where the popup should appear around its trigger. If no alignment is provided,
     * the component automatically chooses a suitable position based on the available space.
     * @example
     * <Popup alignment={PopupAlignment.BottomRight} content="Details">Open</Popup>
     * @optional
     */
    alignment?: PopupAlignment;
    /**
     * The trigger element that the popup is attached to.
     * @description
     * This content is rendered in place and acts as the interactive anchor for the popup.
     * Depending on the configured behavior, clicking or hovering this element can show or hide the popup.
     * @example
     * <Popup content="Details"><button type="button">Open</button></Popup>
     * @optional
     */
    children?: ReactNode;
    /**
     * The DOM element that should receive the popup portal.
     * @description
     * By default, the popup resolves a suitable container automatically. Use this prop when the popup should be rendered
     * into a specific element instead, for example to keep it inside a dialog or another scrollable area.
     * @example
     * <Popup container={document.body} content="Details">Open</Popup>
     * @optional
     */
    container?: Element;
    /**
     * The content rendered inside the popup.
     * @description
     * This can be any React node, such as text, markup, or a fully custom component tree.
     * @example
     * <Popup content={<div>Additional information</div>}>Open</Popup>
     */
    content: ReactNode;
    /**
     * Fully controls whether the popup is visible.
     * @description
     * When this prop receives a boolean value, the popup becomes fully controlled from the outside.
     * Internal triggers such as click, hover, outside click, blur handling, or imperative `show` and `hide`
     * calls no longer change the visibility state. The popup is then shown only when `isOpen` is `true`
     * and hidden only when `isOpen` is `false`.
     * @example
     * <Popup isOpen={isPopupOpen} content="Details">Open</Popup>
     * @optional
     */
    isOpen?: boolean;
    /**
     * Callback that is called after the popup becomes hidden.
     * @description
     * Use this callback to react to the popup closing, for example to synchronize external UI state.
     * It is called when the effective popup visibility changes from open to closed.
     * @example
     * <Popup onHide={() => console.log('Popup hidden')} content="Details">Open</Popup>
     * @optional
     */
    onHide?: VoidFunction;
    /**
     * Callback that is called after the popup becomes visible.
     * @description
     * Use this callback to react to the popup opening, for example to start related UI behavior or analytics.
     * It is called when the effective popup visibility changes from closed to open.
     * @example
     * <Popup onShow={() => console.log('Popup shown')} content="Details">Open</Popup>
     * @optional
     */
    onShow?: VoidFunction;
    /**
     * Hides the popup when the pointer leaves the trigger element.
     * @description
     * This prop is only relevant when `shouldShowOnHover` is enabled. When set to `true`, the popup closes immediately
     * after the pointer leaves the trigger element instead of waiting for the delayed hide behavior.
     * This prop has no effect while `isOpen` is used as a controlled prop.
     * @default false
     * @example
     * <Popup shouldShowOnHover shouldHideOnChildrenLeave content="Details">Open</Popup>
     * @optional
     */
    shouldHideOnChildrenLeave?: boolean;
    /**
     * Keeps the popup aligned within the scrolling content container.
     * @description
     * When set to `true`, the popup uses the resolved container for positioning and scroll synchronization.
     * When set to `false`, it is positioned relative to the document body instead.
     * @default true
     * @example
     * <Popup shouldScrollWithContent={false} content="Details">Open</Popup>
     * @optional
     */
    shouldScrollWithContent?: boolean;
    /**
     * Opens the popup when the trigger element is hovered instead of clicked.
     * @description
     * By default, the popup opens on click. Set this prop to `true` to switch to hover-based interaction.
     * This prop has no effect while `isOpen` is used as a controlled prop.
     * @default false
     * @example
     * <Popup shouldShowOnHover content="Details">Open</Popup>
     * @optional
     */
    shouldShowOnHover?: boolean;
    /**
     * Uses the trigger element width as the popup width reference.
     * @description
     * When enabled, the popup measurement and layout respect the width of the trigger element.
     * Disable this when the popup should size itself more freely based on its content.
     * @default true
     * @example
     * <Popup shouldUseChildrenWidth={false} content="Details">Open</Popup>
     * @optional
     */
    shouldUseChildrenWidth?: boolean;
    /**
     * Stretches the trigger element to the full available width.
     * @description
     * This affects the wrapper around the popup trigger and is useful when the trigger should behave like a block-level element.
     * @default false
     * @example
     * <Popup shouldUseFullWidth content="Details">Open</Popup>
     * @optional
     */
    shouldUseFullWidth?: boolean;
    /**
     * Requests that the popup should be opened from outside.
     * @description
     * Unlike `isOpen`, this prop does not fully control visibility. It acts as an external open trigger and keeps compatibility
     * with the existing behavior, while other internal interactions may still influence the popup state.
     * Use `isOpen` when you need full external control over showing and hiding the popup.
     * @default false
     * @example
     * <Popup shouldBeOpen={shouldOpenInitially} content="Details">Open</Popup>
     * @optional
     */
    shouldBeOpen?: boolean;
    /**
     * Vertical offset between the trigger element and the popup.
     * @description
     * Use this prop to fine-tune the popup position on the Y axis. Positive and negative values can be used depending on the desired spacing.
     * @default 0
     * @example
     * <Popup yOffset={8} content="Details">Open</Popup>
     * @optional
     */
    yOffset?: number;
};
