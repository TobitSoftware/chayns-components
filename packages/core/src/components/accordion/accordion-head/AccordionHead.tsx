import { AnimatePresence, LayoutGroup } from 'framer-motion';
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
import { useElementSize } from '../../../hooks/useElementSize';
import { getAccordionHeadHeight } from '../../../utils/accordion';
import { AreaContext } from '../../area-provider/AreaContextProvider';
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
    title: string;
    titleElement?: ReactNode;
    uuid: string;
    onTitleInputChange?: ChangeEventHandler<HTMLInputElement>;
    titleInputProps?: InputProps;
    titleColor?: CSSProperties['color'];
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
    uuid,
    titleInputProps,
    onTitleInputChange,
    titleColor,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: isWrapped ? 40 : 33,
        open: isWrapped ? 40 : 33,
    });

    const theme = useTheme();

    const titleElementWrapperRef = useRef<HTMLDivElement>(null);
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const [internalSearchValue, setInternalSearchValue] = useState<string>();

    useEffect(() => {
        setInternalSearchValue(searchValue);
    }, [searchValue]);

    const handleOnSearchChance = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalSearchValue(event.target.value);
        if (typeof onSearchChange === 'function') {
            onSearchChange(event);
        }
    };

    const titleElementChildrenSize = useElementSize(titleElementWrapperRef, {
        shouldUseChildElement: true,
    });
    useEffect(() => {
        if (typeof onTitleInputChange === 'function') {
            setHeadHeight({ closed: 50, open: 50 });
        } else {
            setHeadHeight(
                getAccordionHeadHeight({
                    isWrapped,
                    title,
                    width: (titleWrapperRef.current?.clientWidth ?? 0) - 10,
                    hasSearch: typeof onSearchChange === 'function',
                }),
            );
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
            theme.accordionIcon !== 110 &&
            theme.accordionIcon !== 1110100
        ) {
            internalIcon = (theme.accordionIcon as number).toString(16);
        }

        const internalIconStyle = theme?.iconStyle ? (theme.iconStyle as string) : 'fa-regular';

        return <StyledAccordionIcon className={internalIconStyle} $icon={internalIcon} />;
    }, [icon, theme, isFixed]);

    let accordionHeadHeight = isOpen ? headHeight.open : headHeight.closed;

    if (titleElementChildrenSize && titleElementChildrenSize.height > accordionHeadHeight) {
        // If the titleElement is bigger than the title, the height of the accordion head should be increased.
        // The height of the titleElement is increased by 8px because of the padding of the accordion head element.
        accordionHeadHeight = titleElementChildrenSize.height + 8;
    }

    const [tmp, setTmp] = useState(true);

    return (
        <StyledMotionAccordionHead
            animate={{ height: accordionHeadHeight }}
            className="beta-chayns-accordion-head"
            initial={false}
            key={`accordionHead--${uuid}`}
        >
            <StyledMotionIconWrapper
                animate={{ rotate: (isOpen || isFixed) && shouldRotateIcon ? 90 : 0 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
                key={`accordionHeadIcon--${uuid}`}
            >
                {iconElement}
            </StyledMotionIconWrapper>
            <StyledMotionContentWrapper
                animate={{ opacity: isTitleGreyed ? 0.5 : 1 }}
                initial={false}
                onClick={!isFixed && tmp ? onClick : undefined}
                ref={titleWrapperRef}
                $isWrapped={isWrapped}
                key={`accordionHeadContentWrapper--${uuid}`}
            >
                {typeof onTitleInputChange === 'function' ? (
                    // eslint-disable-next-line react/jsx-no-constructed-context-values
                    <AreaContext.Provider value={{ shouldChangeColor: true }}>
                        <Input
                            {...titleInputProps}
                            value={title}
                            onFocus={(event) => {
                                setTmp(false);

                                if (titleInputProps?.onFocus) {
                                    titleInputProps.onFocus(event);
                                }
                            }}
                            onBlur={(event) => {
                                setTmp(true);

                                if (titleInputProps?.onBlur) {
                                    titleInputProps.onBlur(event);
                                }
                            }}
                            onChange={onTitleInputChange}
                        />
                    </AreaContext.Provider>
                ) : (
                    <LayoutGroup key={`accordionHeadLayoutGroup--${uuid}`}>
                        <StyledMotionTitleWrapper key={`accordionHeadTitleWrapperWrapper--${uuid}`}>
                            <AnimatePresence
                                initial={false}
                                key={`accordionHeadTitleWrapper--${uuid}`}
                            >
                                <StyledMotionTitle
                                    animate={{ scale: 1 }}
                                    initial={{ scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }}
                                    exit={{ opacity: 0 }}
                                    $isOpen={isOpen}
                                    $isWrapped={isWrapped}
                                    $color={titleColor}
                                    $hasSearch={typeof onSearchChange === 'function'}
                                    transition={{
                                        opacity: {
                                            duration: 0,
                                        },
                                    }}
                                    key={
                                        isOpen && !isWrapped
                                            ? `accordionHeadTitleBig--${uuid}`
                                            : `accordionHeadTitle--${uuid}`
                                    }
                                >
                                    {title}
                                </StyledMotionTitle>
                            </AnimatePresence>
                        </StyledMotionTitleWrapper>
                        {titleElement && (
                            <StyledMotionTitleElementWrapper
                                layout
                                key={`accordionTitleElement--${uuid}`}
                                ref={titleElementWrapperRef}
                            >
                                {titleElement}
                            </StyledMotionTitleElementWrapper>
                        )}
                    </LayoutGroup>
                )}
            </StyledMotionContentWrapper>
            {(typeof onSearchChange === 'function' || rightElement) && (
                <StyledRightWrapper>
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
