import { FinderFilter, FinderData } from '../../../Finder.types';

export interface FinderGroupProps<E extends { id: string }> {
    entries: E[];
    filterKey: FinderFilter['key'];
    count: FinderData<E>['count'];
    shouldDisplayName: boolean;
}
