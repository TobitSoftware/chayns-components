import { domAnimation, LazyMotion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';

export type LazyMotionWrapperProps = {
    children: ReactNode;
};

const LazyMotionWrapper: FC<LazyMotionWrapperProps> = ({ children }) => (
    <LazyMotion features={domAnimation}>{children}</LazyMotion>
);

LazyMotionWrapper.displayName = 'LazyMotionWrapper';

export default LazyMotionWrapper;
