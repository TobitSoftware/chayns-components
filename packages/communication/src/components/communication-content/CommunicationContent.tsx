import React, { FC, useRef } from 'react';
import { CommunicationContentProps } from './CommunicationContent.types';
import { StyledCommunicationContent } from './CommunicationContent.styles';
import { useElementSize } from './CommunicationContent.hooks';
import SideContent from './side-content/SideContent';

const CommunicationContent: FC<CommunicationContentProps> = ({
    content,
    shouldShowContent = false,
    breakPoint = 700,
    children,
    onChange,
    sideContentConfig,
    overlayContentConfig,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { width, height } = useElementSize(ref);

    const isOverlayMode = width > 0 && width < breakPoint;

    return (
        <StyledCommunicationContent ref={ref}>
            <SideContent onChange={onChange} config={sideContentConfig}>
                {content}
            </SideContent>

            {children}
        </StyledCommunicationContent>
    );
};

CommunicationContent.displayName = 'CommunicationContent';

export default CommunicationContent;
