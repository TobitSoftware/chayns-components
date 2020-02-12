import React from 'react';
import FilterButton from '../../src/react-chayns-filterbutton/component/FilterButton';

const FilterButtonExample = () => (
    <div>
        <FilterButton icon="ts-tobit" checked count={33} label="Tobit.Software" />
        <FilterButton icon="ts-chayns" count={5} label="chayns" />
        <FilterButton icon="ts-david" count={3} label="david" />
    </div>
);

export default FilterButtonExample;
