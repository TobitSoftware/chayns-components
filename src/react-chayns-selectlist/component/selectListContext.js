import { createContext } from 'react';

const SelectListContext = createContext({
    selectListSelectedId: null,
    changeListItem: () => {},
});

export default SelectListContext;
