import React, { FC, useState } from 'react';
import { TextArea } from '@chayns-components/core';

const Component: FC = () => {
    const [value, setValue] = useState('');

    return <TextArea value={value} onChange={(e) => setValue(e.target.value)} />;
};

Component.displayName = 'Component';

export default Component;
