import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderSubjectProps {
    title: CommunicationHeaderProps['title'];
    isFullScreen?: CommunicationHeaderProps['isFullScreen'];
    onFullScreenToggle?: CommunicationHeaderProps['onFullScreenToggle'];
    isLoading: CommunicationHeaderProps['isLoading'];
}
