import { ComponentType, ReactNode } from 'react';

export const getFinderProviderType = <P>(Provider: ReactNode) =>
    Provider as unknown as ComponentType<P>;
