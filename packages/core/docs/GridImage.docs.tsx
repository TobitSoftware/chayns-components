import React, { FC } from 'react';
import { GridImage } from '@chayns-components/core';

const IMAGES = [
    'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
    'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
    'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
    'https://tsimg.cloud/77896-21884/fce5e30f68c75c8c524cc9ac0887832f263b79ff.png',
];

const Component: FC = () => {
    return <GridImage images={IMAGES} size={250} />;
};

Component.displayName = 'Component';

export default Component;
