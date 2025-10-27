import React, { FC } from 'react';
import { GroupedImage } from '@chayns-components/core';

const IMAGES = [
    'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
    'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
];

const Component: FC = () => {
    return <GroupedImage images={IMAGES} />;
};

Component.displayName = 'Component';

export default Component;
