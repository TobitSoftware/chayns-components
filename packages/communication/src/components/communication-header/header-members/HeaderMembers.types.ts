import { CommunicationHeaderProps } from '../CommunicationHeader.types';

export interface HeaderMembersProps {
    from: CommunicationHeaderProps['from'];
    to: CommunicationHeaderProps['to'];
    cc: CommunicationHeaderProps['cc'];
    date: CommunicationHeaderProps['date'];
    isLoading: CommunicationHeaderProps['isLoading'];
}
