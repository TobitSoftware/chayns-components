import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useUuid } from '../../hooks/uuid';
import AccordionBody from './accordion-body/AccordionBody';
import { AccordionGroupContext } from './accordion-group/AccordionGroup';
import AccordionHead from './accordion-head/AccordionHead';
import { StyledAccordion } from './Accordion.styles';

export const AccordionContext = React.createContext({ isWrapped: false });

AccordionContext.displayName = 'AccordionContext';

type AccordionProps = {
    /**
     * The content of the accordion body
     */
    children: ReactNode;
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
     * This will gray out the title of the Accordion to indicate hidden content, for example.
     */
    isTitleGreyed?: boolean;
    /**
     * This value must be set for nested Accordions. This adjusts the style of
     * the head and the padding of the content.
     */
    isWrapped?: boolean;
    /**
     * Content to be displayed on the right side in the head of the Accordion
     */
    rightElement?: ReactNode;
    /**
     * Title of the Accordion displayed in the head
     */
    title: string;
    /**
     * Additional elements to be displayed in the header next to the title.
     */
    titleElement?: ReactNode;
};

const Accordion: FC<AccordionProps> = ({
    children,
    icon,
    isDefaultOpen = false,
    isFixed = false,
    isTitleGreyed = false,
    isWrapped = false,
    rightElement,
    title,
    titleElement,
}) => {
    const { openAccordionUuid, updateOpenAccordionUuid } = useContext(AccordionGroupContext);

    const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(isDefaultOpen);

    const uuid = useUuid();

    const isInGroup = typeof updateOpenAccordionUuid === 'function';

    const isOpen = isInGroup ? openAccordionUuid === uuid : isAccordionOpen;

    const handleHeadClick = useCallback(() => {
        if (typeof updateOpenAccordionUuid === 'function') {
            updateOpenAccordionUuid(uuid);
        }

        setIsAccordionOpen((currentIsAccordionOpen) => !currentIsAccordionOpen);
    }, [updateOpenAccordionUuid, uuid]);

    useEffect(() => {
        if (isDefaultOpen && typeof updateOpenAccordionUuid === 'function') {
            updateOpenAccordionUuid(uuid, { shouldOnlyOpen: true });
        }
    }, [isDefaultOpen, updateOpenAccordionUuid, uuid]);

    return (
        <MotionConfig transition={{ duration: 0.35 }}>
            <StyledAccordion
                className="beta-chayns-accordion"
                isOpen={isOpen}
                isWrapped={isWrapped}
            >
                <AccordionContext.Provider value={{ isWrapped }}>
                    <AccordionHead
                        icon={icon}
                        isOpen={isOpen}
                        isFixed={isFixed}
                        isTitleGreyed={isTitleGreyed}
                        isWrapped={isWrapped}
                        onClick={handleHeadClick}
                        rightElement={rightElement}
                        title={title}
                        titleElement={titleElement}
                    />
                    <AnimatePresence initial={false}>
                        {isOpen && <AccordionBody>{children}</AccordionBody>}
                    </AnimatePresence>
                </AccordionContext.Provider>
            </StyledAccordion>
        </MotionConfig>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;
