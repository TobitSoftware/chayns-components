import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, {
    ChangeEventHandler,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
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
     * This will disable the Accordion so that it cannot be opened and will gray out the title.
     */
    isDisabled?: boolean;
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
     * Function that is executed when the accordion will be closed.
     */
    onClose?: VoidFunction;
    /**
     * Function that is executed when the accordion will be opened.
     */
    onOpen?: VoidFunction;
    /**
     * Function that is executed when the text of the search in the accordion
     * head changes. When this function is given, the search field is displayed
     * in the Accordion Head.
     */
    onSearchChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Content to be displayed on the right side in the head of the Accordion
     */
    rightElement?: ReactNode;
    /**
     * Icon to be displayed on the right side in the search input
     */
    searchIcon?: string[];
    /**
     * The placeholder to be used for the search
     */
    searchPlaceholder?: string;
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
    isDisabled = false,
    isFixed = false,
    isTitleGreyed = false,
    isWrapped = false,
    onClose,
    onOpen,
    onSearchChange,
    rightElement,
    searchIcon,
    searchPlaceholder,
    title,
    titleElement,
}) => {
    const { openAccordionUuid, updateOpenAccordionUuid } = useContext(AccordionGroupContext);

    const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(isDefaultOpen);

    const uuid = useUuid();

    const isInitialRenderRef = useRef(true);

    const isInGroup = typeof updateOpenAccordionUuid === 'function';

    const isOpen = isInGroup ? openAccordionUuid === uuid : isAccordionOpen;

    const handleHeadClick = useCallback(() => {
        if (isDisabled) {
            return;
        }

        if (typeof updateOpenAccordionUuid === 'function') {
            updateOpenAccordionUuid(uuid);
        }

        setIsAccordionOpen((currentIsAccordionOpen) => !currentIsAccordionOpen);
    }, [isDisabled, updateOpenAccordionUuid, uuid]);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (isOpen) {
            if (typeof onOpen === 'function') {
                onOpen();
            }
        } else if (typeof onClose === 'function') {
            onClose();
        }
    }, [isOpen, onClose, onOpen]);

    useEffect(() => {
        if (isDefaultOpen && typeof updateOpenAccordionUuid === 'function') {
            updateOpenAccordionUuid(uuid, { shouldOnlyOpen: true });
        }
    }, [isDefaultOpen, updateOpenAccordionUuid, uuid]);

    return (
        <StyledAccordion className="beta-chayns-accordion" isOpen={isOpen} isWrapped={isWrapped}>
            <AccordionContext.Provider value={{ isWrapped }}>
                <MotionConfig transition={{ type: 'tween' }}>
                    <AccordionHead
                        icon={icon}
                        isOpen={isOpen}
                        isFixed={isFixed}
                        isTitleGreyed={isTitleGreyed || isDisabled}
                        isWrapped={isWrapped}
                        onClick={handleHeadClick}
                        onSearchChange={onSearchChange}
                        rightElement={rightElement}
                        searchIcon={searchIcon}
                        searchPlaceholder={searchPlaceholder}
                        title={title}
                        titleElement={titleElement}
                    />
                    <AnimatePresence initial={false}>
                        {isOpen && <AccordionBody>{children}</AccordionBody>}
                    </AnimatePresence>
                </MotionConfig>
            </AccordionContext.Provider>
        </StyledAccordion>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;
