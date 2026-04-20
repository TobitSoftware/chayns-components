import { AnimatePresence, MotionConfig } from 'motion/react';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { shouldShowExpandIndicator } from './List.utils';

interface IListContext {
    isAnyItemExpandable: boolean;
    isWrapped: boolean;
    openItemUuid: string | undefined;
    updateOpenItemUuid: (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
}

export const ListContext = React.createContext<IListContext>({
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
    'use memo';

    const [openItemUuid, setOpenItemUuid] = useState<IListContext['openItemUuid']>(undefined);

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

    const providerValue = useMemo<IListContext>(
        () => ({
            isAnyItemExpandable: shouldShowExpandIndicator(children),
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
        }),
        [children, isWrapped, openItemUuid, updateOpenItemUuid],
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
