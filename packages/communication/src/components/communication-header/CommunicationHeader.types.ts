import { ContextMenuItem } from '@chayns-components/core';

export interface CommunicationHeaderProps {
    /**
     * Subject or title of the currently opened communication.
     * @description
     * Defines the main heading shown in the communication header.
     * This is typically the message subject or conversation title.
     */
    title: string;
    /**
     * ISO date or other parseable timestamp of the message.
     * @description
     * Provides the point in time displayed in the header metadata.
     * The value should be compatible with the component's date formatting logic.
     */
    date: string;
    /**
     * Sender of the communication.
     * @description
     * Contains the primary sender information shown in the header.
     * This member is usually rendered as the "from" contact.
     */
    from: Member;
    /**
     * Primary recipients of the communication.
     * @description
     * Lists all direct recipients displayed in the header.
     * These entries are typically shown in the "to" section.
     */
    to: Member[];
    /**
     * Optional CC recipients that should also be displayed.
     * @description
     * Adds secondary recipients to the header metadata.
     * Use this when the communication includes carbon copy recipients.
     * @optional
     */
    cc?: Member[];
    /**
     * Controls whether the detail view is currently shown in fullscreen mode.
     * @description
     * Reflects the current fullscreen state used by the header controls.
     * This value is typically managed by the parent component.
     * @optional
     */
    isFullScreen?: boolean;
    /**
     * Called when the fullscreen state should be toggled.
     * @description
     * Receives the next fullscreen state after the user interacts with the header control.
     * Implement this to synchronize fullscreen behavior with the surrounding layout.
     * @optional
     */
    onFullScreenToggle?: (isFullscreen: boolean) => void;
    /**
     * Indicates whether the communication is marked as read.
     * @description
     * Controls the read/unread visual state of the communication.
     * The header uses this to determine the correct toggle action and label.
     */
    isRead: boolean;
    /**
     * Called when the read state should change.
     * @description
     * Receives the next read state after the user triggers the read toggle action.
     * Use this callback to persist or synchronize the change in the parent component.
     */
    onReadToggle: (isRead: boolean) => void;
    /**
     * Marks the TeamTalk state of the communication.
     * @description
     * Determines whether the TeamTalk action should appear active.
     * This is useful for highlighting an open or pinned TeamTalk conversation.
     * @optional
     */
    isTeamTalkActive?: boolean;
    /**
     * Called when the TeamTalk state should be toggled.
     * @description
     * Receives the next TeamTalk state after the user interacts with the TeamTalk action.
     * Omit this prop to hide the TeamTalk toggle entirely.
     * @optional
     */
    onTeamTalkToggle?: (isTeamTalkActive: boolean) => void;
    /**
     * Limits the number of visible actions on the right side before using the overflow menu.
     * @description
     * Restricts how many actions are rendered directly in the header.
     * Additional actions can be moved into the overflow menu depending on available space.
     * @optional
     */
    maxActionCount?: number;
    /**
     * Actions rendered on the right side of the header.
     * @description
     * Defines the actionable controls available for the current communication.
     * Actions can appear directly in the header or inside an overflow/context menu.
     */
    rightActions: Action[];
    /**
     * Displays loading skeletons instead of the regular header content.
     * @description
     * Use this state while the communication metadata is still loading.
     * When enabled, placeholder UI is rendered for the header sections.
     * @optional
     * @default false
     */
    isLoading?: boolean;
}

export interface Action {
    /**
     * Unique identifier of the action.
     * @description
     * Used to distinguish actions and to create stable React keys.
     * The value should be unique within the rendered action set.
     */
    id: string;
    /**
     * Human-readable label of the action.
     * @description
     * Provides the text shown in tooltips, menus, or accessibility-related UI.
     * Choose a concise label that clearly communicates the action.
     */
    label: string;
    /**
     * List of icon class names to render for the action.
     * @description
     * Defines one or more icons that visually represent the action.
     * The icons are rendered in the order provided.
     */
    icons: string[];
    /**
     * Click handler of the action.
     * @description
     * Invoked when the user executes the action directly.
     * Use this to trigger the associated business logic.
     */
    onClick: VoidFunction;
    /**
     * Optional context menu items for sub-actions or attachments.
     * @description
     * Adds a context menu to the action for grouped actions or secondary choices.
     * This is useful for attachments, variants, or overflow behavior.
     * @optional
     */
    contextMenuItems?: ContextMenuItem[];
    /**
     * Disables the action and prevents user interaction.
     * @description
     * Marks the action as unavailable while keeping it visible in the UI.
     * Disabled actions should not execute their click handler.
     * @optional
     */
    isDisabled?: boolean;
}

export interface Member {
    /**
     * Unique identifier of the person.
     * @description
     * Used to distinguish members within the communication metadata.
     * The identifier should stay stable across renders.
     */
    id: string;
    /**
     * Display name of the person.
     * @description
     * Defines the visible name shown in the sender or recipient list.
     * This should be a user-friendly label.
     */
    name: string;
    /**
     * Available quick actions for this person.
     * @description
     * Provides interaction options related to the member, such as composing an email.
     * These actions are typically shown in a contextual menu or popover.
     */
    actions: MemberAction[];
}

export interface MemberAction {
    /**
     * Icon class names rendered for the member action.
     * @description
     * Defines the visual representation of the quick action.
     * Multiple icons can be combined if needed.
     */
    icons: string[];
    /**
     * Label of the member action.
     * @description
     * Provides the text describing what the quick action does.
     * Keep it short and action-oriented.
     */
    label: string;
    /**
     * Handler that is called when the member action is executed.
     * @description
     * Invoked after the user selects the quick action for the member.
     * Implement the related follow-up behavior here.
     */
    onClick: VoidFunction;
}
