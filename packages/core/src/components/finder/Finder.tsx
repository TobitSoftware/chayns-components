import React, { ComponentType, forwardRef, PropsWithChildren, useMemo } from 'react';
import { FinderProps, FinderRef } from './Finder.types';
import FinderInner from './finder-inner/FinderInner';
import { FinderConfigContext } from './Finder.context';

const FinderComponent = <E extends { id: string }, P extends PropsWithChildren>(
    { Context, Provider, ...props }: FinderProps<E, P>,
    ref: React.ForwardedRef<FinderRef>,
) => {
    const value = useMemo(
        () => ({
            Context,
        }),
        [Context],
    );

    if (!Context || !Provider) {
        return null;
    }

    const ProviderWithTypes = Provider as ComponentType<PropsWithChildren>;

    return (
        // @ts-expect-error type is correct and can't be parsed
        <FinderConfigContext.Provider value={value}>
            <ProviderWithTypes>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <FinderInner ref={ref} {...props} />
            </ProviderWithTypes>
        </FinderConfigContext.Provider>
    );
};

export const Finder = forwardRef(FinderComponent) as <
    E extends { id: string },
    P extends PropsWithChildren,
>(
    props: FinderProps<E, P> & React.RefAttributes<FinderRef>,
) => React.ReactElement | null;

export default Finder;
