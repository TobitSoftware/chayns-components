import React, { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import { ColorMode, useSite } from 'chayns-api';
import { SkeletonAnimationType } from '../types';
import { animate, useMotionValue, MotionValue, useTransform } from 'motion/react';

export interface ISkeletonContext {
    animationType?: SkeletonAnimationType;
    borderRadius?: number | string;
    baseColor?: string;
    highlightColor?: string;
    progress?: MotionValue<number>;
}

export const SkeletonContext = createContext<ISkeletonContext | undefined>(undefined);

SkeletonContext.displayName = 'SkeletonContext';

export const useSkeletonConfig = ({
    highlightColor,
    baseColor,
    animationType = SkeletonAnimationType.PULSE,
    borderRadius = 4,
}: ISkeletonContext) => {
    const { colorMode } = useSite();

    const progress = useMotionValue(0);

    useEffect(() => {
        const controls = animate(progress, 1, {
            duration: 2.4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
        });

        return controls.stop;
    }, [progress]);

    const defaultHighlightColor =
        colorMode === ColorMode.Dark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

    const defaultBaseColor = colorMode === ColorMode.Dark ? '#262626' : '#e5e5e5';

    return {
        animationType,
        borderRadius,
        baseColor: baseColor ?? defaultBaseColor,
        highlightColor: highlightColor ?? defaultHighlightColor,
        progress,
    };
};

export const useSkeletonAnimation = () => {
    const { animationType, progress } = useSkeletonContext();

    const opacity = useTransform(progress, [0, 0.5, 1], [0.06, 0.18, 0.06]);

    const x = useTransform(progress, [0, 1], ['-100%', '100%']);

    if (animationType === SkeletonAnimationType.PULSE) {
        return { opacity };
    }

    return { x };
};

export const useSkeletonContext = () => {
    const defaultValues = useSkeletonConfig({});

    const context = useContext(SkeletonContext);

    if (!context) {
        return defaultValues;
    }

    return context as Required<ISkeletonContext>;
};

export interface SkeletonProviderProps extends ISkeletonContext {
    children: ReactNode;
}

const SkeletonProvider: FC<SkeletonProviderProps> = ({
    animationType = SkeletonAnimationType.PULSE,
    baseColor,
    highlightColor,
    borderRadius = 4,
    children,
}) => {
    const value = useSkeletonConfig({ baseColor, borderRadius, highlightColor, animationType });

    return <SkeletonContext.Provider value={value}>{children}</SkeletonContext.Provider>;
};

SkeletonProvider.displayName = 'Skeleton.Config';

export default SkeletonProvider;
