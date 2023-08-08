import React, { FC, UIEvent, useEffect, useMemo, useRef, useState } from 'react';
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
    /**
     *
     */
    shouldHideBody: boolean;
};

const AccordionBody: FC<AccordionBodyProps> = ({
    children,
    maxHeight,
    onScroll,
    shouldHideBody,
}) => {
    const AccordionGroupContextProviderValue = useMemo(
        () => ({ openAccordionUuid: undefined }),
        []
    );

    const contentRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | 'auto'>('auto');

    useEffect(() => {
        if (contentRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;
                    setHeight(observedHeight);
                }
            });

            resizeObserver.observe(contentRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, []);

    return (
        <StyledMotionAccordionBody
            animate={{ height: shouldHideBody ? '0' : height, opacity: shouldHideBody ? 0 : 1 }}
            className="beta-chayns-accordion-body"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            maxHeight={maxHeight}
            onScroll={onScroll}
        >
            <AccordionGroupContext.Provider value={AccordionGroupContextProviderValue}>
                <div ref={contentRef}>{children}</div>
            </AccordionGroupContext.Provider>
        </StyledMotionAccordionBody>
    );
};

AccordionBody.displayName = 'AccordionBody';

export default AccordionBody;
