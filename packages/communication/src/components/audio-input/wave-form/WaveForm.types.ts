export interface WaveFormProps {
    /**
     * Web Audio analyser used to read the live microphone signal.
     * @description
     * The waveform visualizer uses this node to sample audio data while recording is active.
     * Provide `null` when no stream is available yet.
     */
    analyser: AnalyserNode | null;
    /**
     * Stroke color of the rendered waveform.
     * @description
     * Use this to match the visualization color to the surrounding audio input styling.
     */
    color: string;
}
