import React, { FC } from 'react';
import { StyledDynamicToolbarSpacer } from './DynamicToolbarSpacer.styles';
import type { DynamicToolbarSpacerProps } from './DynamicToolbarSpacer.types';
import { DYNAMIC_TOOLBAR_SPACER_BASE_CLASS } from '../dynamic-toolbar/DynamicToolbar.constants';

/**
 * Spacer for DynamicToolbar to prevent content from being overlapped.
 *
 * @description A spacer component that can be used to create space for the DynamicToolbar.
 * This can be used in lists or other scrollable content to prevent the toolbar from overlapping
 * content at the end of the list. If the toolbar is display in area layout this element will add
 * space for the toolbar height.
 */
const DynamicToolbarSpacer: FC<DynamicToolbarSpacerProps> = ({ className }) => {
    const spacerClassName = className
        ? `${DYNAMIC_TOOLBAR_SPACER_BASE_CLASS} ${className}`
        : DYNAMIC_TOOLBAR_SPACER_BASE_CLASS;

    return <StyledDynamicToolbarSpacer className={spacerClassName} />;
};

DynamicToolbarSpacer.displayName = 'DynamicToolbarSpacer';

export default DynamicToolbarSpacer;
