import { FinderContext } from '../Finder.types';

export const hasEntries = <E extends { id: string }>(data: FinderContext<E>['data']): boolean =>
    Object.values(data).some((finderData) => finderData.entries.length > 0);
