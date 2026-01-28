import React, { FC } from 'react';
import { StyledDynamicToolbarSpacer } from './DynamicToolbarSpacer.styles';

const BASE_CLASS_NAME = 'beta-chayns-dynamic-toolbar-spacer';

type DynamicToolbarSpacerProps = {
    className?: string;
};

const DynamicToolbarSpacer: FC<DynamicToolbarSpacerProps> = ({ className }) => {
    const spacerClassName = className ? `${BASE_CLASS_NAME} ${className}` : BASE_CLASS_NAME;

    return <StyledDynamicToolbarSpacer className={spacerClassName} />;
};

DynamicToolbarSpacer.displayName = 'DynamicToolbarSpacer';

export default DynamicToolbarSpacer;
