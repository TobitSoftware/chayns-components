import React, { FC } from 'react';
import { Slider } from '@chayns-components/core';

const Component: FC = () => {
    return <Slider maxValue={100} minValue={0} />;
};

Component.displayName = 'Component';

export default Component;
