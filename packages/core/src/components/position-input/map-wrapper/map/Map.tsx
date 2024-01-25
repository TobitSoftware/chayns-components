import React, { FC, useMemo } from 'react';
import {StyledMap} from "./Map.styles";

export type MapProps = {
};

const Map: FC<MapProps> = ({}) => {
    const test = '';

    return useMemo(
        () => (
            <StyledMap>
                test
            </StyledMap>
        ),
        [],
    );
};

Map.displayName = 'Map';

export default Map;
