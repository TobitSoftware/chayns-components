import React, { FC, useMemo } from 'react';
import { StyledMarker } from './Marker.styles';

export type MarkerProps = {};

const Marker: FC<MarkerProps> = ({}) => {
    const test = '';

    return useMemo(() => <StyledMarker>test</StyledMarker>, []);
};

Marker.displayName = 'Marker';

export default Marker;
