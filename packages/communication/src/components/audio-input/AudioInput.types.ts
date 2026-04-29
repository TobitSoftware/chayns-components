export interface AudioInputProps {
    isMuted?: boolean;
    onMuteChange?: (isMuted: boolean) => void;

    onStart?: (stream: MediaStream) => void;
    onStop?: () => void;
    onError?: (error: unknown) => void;

    styleConfig?: AudioInputStyleConfig;
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
