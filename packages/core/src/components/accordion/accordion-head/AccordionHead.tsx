import { AnimatePresence, LayoutGroup } from 'motion/react';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from 'react';
import { useTheme } from 'styled-components';
import { useElementSize } from '../../../hooks/element';
import { getAccordionHeadHeight, getElementClickEvent } from '../../../utils/accordion';
import { AreaContext } from '../../area-provider/AreaContextProvider';
import type { Theme } from '../../color-scheme-provider/ColorSchemeProvider';
import Icon from '../../icon/Icon';
import Input, { InputSize, type InputProps } from '../../input/Input';
import SearchInput from '../../search-input/SearchInput';
import {
    StyledAccordionIcon,
    StyledMotionAccordionHead,
    StyledMotionContentWrapper,
    StyledMotionIconWrapper,
    StyledMotionRightElementWrapper,
    StyledMotionSearchWrapper,
    StyledMotionTitle,
    StyledMotionTitleElementWrapper,
    StyledMotionTitleWrapper,
    StyledRightWrapper,
    StyledTitleInputWrapper,
} from './AccordionHead.styles';

export type AccordionHeadProps = {
    icon?: string;
    isOpen: boolean;
    isFixed: boolean;
    isTitleGreyed: boolean;
    isWrapped: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    onSearchChange?: ChangeEventHandler<HTMLInputElement>;
    rightElement?: ReactNode;
    searchPlaceholder?: string;
    searchValue?: string;
    shouldRotateIcon?: boolean;
    title?: string;
    titleElement?: ReactNode;
    uuid: string;
    onTitleInputChange?: ChangeEventHandler<HTMLInputElement>;
    titleInputProps?: InputProps;
    titleColor?: CSSProperties['color'];
    shouldSkipAnimation?: boolean;
};

interface HeadHeight {
    closed: number;
    open: number;
}

