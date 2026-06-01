import { PropsWithChildren, type ReactElement } from 'react';

export const getFinderProviderType = <P extends PropsWithChildren>(
    Provider: ReactElement<P>,
): ReactElement<P> => Provider;
