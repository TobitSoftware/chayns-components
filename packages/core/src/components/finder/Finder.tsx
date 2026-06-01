import React, { cloneElement, forwardRef, isValidElement, PropsWithChildren, useMemo } from 'react';
import { FinderProps, FinderRef } from './Finder.types';
import FinderInner from './finder-inner/FinderInner';
import { FinderConfigContext } from './Finder.context';

const FinderComponent = <E extends { id: string | number }, P extends PropsWithChildren>(
    { Context, Provider, ...props }: FinderProps<E, P>,
    ref: React.ForwardedRef<FinderRef>,
) => {
    const value = useMemo(
        () => ({
            Context,
        }),
        [Context],
    );

    if (!Context || !Provider || !isValidElement(Provider)) {
        return null;
    }

    return (
        // @ts-expect-error type is correct and can't be parsed
        <FinderConfigContext.Provider value={value}>
            {cloneElement(Provider, undefined, <FinderInner ref={ref} {...props} />)}
        </FinderConfigContext.Provider>
    );
};

const Finder = forwardRef(FinderComponent) as <
    E extends { id: string | number },
    P extends PropsWithChildren,
>(
    props: FinderProps<E, P> & React.RefAttributes<FinderRef>,
) => React.ReactElement | null;

export default Finder;
