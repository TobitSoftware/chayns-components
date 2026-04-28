import React from 'react';
import FilterButton, { FilterButtonProps } from '../filter-button/FilterButton';
import { FilterButtonItemShape } from '../../../types/filterButtons';
import { getFixedT } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

export const AllButton = (props: Omit<FilterButtonProps, 'shape' | 'id' | 'text'>) => {
    const allText = getFixedT(textStrings.filter.allButton.label);

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

AllButton.displayName = 'AllButton';
