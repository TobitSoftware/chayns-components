import type { IFilterButtonItem } from './interface';

interface SelectFilterButtonItemByKeyOptions {
    key: string;
    items: IFilterButtonItem[];
}

export const selectFilterButtonItemByKey = ({ key, items }: SelectFilterButtonItemByKeyOptions) =>
    items.find(({ id }) => id === key);
