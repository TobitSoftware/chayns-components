import React, { FC } from 'react';
import { StyledDynamicToolbarSpacer } from './DynamicToolbarSpacer.styles';
import type { DynamicToolbarSpacerProps } from './DynamicToolbarSpacer.types';
import { DYNAMIC_TOOLBAR_SPACER_BASE_CLASS } from '../dynamic-toolbar/DynamicToolbar.constants';

const DynamicToolbarSpacer: FC<DynamicToolbarSpacerProps> = ({ className }) => {
    const spacerClassName = className
        ? `${DYNAMIC_TOOLBAR_SPACER_BASE_CLASS} ${className}`
        : DYNAMIC_TOOLBAR_SPACER_BASE_CLASS;

    return <StyledDynamicToolbarSpacer className={spacerClassName} />;
};

DynamicToolbarSpacer.displayName = 'DynamicToolbarSpacer';

export default DynamicToolbarSpacer;
