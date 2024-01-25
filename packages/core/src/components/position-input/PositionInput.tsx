import React, { FC, useMemo } from 'react';
import { StyledPositionInput } from './PositionInput.styles';

export type PositionInputProps = {};

const PositionInput: FC<PositionInputProps> = ({}) => {
    const test = '';

    return useMemo(() => <StyledPositionInput>Hallo Welt!</StyledPositionInput>, []);
};

PositionInput.displayName = 'PositionInput';

export default PositionInput;
