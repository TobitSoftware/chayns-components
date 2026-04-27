import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderActionsProps {
    rightActions: CommunicationHeaderProps['rightActions'];
    isLoading: CommunicationHeaderProps['isLoading'];
    maxActionCount: CommunicationHeaderProps['maxActionCount'];
    isTeamTalkActive: CommunicationHeaderProps['isTeamTalkActive'];
    onTeamTalkToggle: CommunicationHeaderProps['onTeamTalkToggle'];
    isRead: CommunicationHeaderProps['isRead'];
    onReadToggle: CommunicationHeaderProps['onReadToggle'];
}
