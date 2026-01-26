import React, { FC } from 'react';
import { StyledDynamicToolbar } from './DynamicToolbar.styles';

export type DynamicToolbarProps = {
    // Add props here
};

const DynamicToolbar: FC<DynamicToolbarProps> = () => {
    return <StyledDynamicToolbar>{/* Add content here */}</StyledDynamicToolbar>;
};

export default DynamicToolbar;
