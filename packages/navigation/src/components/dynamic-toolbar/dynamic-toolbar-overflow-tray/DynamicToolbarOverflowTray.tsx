import React, { FC, useMemo } from 'react';
import type { DynamicToolbarItem } from '../DynamicToolbar.types';
import DynamicToolbarItemButton from '../dynamic-toolbar-item-button/DynamicToolbarItemButton';
import {
    StyledDynamicToolbarOverflowTrayItems,
    StyledMotionDynamicToolbarOverflowTray,
} from './DynamicToolbarOverflowTray.styles';

const BADGE_MAX_VALUE = 99;

export type DynamicToolbarOverflowTrayProps = {
    activeItemId?: string | null;
    handleItemSelection: (item: DynamicToolbarItem) => void;
    items: DynamicToolbarItem[];
};

const DynamicToolbarOverflowTray: FC<DynamicToolbarOverflowTrayProps> = ({
    activeItemId,
    handleItemSelection,
    items,
}) => {
    const trayItems = useMemo(
        () =>
            items.map((item) => (
                <DynamicToolbarItemButton
                    badgeMaxValue={BADGE_MAX_VALUE}
                    isActive={item.id === activeItemId}
                    isInOverflowTray
                    item={item}
                    key={item.id}
                    onSelect={handleItemSelection}
                />
            )),
        [],
    );

    return (
        <StyledMotionDynamicToolbarOverflowTray
            animate={{ height: 300 }}
            exit={{ height: 52 }}
            initial={{ height: 52 }}
            transition={{ duration: 0.2, type: 'tween' }}
        >
            <StyledDynamicToolbarOverflowTrayItems>
                {trayItems}
            </StyledDynamicToolbarOverflowTrayItems>
        </StyledMotionDynamicToolbarOverflowTray>
    );
};

DynamicToolbarOverflowTray.displayName = 'DynamicToolbarOverflowTray';

export default DynamicToolbarOverflowTray;
