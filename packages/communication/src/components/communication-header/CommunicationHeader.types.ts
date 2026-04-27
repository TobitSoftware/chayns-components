import { ContextMenuItem } from '@chayns-components/core';

export interface CommunicationHeaderProps {
    title: string;
    date: string;
    from: Member;
    to: Member[];
    cc?: Member[];
    isFullScreen?: boolean;
    onFullScreenToggle?: (isFullscreen: boolean) => void;
    isRead: boolean;
    onReadToggle: (isRead: boolean) => void;
    isTeamTalkActive?: boolean;
    onTeamTalkToggle?: (isTeamTalkActive: boolean) => void;
    maxActionCount?: number;
    rightActions: Action[];
    isLoading?: boolean;
}

export interface Action {
    id: string;
    label: string;
    icons: string[];
    onClick: VoidFunction;
    contextMenuItems?: ContextMenuItem[];
    isDisabled?: boolean;
}

export interface Member {
    id: string;
    name: string;
    actions: MemberAction[];
}

export interface MemberAction {
    icons: string[];
    label: string;
    onClick: VoidFunction;
}
