import { getDevice } from 'chayns-api';
import React, { FC, ReactNode, UIEvent, useMemo } from 'react';
import { BrowserName } from '../../../types/chayns';
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
    /**
     * Whether the animation should be skipped.
     */
    shouldSkipAnimation?: boolean;

    onAnimationComplete?: VoidFunction;
};

const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    maxHeight,
    onScroll,
    shouldHideBody,
    shouldSkipAnimation,
    onAnimationComplete,
}) => {
    const { browser } = getDevice();

    const AccordionGroupContextProviderValue = useMemo(
        () => ({ openAccordionUuid: undefined }),
        [],
    );

    return (
        <StyledMotionAccordionBody
            initial={
                shouldSkipAnimation ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
            }
            animate={{ height: shouldHideBody ? 0 : 'auto', opacity: shouldHideBody ? 0 : 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                height: shouldSkipAnimation ? { duration: 0, ease: 'linear' } : { duration: 0.25 },
                opacity: shouldSkipAnimation ? { duration: 0 } : { duration: 0.25 },
            }}
            className="beta-chayns-accordion-body"
            $maxHeight={maxHeight}
            $browser={browser?.name as BrowserName}
            onAnimationComplete={onAnimationComplete}
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
