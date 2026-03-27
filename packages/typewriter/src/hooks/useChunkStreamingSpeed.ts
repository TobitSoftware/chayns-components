import { useEffect, useRef } from 'react';
import {
    ChunkStreamingSpeedState,
    getSafeAutoSpeed,
    updateChunkStreamingSpeedEMA,
} from '../utils/utils';

type UseChunkStreamingSpeedProps = {
    autoSpeedBaseFactor: number;
    charactersCount: number;
    shouldCalcAutoSpeed: boolean;
};

const getInitialChunkSpeed = (charactersCount: number, autoSpeedBaseFactor: number) =>
    charactersCount / (autoSpeedBaseFactor / 1000);

const useChunkStreamingSpeed = ({
    autoSpeedBaseFactor,
    charactersCount,
    shouldCalcAutoSpeed,
}: UseChunkStreamingSpeedProps) => {
    const autoSpeed = useRef<number>();
    const chunkStreamingSpeed = useRef<ChunkStreamingSpeedState>({
        lastLength: charactersCount,
        ema: getInitialChunkSpeed(charactersCount, autoSpeedBaseFactor),
    });

    useEffect(() => {
        chunkStreamingSpeed.current = updateChunkStreamingSpeedEMA({
            currentLength: charactersCount,
            state: chunkStreamingSpeed.current,
        });
    }, [autoSpeedBaseFactor, charactersCount]);

    useEffect(() => {
        if (!shouldCalcAutoSpeed) {
            autoSpeed.current = undefined;
            return;
        }

        autoSpeed.current = getSafeAutoSpeed(chunkStreamingSpeed.current.ema);
    }, [charactersCount, shouldCalcAutoSpeed]);

    return autoSpeed;
};

export default useChunkStreamingSpeed;
