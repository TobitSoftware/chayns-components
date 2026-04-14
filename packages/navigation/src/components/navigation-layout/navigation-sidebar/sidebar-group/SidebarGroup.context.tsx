import React, { ReactNode, createContext, useContext } from 'react';
import {
    NavigationLayoutItem,
    NavigationLayoutItemReorderSource,
    NavigationLayoutItemReorderTarget,
} from '../../NavigationLayout.types';

interface SidebarGroupReorderContextValue {
    draggedItemId?: NavigationLayoutItem['id'];
    dropTarget: NavigationLayoutItemReorderTarget | null;
    isDragging: boolean;
    isReorderEnabled: boolean;
    onDragEnd: VoidFunction;
    onDragStart: (
        event: React.DragEvent<HTMLDivElement>,
        item: NavigationLayoutItemReorderSource,
    ) => void;
    onDrop: (target: NavigationLayoutItemReorderTarget) => void;
    onDropTargetChange: (target: NavigationLayoutItemReorderTarget) => void;
}

interface SidebarGroupReorderProviderProps {
    children: ReactNode;
    value: SidebarGroupReorderContextValue;
}

const SidebarGroupReorderContext = createContext<SidebarGroupReorderContextValue | null>(null);

export const SidebarGroupReorderProvider = ({
    children,
    value,
}: SidebarGroupReorderProviderProps) => (
    <SidebarGroupReorderContext.Provider value={value}>
        {children}
    </SidebarGroupReorderContext.Provider>
);

SidebarGroupReorderProvider.displayName = 'SidebarGroupReorderProvider';

export const useSidebarGroupReorderContext = (): SidebarGroupReorderContextValue => {
    const context = useContext(SidebarGroupReorderContext);

    if (!context) {
        throw new Error(
            'useSidebarGroupReorderContext must be used within SidebarGroupReorderProvider.',
        );
    }

    return context;
};
