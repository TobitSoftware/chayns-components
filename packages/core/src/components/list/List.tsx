import { AnimatePresence, MotionConfig } from 'motion/react';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

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

    const isListItemElement = (
        child: ReactNode,
    ): child is React.ReactElement<{ children?: ReactNode }> => {
        if (!React.isValidElement(child)) {
            return false;
        }

        const elementType = child.type as { displayName?: string; name?: string };

        return elementType.displayName === 'ListItem' || elementType.name === 'ListItem';
    };

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

    const hasExpandableChildren = (node: ReactNode): boolean => {
        let found = false;
        React.Children.forEach(node, (child) => {
            if (found) return;
            if (isListItemElement(child) && child.props.children !== undefined) {
                found = true;
            }
        });
        return found;
    };

    const providerValue = useMemo<IListContext>(
        () => ({
            isAnyItemExpandable: hasExpandableChildren(children),
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
