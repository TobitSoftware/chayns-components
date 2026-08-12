import React from 'react';
import FilterButton, { FilterButtonProps } from '../filter-button/FilterButton';
import { FilterButtonItemShape } from '../../../types/filterButtons';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

export const AllButton = (props: Omit<FilterButtonProps, 'shape' | 'id' | 'text'>) => {
    const { t } = useTranslation();
    const allText = t(textStrings.components.filterButtons.all);
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
