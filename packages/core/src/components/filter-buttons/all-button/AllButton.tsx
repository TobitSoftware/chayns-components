import React from 'react';
import FilterButton, { FilterButtonProps } from '../filter-button/FilterButton';
import { FilterButtonItemShape } from '../../../types/filterButtons';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import textStrings from '../../../constants/textStrings';

export const AllButton = (props: Omit<FilterButtonProps, 'shape' | 'id' | 'text'>) => {
    const allText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.filterButtons.all),
    });
    return (
        <FilterButton
            shape={FilterButtonItemShape.Rectangular}
            text={allText}
            id="all"
            key="all"
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
        />
    );
};
