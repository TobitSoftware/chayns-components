import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

interface IListContext {
    incrementExpandableItemCount: () => () => void;
    isAnyItemExpandable: boolean;
    openItemUuid: string | undefined;
    updateOpenItemUuid: (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
}

export const ListContext = React.createContext<IListContext>({
    incrementExpandableItemCount: () => () => {},
    isAnyItemExpandable: false,
    openItemUuid: undefined,
    updateOpenItemUuid: () => {},
});

ListContext.displayName = 'ListContext';

type ListProps = {
    /**
     * The items of the list
     */
    children: ReactNode;
};

const List: FC<ListProps> = ({ children }) => {
    const [openItemUuid, setOpenItemUuid] = useState<IListContext['openItemUuid']>(undefined);
    const [expandableItemCount, setExpandableItemCount] = useState<number>(0);

    const updateOpenItemUuid = useCallback<IListContext['updateOpenItemUuid']>(
        (uuid, { shouldOnlyOpen } = {}) => {
            setOpenItemUuid((currentOpenItemUuid) => {
                if (currentOpenItemUuid === uuid && shouldOnlyOpen !== true) {
                    return undefined;
                }

                return uuid;
            });
        },
        [setOpenItemUuid]
    );

    const incrementExpandableItemCount = useCallback(() => {
        setExpandableItemCount((count) => count + 1);

        return () => {
            setExpandableItemCount((count) => count - 1);
        };
    }, [setExpandableItemCount]);

    const providerValue = useMemo<IListContext>(
        () => ({
            isAnyItemExpandable: expandableItemCount > 0,
            updateOpenItemUuid,
            openItemUuid,
            incrementExpandableItemCount,
        }),
        [expandableItemCount, incrementExpandableItemCount, openItemUuid, updateOpenItemUuid]
    );

    return <ListContext.Provider value={providerValue}>{children}</ListContext.Provider>;
};

List.displayName = 'List';

export default List;
