import React, {
    FC,
    MouseEventHandler,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled, { css } from 'styled-components';
import AccordionHead from './accordion-head/AccordionHead';
import AccordionBody from './accordion-body/AccordionBody';
import AccordionContent from './accordion-content/AccordionContent';
import { motion, MotionConfig } from 'framer-motion';

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
            border-radius: 3px;
            box-shadow: 0 2px 6px 0 rgb(0 0 0 / 15%);
        `}

    margin-bottom: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '30px' : '0px')};
    margin-top: 10px;
    transition: background-color 0.2s ease, border-radius 0.2s ease, box-shadow 0.2s ease,
        margin-bottom 0.2s ease;

    ${({ isWrapped }) =>
        !isWrapped &&
        css`
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
    isWrapped,
    right,
    title,
}) => {
    const [isOpen, setIsOpen] = useState(isDefaultOpen);

    const accordionRef = useRef<HTMLDivElement>(null);

    const handleHeadClick = useCallback(() => {
        if (!isOpen && typeof group === 'string') {
            const customEvent = new CustomEvent<AccordionOpenData>('accordionOpen', {
                detail: { group: group, ref: accordionRef },
            });

            document.body.dispatchEvent(customEvent);
        }

        setIsOpen(!isOpen);
    }, [group, isOpen]);

    const items = useMemo(() => getBodyItems(children), [children]);

    return (
        <MotionConfig transition={{ duration: 0.25 }}>
            <StyledAccordion isOpen={isOpen} isWrapped={isWrapped} ref={accordionRef}>
                <AccordionHead
                    icon={icon}
                    isOpen={isOpen}
                    isWrapped={isWrapped}
                    onClick={handleHeadClick}
                    right={right}
                    title={title}
                />
            </StyledAccordion>
        </MotionConfig>
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

const getBodyItems = (children: ReactNode) => {
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
