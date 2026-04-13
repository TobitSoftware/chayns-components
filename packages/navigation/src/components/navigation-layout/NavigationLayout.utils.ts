import {
    NavigationLayoutGroup,
    NavigationLayoutItem,
    NavigationLayoutItemLocation,
    NavigationLayoutItemReorderEvent,
    NavigationLayoutItemReorderTarget,
} from './NavigationLayout.types';

interface CloneNavigationLayoutItemsOptions {
    items: NavigationLayoutItem[];
}

interface AreNavigationLayoutParentIdsEqualOptions {
    parentIdsA: NavigationLayoutItem['id'][];
    parentIdsB: NavigationLayoutItem['id'][];
}

interface GetNavigationLayoutItemsByParentIdsOptions {
    items: NavigationLayoutItem[];
    parentIds: NavigationLayoutItem['id'][];
    shouldCreateMissingChildren?: boolean;
    shouldReturnEmptyChildrenAtLeaf?: boolean;
}

interface RemoveNavigationLayoutItemAtLocationOptions {
    items: NavigationLayoutItem[];
    location: NavigationLayoutItemLocation;
}

interface RemoveNavigationLayoutItemAtLocationResult {
    item: NavigationLayoutItem;
    items: NavigationLayoutItem[];
}

interface InsertNavigationLayoutItemAtLocationOptions {
    items: NavigationLayoutItem[];
    location: NavigationLayoutItemLocation;
    item: NavigationLayoutItem;
}

interface NormalizeNavigationLayoutReorderTargetOptions {
    source: NavigationLayoutItemReorderEvent['source'];
    target: NavigationLayoutItemReorderEvent['target'];
}

interface IsNavigationLayoutItemReorderEventValidOptions {
    items: NavigationLayoutItem[];
    event: NavigationLayoutItemReorderEvent;
}

interface ReorderNavigationLayoutGroupItemsOptions {
    items: NavigationLayoutItem[];
    event: NavigationLayoutItemReorderEvent;
}

interface ReorderNavigationLayoutGroupsOptions {
    groups: NavigationLayoutGroup[];
    event: NavigationLayoutItemReorderEvent;
}

interface IsNavigationLayoutReorderTargetEqualOptions {
    targetA: NavigationLayoutItemReorderTarget | null;
    targetB: NavigationLayoutItemReorderTarget | null;
}

const areNavigationLayoutParentIdsEqual = ({
    parentIdsA,
    parentIdsB,
}: AreNavigationLayoutParentIdsEqualOptions): boolean => {
    if (parentIdsA.length !== parentIdsB.length) {
        return false;
    }

    return parentIdsA.every((parentId, index) => parentId === parentIdsB[index]);
};

const cloneNavigationLayoutItems = ({
    items,
}: CloneNavigationLayoutItemsOptions): NavigationLayoutItem[] =>
    items.map((item) => ({
        ...item,
        children: item.children ? cloneNavigationLayoutItems({ items: item.children }) : undefined,
    }));

const getNavigationLayoutItemsByParentIds = ({
    items,
    parentIds,
    shouldCreateMissingChildren = false,
    shouldReturnEmptyChildrenAtLeaf = false,
}: GetNavigationLayoutItemsByParentIdsOptions): NavigationLayoutItem[] | null => {
    if (parentIds.length === 0) {
        return items;
    }

    const [parentId, ...remainingParentIds] = parentIds;
    const parentItem = items.find(({ id }) => id === parentId);

    if (!parentItem) {
        return null;
    }

    if (!parentItem.children) {
        if (remainingParentIds.length > 0) {
            return null;
        }

        if (!shouldCreateMissingChildren) {
            return shouldReturnEmptyChildrenAtLeaf ? [] : null;
        }

        parentItem.children = [];
    }

    return getNavigationLayoutItemsByParentIds({
        items: parentItem.children,
        parentIds: remainingParentIds,
        shouldCreateMissingChildren,
        shouldReturnEmptyChildrenAtLeaf,
    });
};

const removeNavigationLayoutItemAtLocation = ({
    items,
    location,
}: RemoveNavigationLayoutItemAtLocationOptions): RemoveNavigationLayoutItemAtLocationResult | null => {
    const parentItems = getNavigationLayoutItemsByParentIds({
        items,
        parentIds: location.parentIds,
        shouldCreateMissingChildren: true,
    });

    if (!parentItems || location.index < 0 || location.index >= parentItems.length) {
        return null;
    }

    const [item] = parentItems.splice(location.index, 1);

    if (!item) {
        return null;
    }

    return {
        item,
        items,
    };
};

