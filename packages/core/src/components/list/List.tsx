import { AnimatePresence, MotionConfig } from 'motion/react';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

// to prevent import cycle with ListItem
type ExpandableListItemProps = {
    shouldHideIndicator?: boolean;
    children?: ReactNode;
};

type ExpandableChildrenComponent = React.ComponentType<{ children?: ReactNode }> & {
    hasExpandableChildren?: boolean;
};

const isListItemElement = (
    child: ReactNode,
): child is React.ReactElement<ExpandableListItemProps> =>
    React.isValidElement<ExpandableListItemProps>(child) &&
    (child.type as { displayName?: string }).displayName === 'ListItem';

const hasExpandableChildrenMarker = (child: ReactNode): boolean =>
    React.isValidElement(child) &&
    Boolean((child.type as ExpandableChildrenComponent).hasExpandableChildren);

const hasExpandableChildren = (node: ReactNode): boolean =>
    React.Children.toArray(node).some((child) => {
        if (
            isListItemElement(child) &&
            !child.props.shouldHideIndicator &&
            child.props.children !== undefined
        ) {
            return true;
        }

        if (hasExpandableChildrenMarker(child)) {
            return true;
        }

        if (
            React.isValidElement<{ children?: ReactNode }>(child) &&
            child.props.children !== undefined
        ) {
            return React.Children.toArray(child.props.children).some(
                (nestedChild) =>
                    isListItemElement(nestedChild) &&
                    !nestedChild.props.shouldHideIndicator &&
                    nestedChild.props.children !== undefined,
            );
        }

        return false;
    });

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
