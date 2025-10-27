import React, { FC } from 'react';
import { RadioButtonGroup, RadioButton } from '@chayns-components/core';

const Component: FC = () => {
    return (
        <RadioButtonGroup>
            <RadioButton id="1" />
            <RadioButton id="2" />
            <RadioButton id="3">Lorem</RadioButton>
        </RadioButtonGroup>
    );
};

Component.displayName = 'Component';

export default Component;
