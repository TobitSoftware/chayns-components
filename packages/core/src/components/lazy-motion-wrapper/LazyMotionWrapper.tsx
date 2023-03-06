import { LazyMotion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';

export type LazyMotionWrapperProps = {
    children: ReactNode;
};

const loadFeatures = () => import('../../utils/motion-features').then((res) => res.default);

const LazyMotionWrapper: FC<LazyMotionWrapperProps> = ({ children }) => (
    <LazyMotion features={loadFeatures}>{children}</LazyMotion>
);

LazyMotionWrapper.displayName = 'LazyMotionWrapper';

export default LazyMotionWrapper;
