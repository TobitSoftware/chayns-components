import { ContextMenuItem } from '@chayns-components/core';
import { EmojiInputProps, EmojiInputRef } from '@chayns-components/emoji-input';
import { ReactNode, RefObject } from 'react';
import { AudioInputProps, AudioInputRef } from '../audio-input/AudioInput.types';

export interface CommunicationInputProps {
    /**
     * Size variant of the composed communication input.
     * @description
     * Controls the overall height, font size, icon size, and spacing of the input.
     * Match this with related communication controls for a consistent layout.
     * @optional
     * @default CommunicationInputSize.MEDIUM
     */
    size?: CommunicationInputSize;
    /**
     * Border radius behavior of the input container.
     * @description
     * Defines whether the input uses dynamic, rounded, or fully round corners.
     * Use this to adapt the component to the visual style of the surrounding UI.
     * @optional
     * @default CommunicationInputCornerType.DYNAMIC
     */
    cornerType?: CommunicationInputCornerType;
    /**
     * Optional chips rendered together with the input.
     * @description
     * Use chips to show shortcuts, attachments, or removable context items above the editor area.
     * @optional
     */
    chips?: Chip[];
    /**
     * Context menu items opened from the leading plus button.
     * @description
     * When provided, the component renders a left-side action that opens these menu entries.
     * This is useful for attachments or additional creation actions.
     * @optional
     */
    contextMenuItems?: ContextMenuItem[];
    /**
     * Content rendered above the input layout.
     * @description
     * Use this to display previews, additional form content, or contextual information.
     * @optional
     */
    topContent?: ReactNode;
    /**
     * Element rendered on the right side of the input.
     * @description
     * Typically used for a send button or another primary action.
     * The element is rendered inside the component layout without additional behavior.
     * @optional
     */
    rightElement?: ReactNode;
    /**
     * Configuration passed directly to the underlying `EmojiInput`.
     * @description
     * This contains the actual editor value and optional input event handlers.
     * All text-entry-related behavior is configured through this object.
     */
    inputConfig: EmojiInputProps;
    /**
     * Configuration passed to the optional audio input control.
     * @description
     * Use this to customize recording behavior, styling, or mute handling when audio input is enabled.
     * @optional
     */
    audioInputConfig?: AudioInputProps;
    /**
     * Disables the full height toggle of the input.
     * @description
     * Use this to disable the input full height toggle.
     * @optional
     * @default false
     */
    shouldDisableFullHeight?: boolean;
    /**
     * Enables the initial reveal animation of the input.
     * @description
     * Use this to animate the input from a more compact state when it first appears.
     * @optional
     * @default false
     */
    shouldUseInitialAnimation?: boolean;
    /**
     * Enables the audio input button next to the editor.
     * @description
     * When enabled, the component renders an `AudioInput` and wires it to the shared input behavior.
     * @optional
     */
    shouldUseAudioInput?: boolean;
    /**
     * Controls where the input expands when its size increases.
     * @description
     * Defines whether additional space is added above or below the input element.
     * Use `TOP` to expand upwards and `BOTTOM` to expand downwards.
     * @optional
     */
    direction?: CommunicationInputDirection;
    /**
     * Reference to the scrollable container that this component should interact with.
     * @description
     * When provided, the component will append an invisible spacer element to the end of the container
     * to ensure that overlaying content (e.g. expanding elements) can be fully scrolled into view.
     * The scroll position will be adjusted automatically to prevent visible jumps when the spacer size changes.
     *
     * Note: This works best with native scroll containers. When used with virtualized lists
     * (e.g. custom scrollers), behavior depends on their internal scroll handling.
     *
     * @optional
     */
    scrollContainerRef?: RefObject<HTMLElement>;
}

export interface Chip {
    /**
     * Visible label of the chip.
     * @description
     * Describes the chip content or action in a short, user-friendly form.
     */
    label: string;
    /**
     * Optional icon class names rendered inside the chip.
     * @description
     * Use icons to visually distinguish chip types such as files or suggestions.
     * @optional
     */
    icons?: string[];
    /**
     * Called when the chip should be removed.
     * @description
     * Provide this to render a removable chip with a dedicated remove action.
     * @optional
     */
    onRemove?: () => void;
    /**
     * Called when the chip itself is clicked.
     * @description
     * Use this for suggestion chips or contextual actions that should stay visible after interaction.
     * @optional
     */
    onClick?: () => void;
}

export interface CommunicationInputRef extends EmojiInputRef, AudioInputRef {
    /**
     * Triggers the initial input animation manually.
     * @description
     * Use this when the reveal animation should start on demand instead of immediately on mount.
     */
    startAnimation: () => void;
}

export enum CommunicationInputSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
}

export enum CommunicationInputCornerType {
    DYNAMIC = 'DYNAMIC',
    ROUNDED = 'ROUNDED',
    ROUND = 'ROUND',
}

export enum CommunicationInputDirection {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
}
