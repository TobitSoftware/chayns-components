import React, { FC, useState } from 'react';
import { Input } from '@chayns-components/core';

const Component: FC = () => {
    const [value, setValue] = useState('');

    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

Component.displayName = 'Component';

export default Component;
