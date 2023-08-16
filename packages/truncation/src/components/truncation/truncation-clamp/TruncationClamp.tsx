import React, { FC, MouseEventHandler } from 'react';
import { Clamp } from './TruncationClamp.styles';

export type TruncationClampProps = {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children: string;
};

const TruncationClamp: FC<TruncationClampProps> = ({ onClick, children }) => (
    <Clamp onClick={onClick}>{children}</Clamp>
);

export default TruncationClamp;
