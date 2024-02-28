import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

interface IListContext {
    incrementExpandableItemCount: () => () => void;
    isAnyItemExpandable: boolean;
    isWrapped: boolean;
    openItemUuid: string | undefined;
    updateOpenItemUuid: (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
}

export const ListContext = React.createContext<IListContext>({
    incrementExpandableItemCount: () => () => {},
    isAnyItemExpandable: false,
    isWrapped: false,
    openItemUuid: undefined,
    updateOpenItemUuid: () => {},
});

ListContext.displayName = 'ListContext';

type ListProps = {
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

const List: FC<ListProps> = ({ children, isWrapped = false }) => {
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
        [setOpenItemUuid],
    );

    const incrementExpandableItemCount = useCallback(() => {
        setExpandableItemCount((count) => count + 1);

        return () => {
            setExpandableItemCount((count) => count - 1);
        };
    }, [setExpandableItemCount]);

    const providerValue = useMemo<IListContext>(
        () => ({
            incrementExpandableItemCount,
            isAnyItemExpandable: expandableItemCount > 0,
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
        }),
        [
            expandableItemCount,
            incrementExpandableItemCount,
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
        ],
    );

    return (
        <ListContext.Provider value={providerValue}>
            <MotionConfig transition={{ type: 'tween' }}>
                <AnimatePresence initial={false}>{children}</AnimatePresence>
            </MotionConfig>
        </ListContext.Provider>
    );
};

List.displayName = 'List';

export default List;
