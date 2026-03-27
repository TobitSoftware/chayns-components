import { useEffect, useRef, useState } from 'react';
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
    const [autoSpeed, setAutoSpeed] = useState<number>();
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
            setAutoSpeed(undefined);
            return;
        }

        const nextAutoSpeed = getSafeAutoSpeed(chunkStreamingSpeed.current.ema);
        setAutoSpeed(nextAutoSpeed);
    }, [charactersCount, shouldCalcAutoSpeed]);

    return autoSpeed;
};

export default useChunkStreamingSpeed;
