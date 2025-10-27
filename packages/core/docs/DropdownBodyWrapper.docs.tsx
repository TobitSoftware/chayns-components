import React, { FC, useRef } from 'react';
import { DropdownBodyWrapper } from '@chayns-components/core';

const Component: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <div ref={ref} />
            {ref.current && (
                <DropdownBodyWrapper anchorElement={ref.current} shouldShowDropdown>
                    Lorem
                </DropdownBodyWrapper>
            )}
        </>
    );
};

Component.displayName = 'Component';

export default Component;
