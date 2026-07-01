import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderActionsProps {
    /**
     * Actions rendered on the right side of the communication header.
     * @description
     * Passed through from `CommunicationHeader` and used to render visible actions and overflow items.
     */
    rightActions: CommunicationHeaderProps['rightActions'];
    /**
     * Displays loading placeholders instead of interactive actions.
     * @description
     * Use this while the header metadata is still loading.
     */
    isLoading: CommunicationHeaderProps['isLoading'];
    /**
     * Maximum number of actions shown directly before using overflow behavior.
     * @description
     * Helps the subcomponent decide how many actions stay visible in the header row.
     */
    maxActionCount: CommunicationHeaderProps['maxActionCount'];
    /**
     * Indicates whether the TeamTalk action is currently active.
     * @description
     * Controls the visual state of the TeamTalk toggle action.
     */
    isTeamTalkActive: CommunicationHeaderProps['isTeamTalkActive'];
    /**
     * Called when the TeamTalk state should be toggled.
     * @description
     * Receives the next TeamTalk state triggered from the header actions section.
     */
    onTeamTalkToggle: CommunicationHeaderProps['onTeamTalkToggle'];
    /**
     * Indicates whether the current communication is marked as read.
     * @description
     * Used to render the correct read or unread action state.
     */
    isRead: CommunicationHeaderProps['isRead'];
    /**
     * Called when the read state should change.
     * @description
     * Receives the next read state after the user triggers the corresponding action.
     */
    onReadToggle: CommunicationHeaderProps['onReadToggle'];
}
