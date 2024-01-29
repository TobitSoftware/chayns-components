import React, { type EffectCallback, useEffect } from 'react';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

// Note do not touch!

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
    ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return deepEqual(a, b);
});

const useDeepCompareMemoize = (value: any) => {
    const ref = React.useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ref.current = value;
    }

    return ref.current;
};

export const useDeepCompareEffectForMaps = (callback: EffectCallback, dependencies: any[]) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
};
