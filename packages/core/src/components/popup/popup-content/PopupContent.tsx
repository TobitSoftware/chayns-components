import React, { type ReactNode } from 'react';
import { StyledPopupContent } from './PopupContent.styles';

type PopupContentProps = {
    /**
     * The elements that should be displayed inside the popup content.
     */
    children?: ReactNode;
};

const PopupContent = ({ children }: PopupContentProps) => (
    <StyledPopupContent>{children}</StyledPopupContent>
);

PopupContent.displayName = 'PopupContent';

export default PopupContent;
