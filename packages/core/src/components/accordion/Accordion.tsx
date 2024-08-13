import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, {
    ChangeEventHandler,
    FC,
    ReactNode,
    UIEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type MouseEventHandler,
} from 'react';
import { useUuid } from '../../hooks/uuid';
import { AreaContext } from '../area-provider/AreaContextProvider';
import type { InputProps } from '../input/Input';
import AccordionBody from './accordion-body/AccordionBody';
import { AccordionGroupContext } from './accordion-group/AccordionGroup';
import AccordionHead from './accordion-head/AccordionHead';
import { AccordionWrappedContext } from './accordion-provider/AccordionContextProvider';
import { StyledMotionAccordion } from './Accordion.styles';

export const AccordionContext = React.createContext({ isWrapped: false });

export type AccordionProps = {
    /**
     * Maximum height of the accordion body element. This automatically makes the content of the
     * body element scrollable.
     */
    bodyMaxHeight?: number;
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
     * This will disable the Accordion so that it cannot be opened and will gray out the title. Does not work with isOpened.
     */
    isDisabled?: boolean;
    /**
     * This can be used so that the Accordion cannot be opened or closed.
     * In addition, in this case the icon is exchanged to mark the Accordions.
     */
    isFixed?: boolean;
    /**
     * This can be used to open the Accordion from the outside
     */
    isOpened?: boolean;
    /**
     * This will gray out the title of the Accordion to indicate hidden content, for example.
     */
    isTitleGreyed?: boolean;
    /**
     * Function that is executed when the accordion body will be scrolled
     */
    onBodyScroll?: (event: UIEvent<HTMLDivElement>) => void;
    /**
     * Function that is executed when the accordion will be closed.
     */
    onClose?: VoidFunction;
    /**
     * Function to be executed when the accordion is no longer hovered.
     */
    onHoverEnd?: MouseEventHandler<HTMLDivElement>;
    /**
     * Function to be executed when the accordion is hovered.
     */
    onHoverStart?: MouseEventHandler<HTMLDivElement>;
    /**
     * Function that is executed when the accordion will be opened.
     */
    onOpen?: VoidFunction;
    /**
     * Function that is executed when the accordion body is animated
     */
    onBodyAnimationComplete?: VoidFunction;
    /**
     * Function that is executed when the text of the search in the accordion
     * head changes. When this function is given, the search field is displayed
     * in the Accordion Head.
     */
    onSearchChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Function that is executed when the text of the search in the accordion
     * title changes. When this function is given, the search field is displayed
     * as the Accordion title.
     */
    onTitleInputChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Content to be displayed on the right side in the head of the Accordion
     */
    rightElement?: ReactNode;
    /**
     * The placeholder to be used for the search
     */
    searchPlaceholder?: string;
    /**
     * The value that is displayed inside the search
     */
    searchValue?: string;
    /**
     * This will force the background color of the accordion to be used even if it is closed and not hovered.
     */
    shouldForceBackground?: boolean;
    /**
     * This will hide the background color of the accordion
     */
    shouldHideBackground?: boolean;
    /**
     * This will render the Accordion closed on the first render.
     */
    shouldRenderClosed?: boolean;
    /**
     * Whether the icon should be rotating.
     */
    shouldRotateIcon?: boolean;
    /**
     * Title of the Accordion displayed in the head
     */
    title: string;
    /**
     * Additional elements to be displayed in the header next to the title.
     */
    titleElement?: ReactNode;
    /**
     * The props of the title Input.
     */
    titleInputProps?: InputProps;
    /**
     * The title color.
     */
    titleColor?: CSSProperties['color'];
};

