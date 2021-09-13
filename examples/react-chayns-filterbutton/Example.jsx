import React, { useState } from 'react';
import FilterButton from '../../src/react-chayns-filterbutton/component/FilterButton';

const items = [
    {
        icon: 'fal fa-globe',
        count: 41,
        label: 'Alle',
        rectangular: true,
    },
    {
        icon: 'ts-tobit',
        count: 33,
        label: 'Tobit.Software',
    },
    {
        icon: 'ts-chayns',
        count: 5,
        label: 'chayns',
    },
    {
        icon: 'ts-david',
        count: 3,
        label: 'david',
    },
];

const FilterButtonExample = () => {
    const [selected, setSelected] = useState([0]);

    const toggleItem = (index) => {
        const newSelected = [...selected];
        if (newSelected.includes(index)) {
            newSelected.splice(newSelected.indexOf(index), 1);
        } else {
            newSelected.push(index);
        }
        setSelected(newSelected);
    };

    return items.map((item, index) => (
        <FilterButton
            checked={selected.includes(index)}
            onChange={() => {
                toggleItem(index);
            }}
            {...item}
        />
    ));
};

export default FilterButtonExample;
