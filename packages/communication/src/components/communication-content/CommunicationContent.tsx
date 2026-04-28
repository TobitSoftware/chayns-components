import React, { FC, useRef } from 'react';
import { CommunicationContentProps } from './CommunicationContent.types';
import { StyledCommunicationContent } from './CommunicationContent.styles';
import { useElementSize } from './CommunicationContent.hooks';
import SideContent from './side-content/SideContent';
import OverlayContent from './overlay-content/OverlayContent';

const CommunicationContent: FC<CommunicationContentProps> = ({
    content,
    shouldShowContent = false,
    breakPoint = 700,
    children,
    onDragEnd,
    sideContentConfig,
    overlayContentConfig,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { width, height } = useElementSize(ref);

    const isOverlayMode = width > 0 && width < breakPoint;

    return (
        <StyledCommunicationContent ref={ref}>
            {!isOverlayMode && shouldShowContent && (
                <SideContent onDragEnd={onDragEnd} config={sideContentConfig}>
                    {content}
                </SideContent>
            )}

            {isOverlayMode && shouldShowContent && (
                <OverlayContent config={overlayContentConfig} height={height}>
                    {content}
                </OverlayContent>
            )}

            {children}
        </StyledCommunicationContent>
    );
};

CommunicationContent.displayName = 'CommunicationContent';

export default CommunicationContent;