const Accordion: FC<AccordionProps> = ({
    bodyMaxHeight,
    children,
    icon,
    isDefaultOpen = false,
    isDisabled = false,
    isFixed = false,
    isOpened,
    isTitleGreyed = false,
    onBodyScroll,
    onClose,
    onHoverEnd,
    onHoverStart,
    onOpen,
    onSearchChange,
    rightElement,
    searchPlaceholder,
    searchValue,
    shouldForceBackground = false,
    shouldHideBackground = false,
    shouldRenderClosed = false,
    shouldRotateIcon = true,
    title,
    titleElement,
    onTitleInputChange,
    titleInputProps,
    titleColor,
    onBodyAnimationComplete,
}) => {
    const {
        isWrapped: groupIsWrapped,
        openAccordionUuid,
        accordionGroupUuid,
        accordionUuids,
        updateOpenAccordionUuid,
    } = useContext(AccordionGroupContext);
    const { isWrapped: isParentWrapped } = useContext(AccordionContext);

    const { isWrapped: contextIsWrapped } = useContext(AccordionWrappedContext);
    const isWrapped = useMemo(
        () => groupIsWrapped ?? contextIsWrapped,
        [contextIsWrapped, groupIsWrapped],
    );

    const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(isDefaultOpen ?? isOpened);

    const uuid = useUuid();

    const isInitialRenderRef = useRef(true);

    const isInGroup = typeof updateOpenAccordionUuid === 'function';

    const isOpen = isInGroup ? openAccordionUuid === uuid : isAccordionOpen;

    const isOpenRef = useRef(isOpen);
    const onCloseRef = useRef(onClose);
    const onOpenRef = useRef(onOpen);

    const isLastAccordion = useMemo(
        () => (accordionUuids ? accordionUuids[accordionUuids.length - 1] === uuid : false),
        [accordionUuids, uuid],
    );

    useEffect(() => {
        isOpenRef.current = isOpen;
        onCloseRef.current = onClose;
        onOpenRef.current = onOpen;
    }, [isOpen, onClose, onOpen]);

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
        if (isDisabled && isOpen) {
            if (typeof updateOpenAccordionUuid === 'function') {
                updateOpenAccordionUuid(uuid);
            }

            setIsAccordionOpen((currentIsAccordionOpen) => !currentIsAccordionOpen);
        }
    }, [isDisabled, isOpen, updateOpenAccordionUuid, uuid]);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (isOpen) {
            if (typeof onOpenRef.current === 'function') {
                onOpenRef.current();
            }
        } else if (typeof onCloseRef.current === 'function') {
            onCloseRef.current();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isDefaultOpen) {
            if (typeof updateOpenAccordionUuid === 'function') {
                updateOpenAccordionUuid(uuid, { shouldOnlyOpen: true });
            } else {
                setIsAccordionOpen(true);
            }
        }
    }, [isDefaultOpen, updateOpenAccordionUuid, uuid]);

    useEffect(() => {
        if (typeof isOpened === 'boolean') {
            if (typeof updateOpenAccordionUuid === 'function' && isOpened !== isOpenRef.current) {
                updateOpenAccordionUuid(uuid);
            } else {
                setIsAccordionOpen(isOpened);
            }
        }
    }, [isOpened, updateOpenAccordionUuid, uuid]);

    const accordionContextProviderValue = useMemo(
        () => ({ isWrapped: isWrapped === true }),
        [isWrapped],
    );

    const areaContextProviderValue = useMemo(() => ({ shouldChangeColor: true }), []);

    const accordionWrappedContextProviderValue = useMemo(() => ({ isWrapped: true }), []);
    return (
        <StyledMotionAccordion
            animate={{ height: 'auto', opacity: 1 }}
            data-uuid={`${accordionGroupUuid ?? ''}---${uuid}`}
            className="beta-chayns-accordion"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            $isOpen={isOpen}
            $shouldShowLines={!isLastAccordion}
            $isParentWrapped={isParentWrapped}
            $isWrapped={isWrapped}
            $shouldForceBackground={shouldForceBackground}
            $shouldHideBackground={shouldHideBackground}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            <AccordionContext.Provider value={accordionContextProviderValue}>
                <MotionConfig transition={{ type: 'tween' }}>
                    <AccordionHead
                        uuid={uuid}
                        icon={icon}
                        isOpen={isOpen}
                        isFixed={isFixed}
                        isTitleGreyed={isTitleGreyed || isDisabled}
                        isWrapped={isWrapped === true}
                        onClick={handleHeadClick}
                        onSearchChange={onSearchChange}
                        rightElement={rightElement}
                        searchPlaceholder={searchPlaceholder}
                        searchValue={searchValue}
                        shouldRotateIcon={shouldRotateIcon}
                        title={title}
                        titleElement={titleElement}
                        onTitleInputChange={onTitleInputChange}
                        titleInputProps={titleInputProps}
                        titleColor={titleColor}
                    />
                    <AnimatePresence initial={false}>
                        {(isOpen || shouldRenderClosed) && (
                            <AccordionBody
                                maxHeight={bodyMaxHeight}
                                onScroll={onBodyScroll}
                                onAnimationComplete={onBodyAnimationComplete}
                                shouldHideBody={shouldRenderClosed && !isOpen}
                            >
                                <AccordionWrappedContext.Provider
                                    value={accordionWrappedContextProviderValue}
                                >
                                    <AreaContext.Provider value={areaContextProviderValue}>
                                        {children}
                                    </AreaContext.Provider>
                                </AccordionWrappedContext.Provider>
                            </AccordionBody>
                        )}
                    </AnimatePresence>
                </MotionConfig>
            </AccordionContext.Provider>
        </StyledMotionAccordion>
    );
};

Accordion.displayName = 'Accordion';

export default Accordion;
