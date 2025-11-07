import { getDevice } from 'chayns-api';
import React, { FC, ReactNode, UIEvent } from 'react';
import { BrowserName } from '../../../types/chayns';
import { AccordionContext } from '../Accordion';
import { StyledAccordionContent } from './AccordionContent.styles';

export type AccordionContentProps = {
    /**
     * The content of the accordion content element
     */
    children: ReactNode;
    /**
     * Maximum height of the element. This automatically makes the content of the element scrollable.
     */
    maxHeight?: number;
    /**
     * Function that is executed when the element will be scrolled
     */
    onScroll?: (event: UIEvent<HTMLDivElement>) => void;
    /**
     * Whether the bottom space should be removed.
     */
    shouldPreventBottomSpace?: boolean;
};

const AccordionContent: FC<AccordionContentProps> = ({
    children,
    maxHeight,
    onScroll,
    shouldPreventBottomSpace = false,
}) => {
    const { browser } = getDevice();

    return (
        <StyledAccordionContent
            className="beta-chayns-accordion-content"
            $browser={browser?.name as BrowserName}
            $maxHeight={maxHeight}
            onScroll={onScroll}
            $shouldPreventBottomSpace={shouldPreventBottomSpace}
        >
            {children}
        </StyledAccordionContent>
    );
};

AccordionContent.displayName = 'AccordionContent';

export default AccordionContent;