const insertNavigationLayoutItemAtLocation = ({
    items,
    location,
    item,
}: InsertNavigationLayoutItemAtLocationOptions): NavigationLayoutItem[] => {
    const parentItems = getNavigationLayoutItemsByParentIds({
        items,
        parentIds: location.parentIds,
        shouldCreateMissingChildren: true,
    });

    if (!parentItems) {
        return items;
    }

    const nextIndex = Math.max(0, Math.min(location.index, parentItems.length));

    parentItems.splice(nextIndex, 0, item);

    return items;
};

const normalizeNavigationLayoutReorderTarget = ({
    source,
    target,
}: NormalizeNavigationLayoutReorderTargetOptions): NavigationLayoutItemReorderTarget => {
    if (
        areNavigationLayoutParentIdsEqual({
            parentIdsA: source.parentIds,
            parentIdsB: target.parentIds,
        }) &&
        source.index < target.index
    ) {
        return {
            ...target,
            index: target.index - 1,
        };
    }

    return target;
};

export const isNavigationLayoutReorderTargetEqual = ({
    targetA,
    targetB,
}: IsNavigationLayoutReorderTargetEqualOptions): boolean => {
    if (!targetA || !targetB) {
        return targetA === targetB;
    }

    return (
        targetA.itemId === targetB.itemId &&
        targetA.index === targetB.index &&
        targetA.placement === targetB.placement &&
        areNavigationLayoutParentIdsEqual({
            parentIdsA: targetA.parentIds,
            parentIdsB: targetB.parentIds,
        })
    );
};

export const isNavigationLayoutItemReorderEventValid = ({
    items,
    event,
}: IsNavigationLayoutItemReorderEventValidOptions): boolean => {
    const { itemId, source, target } = event;
    const sourceParentItems = getNavigationLayoutItemsByParentIds({
        items,
        parentIds: source.parentIds,
    });
    const sourceItem = sourceParentItems?.[source.index];

    if (!sourceParentItems || sourceItem?.id !== itemId || source.itemId !== itemId) {
        return false;
    }

    if (target.itemId === itemId || target.parentIds.includes(itemId)) {
        return false;
    }

    if (target.placement === 'inside' && !target.itemId) {
        return false;
    }

    const targetParentItems = getNavigationLayoutItemsByParentIds({
        items,
        parentIds: target.parentIds,
        shouldReturnEmptyChildrenAtLeaf: true,
    });

    if (!targetParentItems) {
        return false;
    }

    if (target.index < 0 || target.index > targetParentItems.length) {
        return false;
    }

    const normalizedTarget = normalizeNavigationLayoutReorderTarget({
        source,
        target,
    });

    return !(
        areNavigationLayoutParentIdsEqual({
            parentIdsA: source.parentIds,
            parentIdsB: normalizedTarget.parentIds,
        }) && source.index === normalizedTarget.index
    );
};

export const reorderNavigationLayoutGroupItems = ({
    items,
    event,
}: ReorderNavigationLayoutGroupItemsOptions): NavigationLayoutItem[] => {
    if (!isNavigationLayoutItemReorderEventValid({ items, event })) {
        return items;
    }

    const nextItems = cloneNavigationLayoutItems({ items });
    const sourceResult = removeNavigationLayoutItemAtLocation({
        items: nextItems,
        location: event.source,
    });

    if (!sourceResult) {
        return items;
    }

    const target = normalizeNavigationLayoutReorderTarget({
        source: event.source,
        target: event.target,
    });

    return insertNavigationLayoutItemAtLocation({
        items: sourceResult.items,
        location: target,
        item: sourceResult.item,
    });
};

export const reorderNavigationLayoutGroups = ({
    groups,
    event,
}: ReorderNavigationLayoutGroupsOptions): NavigationLayoutGroup[] => {
    const group = groups.find(({ id }) => id === event.groupId);

    if (!group) {
        return groups;
    }

    if (
        !isNavigationLayoutItemReorderEventValid({
            items: group.items,
            event,
        })
    ) {
        return groups;
    }

    return groups.map((currentGroup) => {
        if (currentGroup.id !== event.groupId) {
            return currentGroup;
        }

        return {
            ...currentGroup,
            items: reorderNavigationLayoutGroupItems({
                items: currentGroup.items,
                event,
            }),
        };
    });
};
