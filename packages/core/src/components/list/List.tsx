import { AnimatePresence, MotionConfig } from 'motion/react';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useColorScheme } from '../color-scheme-provider/ColorSchemeProvider';
import { useUuid } from '../../hooks/uuid';
import { shouldShowExpandIndicator } from './List.utils';

interface IListContext {
    isAnyItemExpandable: boolean;
    isWrapped: boolean;
    openItemUuid: string | undefined;
    updateOpenItemUuid: (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
    shouldEnableKeyboardHighlighting: boolean;
    listGroupUuid?: string;
    listItemUuids?: string[];
    registerListItemUuid?: (uuid: string) => void;
    unregisterListItemUuid?: (uuid: string) => void;
    activeListItemUuid?: string;
    updateActiveListItemUuid?: (uuid?: string) => void;
}

export const ListContext = React.createContext<IListContext>({
    isAnyItemExpandable: false,
    isWrapped: false,
    openItemUuid: undefined,
    updateOpenItemUuid: () => {},
    shouldEnableKeyboardHighlighting: false,
    listGroupUuid: undefined,
    listItemUuids: undefined,
    registerListItemUuid: undefined,
    unregisterListItemUuid: undefined,
    activeListItemUuid: undefined,
    updateActiveListItemUuid: undefined,
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
    /**
     * Enables keyboard-only focus highlighting and arrow-key navigation within the list.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};

const List: FC<ListProps> = ({ children, isWrapped = false, shouldEnableKeyboardHighlighting }) => {
    'use memo';

    const colorScheme = useColorScheme();
    const shouldEnableKeyboardHighlightingEffective =
        shouldEnableKeyboardHighlighting ?? colorScheme?.shouldEnableKeyboardHighlighting ?? false;

    const [openItemUuid, setOpenItemUuid] = useState<IListContext['openItemUuid']>(undefined);
    const [listItemUuids, setListItemUuids] = useState<string[]>();
    const [activeListItemUuid, setActiveListItemUuid] =
        useState<IListContext['activeListItemUuid']>(undefined);

    const listGroupUuid = useUuid();

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

    const sortListItemUuidsByDom = useCallback(
        (uuids: string[]) => {
            if (typeof document === 'undefined') {
                return uuids;
            }

            const domOrderedUuids = Array.from(
                document.querySelectorAll<HTMLElement>(`[data-uuid^="${listGroupUuid}---"]`),
            )
                .map((element) => element.getAttribute('data-uuid')?.split('---')[1])
                .filter((uuid): uuid is string => Boolean(uuid));

            return domOrderedUuids.filter((uuid) => uuids.includes(uuid));
        },
        [listGroupUuid],
    );

    const registerListItemUuid = useCallback(
        (uuid: string) => {
            setListItemUuids((currentListItemUuids = []) => {
                const nextListItemUuids = currentListItemUuids.includes(uuid)
                    ? currentListItemUuids
                    : [...currentListItemUuids, uuid];

                return sortListItemUuidsByDom(nextListItemUuids);
            });
        },
        [sortListItemUuidsByDom],
    );

    const unregisterListItemUuid = useCallback((uuid: string) => {
        setListItemUuids((currentListItemUuids = []) =>
            currentListItemUuids.filter((currentUuid) => currentUuid !== uuid),
        );
    }, []);

    const updateActiveListItemUuid = useCallback((uuid?: string) => {
        setActiveListItemUuid(uuid);
    }, []);

    const providerValue = useMemo<IListContext>(
        () => ({
            isAnyItemExpandable: shouldShowExpandIndicator(children),
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
            shouldEnableKeyboardHighlighting: shouldEnableKeyboardHighlightingEffective,
            listGroupUuid,
            listItemUuids,
            registerListItemUuid,
            unregisterListItemUuid,
            activeListItemUuid,
            updateActiveListItemUuid,
        }),
        [
            children,
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
            shouldEnableKeyboardHighlightingEffective,
            listGroupUuid,
            listItemUuids,
            registerListItemUuid,
            unregisterListItemUuid,
            activeListItemUuid,
            updateActiveListItemUuid,
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
