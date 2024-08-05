import { getDevice } from 'chayns-api';
import React, { FC, ReactNode, UIEvent, useMemo } from 'react';
import type { AccordionProps } from '../Accordion';
import { AccordionGroupContext } from '../accordion-group/AccordionGroup';
import { StyledMotionAccordionBody } from './AccordionBody.styles';

export type AccordionBodyProps = {
    /**
     * The elements that should be shown inside the body.
     */
    children: ReactNode;
    /**
     * Maximum height of the element. This automatically makes the content of the element scrollable.
     */
    maxHeight: AccordionProps['bodyMaxHeight'];
    /**
     * Function that is executed when the element will be scrolled
     */
    onScroll?: (event: UIEvent<HTMLDivElement>) => void;
    /**
     * Whether the body should be shown.
     */
    shouldHideBody: boolean;

    onAnimationEnd?: VoidFunction;
};

const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    maxHeight,
    onScroll,
    shouldHideBody,
    onAnimationEnd,
}) => {
    const { browser } = getDevice();

    const AccordionGroupContextProviderValue = useMemo(
        () => ({ openAccordionUuid: undefined }),
        [],
    );

    return (
        <StyledMotionAccordionBody
            animate={{ height: shouldHideBody ? '0' : 'auto', opacity: shouldHideBody ? 0 : 1 }}
            className="beta-chayns-accordion-body"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            $maxHeight={maxHeight}
            $browser={browser?.name}
            onAnimationComplete={onAnimationEnd}
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
