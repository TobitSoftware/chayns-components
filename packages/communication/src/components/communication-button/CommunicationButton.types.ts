export interface CommunicationButtonProps {
    personId?: string;
    onClick?: () => void;
    isDisabled?: boolean;

    icons: string[];
    shouldFillBackground?: boolean;
    className?: string;
    iconColor?: string;
}
