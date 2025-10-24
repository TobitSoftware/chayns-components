import React, { FC } from 'react';
import { Typewriter } from '@chayns-components/typewriter';

const Component: FC = () => {
    return (
        <Typewriter>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel finibus nunc, a cursus
            magna.
        </Typewriter>
    );
};

Component.displayName = 'Component';

export default Component;
