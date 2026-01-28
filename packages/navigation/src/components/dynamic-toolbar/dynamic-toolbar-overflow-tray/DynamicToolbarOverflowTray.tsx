import React, { FC, useMemo } from 'react';
import type { DynamicToolbarItem } from '../DynamicToolbar.types';
import { DYNAMIC_TOOLBAR_BADGE_MAX_VALUE } from '../DynamicToolbar.constants';
import DynamicToolbarItemButton from '../dynamic-toolbar-item-button/DynamicToolbarItemButton';
import {
    StyledDynamicToolbarOverflowTrayItems,
    StyledMotionDynamicToolbarOverflowTray,
    StyledMotionDynamicToolbarOverflowTraySpacer,
    StyledMotionDynamicToolbarOverflowTrayWrapper,
} from './DynamicToolbarOverflowTray.styles';

export type DynamicToolbarOverflowTrayProps = {
    activeItemId?: string | null;
    handleItemSelection: (item: DynamicToolbarItem) => void;
    items: DynamicToolbarItem[];
    isOpen: boolean;
};

const DynamicToolbarOverflowTray: FC<DynamicToolbarOverflowTrayProps> = ({
    activeItemId,
    handleItemSelection,
    items,
    isOpen,
}) => {
    const trayItems = useMemo(
        () =>
            items.map((item) => (
                <DynamicToolbarItemButton
                    badgeMaxValue={DYNAMIC_TOOLBAR_BADGE_MAX_VALUE}
                    isActive={item.id === activeItemId}
                    isInOverflowTray
                    item={item}
                    key={item.id}
                    onSelect={handleItemSelection}
                />
            )),
        [items, activeItemId, handleItemSelection],
    );

    return (
        <StyledMotionDynamicToolbarOverflowTrayWrapper>
            <StyledMotionDynamicToolbarOverflowTray
                animate={{ y: isOpen ? 0 : '100%' }}
                initial={false}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <StyledDynamicToolbarOverflowTrayItems>
                    {trayItems}
                </StyledDynamicToolbarOverflowTrayItems>
                <StyledMotionDynamicToolbarOverflowTraySpacer />
            </StyledMotionDynamicToolbarOverflowTray>
        </StyledMotionDynamicToolbarOverflowTrayWrapper>
    );
};

DynamicToolbarOverflowTray.displayName = 'DynamicToolbarOverflowTray';

export default DynamicToolbarOverflowTray;
