import React, { FC, UIEvent, useMemo } from 'react';
import type { AccordionProps } from '../Accordion';
import { AccordionGroupContext } from '../accordion-group/AccordionGroup';
import { StyledMotionAccordionBody } from './AccordionBody.styles';

export type AccordionBodyProps = {
    /**
     * Maximum height of the element. This automatically makes the content of the element scrollable.
     */
    maxHeight: AccordionProps['bodyMaxHeight'];
    /**
     * Function that is executed when the element will be scrolled
     */
    onScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

const AccordionBody: FC<AccordionBodyProps> = ({ children, maxHeight, onScroll }) => {
    const AccordionGroupContextProviderValue = useMemo(
        () => ({ openAccordionUuid: undefined }),
        []
    );

    return (
        <StyledMotionAccordionBody
            animate={{ height: 'auto', opacity: 1 }}
            className="beta-chayns-accordion-body"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            maxHeight={maxHeight}
            onScroll={onScroll}
        >
            <AccordionGroupContext.Provider value={AccordionGroupContextProviderValue}>
                {children}
            </AccordionGroupContext.Provider>
        </StyledMotionAccordionBody>
    );
};

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
