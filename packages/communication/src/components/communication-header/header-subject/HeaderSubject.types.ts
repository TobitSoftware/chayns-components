import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderSubjectProps {
    /**
     * Title or subject shown at the top of the communication header.
     * @description
     * Represents the main heading of the currently opened message or conversation.
     */
    title: CommunicationHeaderProps['title'];
    /**
     * Indicates whether the surrounding view is currently displayed in fullscreen mode.
     * @description
     * Controls the visual state of the fullscreen toggle in the subject area.
     * @optional
     */
    isFullScreen?: CommunicationHeaderProps['isFullScreen'];
    /**
     * Called when the fullscreen state should change.
     * @description
     * Receives the next fullscreen state requested from the subject controls.
     * @optional
     */
    onFullScreenToggle?: CommunicationHeaderProps['onFullScreenToggle'];
    /**
     * Displays loading placeholders instead of the regular subject UI.
     * @description
     * Use this while the title and actions are still loading.
     */
    isLoading: CommunicationHeaderProps['isLoading'];
}
