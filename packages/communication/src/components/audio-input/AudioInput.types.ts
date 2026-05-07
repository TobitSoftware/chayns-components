import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

export interface AudioInputProps {
    isMuted?: boolean;
    onMuteChange?: (isMuted: boolean) => void;

    onStart?: (stream: MediaStream) => void;
    onStop?: () => void;
    onError?: (error: unknown) => void;

    styleConfig?: AudioInputStyleConfig;
    position?: AudioInputPosition;

    size?: CommunicationInputSize;
}

export interface AudioInputRef {
    start: () => Promise<MediaStream | null>;
    stop: () => void;
    getStream: () => MediaStream | null;
}

export interface AudioInputStyleConfig {
    backgroundColor?: string;
    color?: string;
}

export enum AudioInputPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}
