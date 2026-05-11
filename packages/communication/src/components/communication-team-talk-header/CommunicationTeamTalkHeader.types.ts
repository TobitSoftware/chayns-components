export interface CommunicationTeamTalkHeaderProps {
    shouldShowInternalHint?: boolean;
    onAgree: VoidFunction;
    onAdd?: VoidFunction;
    onLeave?: VoidFunction;

    onSend: VoidFunction;
    onChange: (value: string) => void;

    value: string;

    isInputDisabled?: boolean;
    isAgreeDisabled?: boolean;
}
