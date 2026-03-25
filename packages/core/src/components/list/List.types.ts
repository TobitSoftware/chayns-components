import { createContext, type ReactNode } from 'react';

export interface IListContext {
    isAnyItemExpandable: boolean;
    isWrapped: boolean;
    openItemUuid: string | undefined;
    updateOpenItemUuid: (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
}

export const ListContext = createContext<IListContext>({
    isAnyItemExpandable: false,
    isWrapped: false,
    openItemUuid: undefined,
    updateOpenItemUuid: () => {},
});

ListContext.displayName = 'ListContext';

export type ListProps = {
    /**
     * The items of the list
     */
    children: ReactNode;
    /**
     * This value must be set for nested AccordionGroup components. This adjusts the style of
     * the head and the padding of the content accordions.
     */
    isWrapped?: boolean;
};
