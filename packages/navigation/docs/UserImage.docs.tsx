import React, { FC } from 'react';
import { UserImage } from '@chayns-components/navigation';

interface ComponentProps {}

const Component: FC<ComponentProps> = () => {
    return <UserImage popupContent={[]} />;
};

Component.displayName = 'Component';

export default Component;
