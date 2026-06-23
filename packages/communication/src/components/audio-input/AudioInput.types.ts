import type { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

export interface AudioInputProps {
    /**
     * Controls whether the microphone is currently muted.
     * @description
     * When enabled, the active recording stays open but the microphone state is shown as muted.
     * Use this to synchronize the visual mute state with your surrounding input logic.
     * @optional
     * @default false
     */
    isMuted?: boolean;
    /**
     * Called when the mute state should change.
     * @description
     * Receives the next mute state after the user presses the main microphone button while recording is active.
     * Use this callback to keep the mute state controlled from the parent.
     * @optional
     */
    onMuteChange?: (isMuted: boolean) => void;

    /**
     * Called after recording starts successfully.
     * @description
     * Receives the created media stream so it can be reused or observed by the parent.
     * This is useful for attaching additional processing or recording logic.
     * @optional
     */
    onStart?: (stream: MediaStream) => void;
    /**
     * Called after the active recording has been stopped.
     * @description
     * Use this callback to react to the end of the audio capture lifecycle.
     * It is invoked when the user presses the stop control.
     * @optional
     */
    onStop?: () => void;
    /**
     * Called when microphone access or recording setup fails.
     * @description
     * Receives the original error value thrown while requesting or handling the media stream.
     * Use this to show feedback or log the failure.
     * @optional
     */
    onError?: (error: unknown) => void;

    /**
     * Visual configuration of the audio input button.
     * @description
     * Allows overriding the button background and icon color.
     * Use this when the default primary styling should be adapted to the surrounding UI.
     * @optional
     */
    styleConfig?: AudioInputStyleConfig;
    /**
     * Horizontal alignment of the expandable audio input.
     * @description
     * Determines from which side the control grows when the recording view opens.
     * This is useful when the audio input is placed next to other actions.
     * @optional
     * @default AudioInputPosition.RIGHT
     */
    position?: AudioInputPosition;

    /**
     * Size variant shared with the communication input.
     * @description
     * Controls the overall height of the button and the rendered icon size.
     * Match this value with a surrounding `CommunicationInput` for a consistent layout.
     * @optional
     * @default CommunicationInputSize.MEDIUM
     */
    size?: CommunicationInputSize;
}

export interface AudioInputRef {
    /**
     * Starts audio capture manually.
     * @description
     * Resolves with the created media stream when microphone access was granted.
     * Returns `null` if recording could not be started.
     */
    start: () => Promise<MediaStream | null>;
    /**
     * Stops the currently active recording.
     * @description
     * Closes the active audio capture and resets the component back to its idle state.
     */
    stop: () => void;
    /**
     * Returns the active media stream.
     * @description
     * Use this to access the current stream without starting a new recording session.
     * Returns `null` when recording is not active.
     */
    getStream: () => MediaStream | null;
}

export interface AudioInputStyleConfig {
    /**
     * Background color of the audio input button.
     * @description
     * Overrides the default primary background while the control is idle and expanded.
     * @optional
     */
    backgroundColor?: string;
    /**
     * Icon and waveform color of the audio input.
     * @description
     * Applies to the microphone icon, stop icon, and the waveform visualization.
     * @optional
     */
    color?: string;
}

export enum AudioInputPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}