const AccordionHead: FC<AccordionHeadProps> = ({
    icon,
    isOpen,
    isFixed,
    isTitleGreyed,
    isWrapped,
    onClick,
    onSearchChange,
    rightElement,
    searchPlaceholder,
    searchValue,
    shouldRotateIcon,
    title,
    titleElement,
    shouldSkipAnimation,
    uuid,
    titleInputProps,
    onTitleInputChange,
    titleColor,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: isWrapped ? 40 : 32,
        open: isWrapped ? 40 : 42,
    });

    const [isSearchActive, setIsSearchActive] = useState(false);

    const theme = useTheme() as Theme;

    const titleElementWrapperRef = useRef<HTMLDivElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const [internalSearchValue, setInternalSearchValue] = useState<string>();

    useEffect(() => {
        setInternalSearchValue(searchValue);
    }, [searchValue]);

    useEffect(() => {
        if (typeof onSearchChange === 'function' && !isOpen) {
            setIsSearchActive(false);
        }
    }, [isOpen, onSearchChange]);

    const handleOnSearchChance = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalSearchValue(event.target.value);
        if (typeof onSearchChange === 'function') {
            onSearchChange(event);
        }
    };

    const titleElementChildrenSize = useElementSize(titleElementWrapperRef, {
        shouldUseChildElement: true,
    });

    const shouldPreventRightElementClick = useMemo(
        () => getElementClickEvent(rightElement),
        [rightElement],
    );

    useEffect(() => {
        if (typeof onTitleInputChange === 'function') {
            setHeadHeight({ closed: 50, open: 50 });
        } else {
            // The timeout is needed because the width is incorrect on the first render
            window.setTimeout(() => {
                setHeadHeight(
                    getAccordionHeadHeight({
                        isWrapped,
                        title,
                        width: titleWrapperRef.current?.clientWidth ?? 0,
                        hasSearch: typeof onSearchChange === 'function',
                    }),
                );
            }, 1);
        }
        // The fontSize need to be included to trigger a new calculation.
        // After the size is increased, the Title is cut at the bottom.
    }, [isWrapped, onSearchChange, onTitleInputChange, theme.fontSize, title]);

    const iconElement = useMemo(() => {
        if (icon || isFixed) {
            return (
                <Icon
                    icons={[isFixed ? 'fa fa-horizontal-rule' : (icon ?? 'fa fa-chevron-right')]}
                />
            );
        }

        let internalIcon = 'f105';

        if (
            theme?.accordionIcon &&
            (theme.accordionIcon as unknown as number) !== 110 &&
            (theme.accordionIcon as unknown as number) !== 1110100
        ) {
            internalIcon = (theme.accordionIcon as unknown as number).toString(16);
        }

        const internalIconStyle = theme?.iconStyle ? theme.iconStyle : 'fa-regular';

        return <StyledAccordionIcon className={internalIconStyle} $icon={internalIcon} />;
    }, [icon, theme, isFixed]);

    let accordionHeadHeight = isOpen ? headHeight.open : headHeight.closed;

    if (titleElementChildrenSize && titleElementChildrenSize.height > accordionHeadHeight) {
        // If the titleElement is bigger than the title, the height of the accordion head should be increased.
        // The height of the titleElement is increased by 8px because of the padding of the accordion head element.
        accordionHeadHeight = titleElementChildrenSize.height + 8;
    }

    return (
        <StyledMotionAccordionHead
            animate={{ height: accordionHeadHeight }}
            className="beta-chayns-accordion-head"
            initial={false}
            key={`accordionHead--${uuid}`}
            transition={{ duration: shouldSkipAnimation ? 0 : 0.25 }}
        >
            <StyledMotionIconWrapper
                animate={{ rotate: (isOpen || isFixed) && shouldRotateIcon ? 90 : 0 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
                key={`accordionHeadIcon--${uuid}`}
                transition={{ duration: shouldSkipAnimation ? 0 : 0.25 }}
            >
                {iconElement}
            </StyledMotionIconWrapper>
            <StyledMotionContentWrapper
                animate={{ opacity: isTitleGreyed ? 0.5 : 1 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
                ref={titleWrapperRef}
                $isWrapped={isWrapped}
                key={`accordionHeadContentWrapper--${uuid}`}
            >
                {typeof onTitleInputChange === 'function' ? (
                    // eslint-disable-next-line react/jsx-no-constructed-context-values
                    <AreaContext.Provider value={{ shouldChangeColor: true }}>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <StyledTitleInputWrapper>
                            <Input
                                {...titleInputProps}
                                value={title}
                                onChange={onTitleInputChange}
                            />
                        </StyledTitleInputWrapper>
                    </AreaContext.Provider>
                ) : (
                    <LayoutGroup key={`accordionHeadLayoutGroup--${uuid}`}>
                        <AnimatePresence
                            initial={false}
                            mode="sync"
                            key={`accordionHeadTitleWrapper--${uuid}`}
                        >
                            <StyledMotionTitleWrapper
                                key={`accordionHeadTitleWrapperWrapper--${uuid}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: typeof title !== 'string' ? '100%' : undefined,
                                }}
                                initial={
                                    !shouldSkipAnimation
                                        ? { scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }
                                        : false
                                }
                                exit={
                                    shouldSkipAnimation
                                        ? {
                                              opacity: 0,
                                              transition: { duration: 0 },
                                              transitionEnd: { display: 'none' },
                                          }
                                        : { scale: 1, opacity: 0 }
                                }
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: shouldSkipAnimation ? 0 : 0.25,
                                    opacity: { duration: 0 },
                                }}
                            >
                                {title && (
                                    <StyledMotionTitle
                                        $isOpen={isOpen}
                                        $isWrapped={isWrapped}
                                        $color={titleColor}
                                        $hasSearch={typeof onSearchChange === 'function'}
                                        animate={{
                                            fontSize: isOpen && !isWrapped ? '1.3rem' : '1rem',
                                        }}
                                        initial={shouldSkipAnimation ? false : { fontSize: '1rem' }}
                                        transition={{ duration: shouldSkipAnimation ? 0 : 0.25 }}
                                    >
                                        {title}
                                    </StyledMotionTitle>
                                )}

                                {titleElement && (
                                    <StyledMotionTitleElementWrapper
                                        key={`accordionTitleElement--${uuid}`}
                                        ref={titleElementWrapperRef}
                                    >
                                        {titleElement}
                                    </StyledMotionTitleElementWrapper>
                                )}
                            </StyledMotionTitleWrapper>
                        </AnimatePresence>
                    </LayoutGroup>
                )}
            </StyledMotionContentWrapper>
            {(typeof onSearchChange === 'function' || rightElement) && (
                <StyledRightWrapper $isSearchActive={isSearchActive}>
                    <AnimatePresence initial={false} key={`accordionRightWrapper--${uuid}`}>
                        {typeof onSearchChange === 'function' && isOpen && (
                            <StyledMotionSearchWrapper
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                key={`searchWrapper--${uuid}`}
                            >
                                <SearchInput
                                    onChange={handleOnSearchChance}
                                    onActiveChange={(isActive) => setIsSearchActive(isActive)}
                                    placeholder={searchPlaceholder}
                                    size={InputSize.Small}
                                    value={internalSearchValue}
                                />
                            </StyledMotionSearchWrapper>
                        )}
                        {rightElement && (
                            <StyledMotionRightElementWrapper
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                initial={{ opacity: 0 }}
                                key={`rightElementWrapper--${uuid}`}
                                onClick={
                                    !isFixed && !shouldPreventRightElementClick
                                        ? onClick
                                        : undefined
                                }
                            >
                                {rightElement}
                            </StyledMotionRightElementWrapper>
                        )}
                    </AnimatePresence>
                </StyledRightWrapper>
            )}
        </StyledMotionAccordionHead>
    );
};

AccordionHead.displayName = 'AccordionHead';

export default AccordionHead;
