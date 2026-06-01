import { FinderContext } from '../Finder.types';

export const hasEntries = <E extends { id: string | number }>(
    data: FinderContext<E>['data'],
): boolean =>
    Object.values(data).some(
        (finderData) => Array.isArray(finderData?.entries) && finderData.entries.length > 0,
    );
