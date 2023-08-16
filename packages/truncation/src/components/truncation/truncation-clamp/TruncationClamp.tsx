import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

export type TruncationClampProps = {
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children: string;
};

const Clamp = styled.a`
    cursor: pointer;
    float: right;
`;

const TruncationClamp: FC<TruncationClampProps> = ({ onClick, children }) => (
    <Clamp onClick={onClick}>{children}</Clamp>
);

export default TruncationClamp;
