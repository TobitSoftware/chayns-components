import React, { ChangeEvent, FC } from 'react';
import { SearchInput } from '@chayns-components/core';

const Component: FC = () => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    return <SearchInput onChange={handleChange} />;
};

Component.displayName = 'Component';

export default Component;
