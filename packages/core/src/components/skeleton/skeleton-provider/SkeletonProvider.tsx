import React, { createContext, FC, ReactNode, useContext } from 'react';
import { ColorMode, useSite } from 'chayns-api';
import { SkeletonAnimationType } from '../types';

export interface ISkeletonContext {
    animationType?: SkeletonAnimationType;
    borderRadius?: number | string;
    baseColor?: string;
    highlightColor?: string;
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

    const defaultHighlightColor =
        colorMode === ColorMode.Dark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

    const defaultBaseColor = colorMode === ColorMode.Dark ? '#262626' : '#e5e5e5';

    return {
        animationType,
        borderRadius,
        baseColor: baseColor ?? defaultBaseColor,
        highlightColor: highlightColor ?? defaultHighlightColor,
    };
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

SkeletonProvider.displayName = 'SkeletonProvider';

export default SkeletonProvider;
