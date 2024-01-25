import React, { FC, useMemo } from 'react';
import { StyledPositionInput } from './PositionInput.styles';
import Input from '../input/Input';
import MapWrapper from './map-wrapper/MapWrapper';

export type PositionInputProps = {
    /**
     * The placeholder of the search input.
     */
    searchPlaceholder?: string;
};

const PositionInput: FC<PositionInputProps> = ({ searchPlaceholder }) => {
    const test = '';

    return useMemo(
        () => (
            <StyledPositionInput>
                <Input placeholder={searchPlaceholder} />
                <MapWrapper />
            </StyledPositionInput>
        ),
        [searchPlaceholder],
    );
};

PositionInput.displayName = 'PositionInput';

export default PositionInput;
