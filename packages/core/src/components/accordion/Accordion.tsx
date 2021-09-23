import React, { FC, MouseEventHandler, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import AccordionHead from './accordion-head/AccordionHead';
import AccordionBody from './accordion-body/AccordionBody';
import AccordionContent from './accordion-content/AccordionContent';

type AccordionProps = {
    /**
     * The content of the accordion
     */
    dataGroup?: string;
    icon?: string;
    isWrapped?: boolean;
    right?: JSX.Element;
    title: string;
};

const StyledAccordion = styled.div``;

const Accordion: FC<AccordionProps> = ({ children, title }) => {
    const items = useMemo(() => getBodyItems(children), [children]);

    return (
        <StyledAccordion>
            <AccordionHead title={title} />
            <AccordionBody>{items}</AccordionBody>
        </StyledAccordion>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;

//region Utils
const isAccordion = (maybeAccordion: ReactNode) =>
    maybeAccordion &&
    typeof maybeAccordion !== 'boolean' &&
    typeof maybeAccordion !== 'string' &&
    typeof maybeAccordion !== 'number' &&
    'type' in maybeAccordion &&
    maybeAccordion?.type === Accordion;

const getBodyItems = (children: ReactNode | undefined) => {
    const items: ReactNode[] = [];
    let contentItems: ReactNode[] = [];

    if (Array.isArray(children)) {
        children.forEach((child) => {
            if (!child) {
                return;
            }

            if (isAccordion(child)) {
                if (contentItems.length > 0) {
                    items.push(<AccordionContent>{contentItems}</AccordionContent>);
                    contentItems = [];
                }
                items.push(child);
            } else {
                contentItems.push(child as JSX.Element);
            }
        });

        if (contentItems.length > 0) {
            items.push(<AccordionContent>{contentItems}</AccordionContent>);
        }
    } else {
        if (isAccordion(children)) {
            items.push(children);
        } else {
            contentItems.push(<AccordionContent>{children}</AccordionContent>);
        }
    }

    return items;
};
//endregion
