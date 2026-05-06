import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

export interface CommunicationButtonProps {
    personId?: string;
    onClick?: () => void;
    isDisabled?: boolean;

    icons: string[];
    shouldFillBackground?: boolean;
    className?: string;
    iconColor?: string;
    size?: CommunicationInputSize;
}
