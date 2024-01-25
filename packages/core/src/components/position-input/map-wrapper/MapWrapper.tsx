import React, { FC, useMemo } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { StyledMapWrapper } from './MapWrapper.styles';

export type MapWrapperProps = {};

const MapWrapper: FC<MapWrapperProps> = ({}) => {
    const test = '';

    const render = (status) => <h1>{status}</h1>;

    return useMemo(
        () => (
            <StyledMapWrapper>
                <Wrapper
                    apiKey="AIzaSyBGbwGTJij8qI_OJp0OHDP2e0EJVv41nI8"
                    render={render}
                    libraries={['places']}
                >
                    <Map>test</Map>
                </Wrapper>
            </StyledMapWrapper>
        ),
        [],
    );
};

MapWrapper.displayName = 'MapWrapper';

export default MapWrapper;
