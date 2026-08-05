import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderMembersProps {
    /**
     * Sender shown in the header metadata.
     * @description
     * Represents the primary member rendered in the "from" row.
     */
    from: CommunicationHeaderProps['from'];
    /**
     * Direct recipients shown in the header metadata.
     * @description
     * Contains the members rendered in the "to" row.
     */
    to: CommunicationHeaderProps['to'];
    /**
     * Optional CC recipients shown in the header metadata.
     * @description
     * Adds secondary recipients below the direct recipients when available.
     */
    cc: CommunicationHeaderProps['cc'];
    /**
     * Date or timestamp displayed in the members section.
     * @description
     * Passed through from the main header to render the communication time information.
     */
    date: CommunicationHeaderProps['date'];
    /**
     * Displays skeleton placeholders instead of member information.
     * @description
     * Use this while sender and recipient data is still loading.
     */
    isLoading: CommunicationHeaderProps['isLoading'];
    /**
     * Enables keyboard-only focus highlighting for member actions.
     * @description
     * Displays focus rings when member actions receive focus through keyboard navigation.
     * @optional
     */
    shouldEnableKeyboardHighlighting: CommunicationHeaderProps['shouldEnableKeyboardHighlighting'];
}
