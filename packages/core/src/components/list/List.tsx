import { AnimatePresence, MotionConfig } from 'motion/react';
import React, { Children, FC, type ReactNode, useState } from 'react';
import ListItem, { type ListItemProps } from './list-item/ListItem';
import { type IListContext, ListContext, type ListProps } from './List.types';

const List: FC<ListProps> = ({ children, isWrapped = false }) => {
    'use memo';

    const isListItemElement = (
        child: ReactNode,
    ): child is React.ReactElement<ListItemProps, typeof ListItem> =>
        React.isValidElement(child) && child.type === ListItem;

    const [openItemUuid, setOpenItemUuid] = useState<IListContext['openItemUuid']>(undefined);

    const updateOpenItemUuid: IListContext['updateOpenItemUuid'] = (
        uuid,
        { shouldOnlyOpen } = {},
    ) => {
        setOpenItemUuid((currentOpenItemUuid) => {
            if (currentOpenItemUuid === uuid && shouldOnlyOpen !== true) {
                return undefined;
            }

            return uuid;
        });
    };

    const isAnyItemExpandable = (node: ReactNode): boolean => {
        let found = false;
        Children.forEach(node, (child) => {
            if (found) return;
            if (
                isListItemElement(child) &&
                !child.props.shouldHideIndicator &&
                child.props.children !== undefined
            ) {
                found = true;
            }
        });
        return found;
    };

    const providerValue = () => ({
        isAnyItemExpandable: isAnyItemExpandable(children),
        isWrapped,
        openItemUuid,
        updateOpenItemUuid,
    });

    return (
        <ListContext.Provider value={providerValue()}>
            <MotionConfig transition={{ type: 'tween' }}>
                <AnimatePresence initial={false}>{children}</AnimatePresence>
            </MotionConfig>
        </ListContext.Provider>
    );
};

List.displayName = 'List';

export default List;
