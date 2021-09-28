import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import AccordionBody from './accordion-body/AccordionBody';
import AccordionContent from './accordion-content/AccordionContent';
import AccordionHead from './accordion-head/AccordionHead';

type AccordionProps = {
    /**
     * Defines the group of the Accordion. Accordions with the same group are
     * automatically closed when an Accordion of the group is opened.
     */
    group?: string;
    /**
     * The icon that is displayed in front of the title
     */
    icon?: string;
    /**
     * This can be used to automatically expand the Accordion during the first render.
     */
    isDefaultOpen?: boolean;
    /**
     * This can be used so that the Accordion cannot be opened or closed.
     * In addition, in this case the icon is exchanged to mark the Accordions.
     */
    isFixed?: boolean;
    /**
     * This value must be set for nested Accordions. This adjusts the style of
     * the head and the padding of the content.
     */
    isWrapped?: boolean;
    /**
     * Content to be displayed on the right side in the head of the Accordion
     */
    right?: ReactNode;
    /**
     * Title of the Accordion displayed in the head
     */
    title: string;
};

interface AccordionOpenData {
    group: string;
    ref: React.RefObject<HTMLDivElement>;
}

type StyledMotionAccordionProps = Omit<AccordionProps, 'title'> & {
    isOpen: boolean;
};

const StyledAccordion = styled.div<StyledMotionAccordionProps>`
    ${({ isOpen, isWrapped }) =>
        isOpen &&
        !isWrapped &&
        css`
            background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
            border-radius: 3px; // ToDo: Add correct border-radius here
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15); // ToDo: Add correct box-shadow here
        `}

    margin-bottom: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '30px' : '0px')};

    transition: background-color 0.2s ease, border-radius 0.2s ease, box-shadow 0.2s ease,
        margin-bottom 0.2s ease;

    ${({ isWrapped }) =>
        !isWrapped &&
        css`
            margin-top: 10px;

            &:hover {
                background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
            }
        `}
`;

const Accordion: FC<AccordionProps> = ({
    children,
    group,
    icon,
    isDefaultOpen = false,
    isFixed,
    isWrapped,
    right,
    title,
}) => {
    const [isOpen, setIsOpen] = useState(isDefaultOpen);

    const accordionRef = useRef<HTMLDivElement>(null);

    const handleHeadClick = useCallback(() => {
        if (!isOpen && typeof group === 'string') {
            const customEvent = new CustomEvent<AccordionOpenData>('accordionOpen', {
                detail: { group, ref: accordionRef },
            });

            document.body.dispatchEvent(customEvent);
        }

        setIsOpen(!isOpen);
    }, [group, isOpen]);

    const handleAccordionOpen = useCallback(
        ({ detail }: CustomEvent<AccordionOpenData>) => {
            if (isOpen && group === detail.group && accordionRef.current !== detail.ref.current) {
                setIsOpen(false);
            }
        },
        [group, isOpen]
    );

    useEffect(() => {
        // @ts-expect-error: Type is correct here because its a custom event
        document.body.addEventListener('accordionOpen', handleAccordionOpen);

        return () => {
            // @ts-expect-error: Type is correct here because its a custom event
            document.body.removeEventListener('accordionOpen', handleAccordionOpen);
        };
    }, [handleAccordionOpen]);

    const items = useMemo(() => getBodyItems(children, { isWrapped }), [children, isWrapped]);

    return (
        <MotionConfig transition={{ duration: 0.25 }}>
            <StyledAccordion
                className="beta-chayns-accordion"
                isOpen={isOpen}
                isWrapped={isWrapped}
                ref={accordionRef}
            >
                <AccordionHead
                    icon={icon}
                    isOpen={isOpen}
                    isFixed={isFixed}
                    isWrapped={isWrapped}
                    onClick={handleHeadClick}
                    right={right}
                    title={title}
                />
                <AnimatePresence initial={false}>
                    {isOpen && <AccordionBody>{items}</AccordionBody>}
                </AnimatePresence>
            </StyledAccordion>
        </MotionConfig>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;

//region Utils
const isAccordion = (maybeAccordion: ReactNode): boolean =>
    maybeAccordion !== null &&
    maybeAccordion !== undefined &&
    typeof maybeAccordion !== 'boolean' &&
    typeof maybeAccordion !== 'string' &&
    typeof maybeAccordion !== 'number' &&
    'type' in maybeAccordion &&
    maybeAccordion?.type === Accordion;

interface GetBodyItemsOptions {
    isWrapped?: boolean;
}

const getBodyItems = (children: ReactNode, { isWrapped }: GetBodyItemsOptions) => {
    const items: ReactNode[] = [];
    let contentItems: ReactNode[] = [];

    if (
        children &&
        typeof children !== 'boolean' &&
        typeof children !== 'string' &&
        typeof children !== 'number' &&
        'type' in children &&
        children?.type === React.Fragment
    ) {
        children = children.props.children;
    }

    if (Array.isArray(children)) {
        children.forEach((child) => {
            if (!child) {
                return;
            }

            if (isAccordion(child)) {
                if (contentItems.length > 0) {
                    items.push(
                        <AccordionContent
                            key={`accordionContent__${items.length}`}
                            isWrapped={isWrapped}
                        >
                            {contentItems}
                        </AccordionContent>
                    );

                    contentItems = [];
                }
                items.push(child);
            } else {
                contentItems.push(child as JSX.Element);
            }
        });

        if (contentItems.length > 0) {
            items.push(
                <AccordionContent key={`accordionContent__${items.length}`} isWrapped={isWrapped}>
                    {contentItems}
                </AccordionContent>
            );
        }
    } else {
        if (isAccordion(children)) {
            items.push(children);
        } else {
            items.push(
                <AccordionContent key="accordionContent" isWrapped={isWrapped}>
                    {children}
                </AccordionContent>
            );
        }
    }

    return items;
};
//endregion
