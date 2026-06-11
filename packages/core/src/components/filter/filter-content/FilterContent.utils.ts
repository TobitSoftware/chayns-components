import type { IComboBoxItems } from '../../combobox/ComboBox.types';
import type { SortConfig } from '../../../types/filter';

export const getSortComboBoxLists = (sortConfig: SortConfig): IComboBoxItems[] => [
    {
        list: sortConfig.items.map(({ text, id }) => ({
            text,
            value: id,
        })),
    },
];
