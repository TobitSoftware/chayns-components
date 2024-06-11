import { AnimatePresence, LayoutGroup } from 'framer-motion';
import React, {
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTheme } from 'styled-components';
import { getAccordionHeadHeight } from '../../../utils/accordion';
import Icon from '../../icon/Icon';
import {
    StyledAccordionIcon,
    StyledMotionAccordionHead,
    StyledMotionContentWrapper,
    StyledMotionIconWrapper,
    StyledMotionRightElementWrapper,
    StyledMotionRightInput,
    StyledMotionRightInputIconWrapper,
    StyledMotionTitle,
    StyledMotionTitleElementWrapper,
    StyledMotionTitleWrapper,
    StyledRightWrapper,
} from './AccordionHead.styles';

type AccordionHeadProps = {
    icon?: string;
    isOpen: boolean;
    isFixed: boolean;
    isTitleGreyed: boolean;
    isWrapped: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    onSearchChange?: ChangeEventHandler<HTMLInputElement>;
    rightElement?: ReactNode;
    searchIcon?: string[];
    searchPlaceholder?: string;
    searchValue?: string;
    shouldRotateIcon?: boolean;
    title: string;
    titleElement?: ReactNode;
    uuid: string;
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
    searchIcon,
    searchPlaceholder,
    searchValue,
    shouldRotateIcon,
    title,
    titleElement,
    uuid,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: isWrapped ? 40 : 33,
        open: isWrapped ? 40 : 33,
    });

    const theme = useTheme();

    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const hasSearchIcon = Array.isArray(searchIcon);

    useEffect(() => {
        setHeadHeight(
            getAccordionHeadHeight({
                isWrapped,
                title,
                width: (titleWrapperRef.current?.clientWidth ?? 0) - 10,
            }),
        );
        // The fontSize need to be included to trigger a new calculation.
        // After the size is increased, the Title is cut at the bottom.
    }, [isWrapped, title, theme.fontSize]);

    const iconElement = useMemo(() => {
        if (icon || isFixed) {
            return (
                <Icon icons={[isFixed ? 'fa fa-horizontal-rule' : icon ?? 'fa fa-chevron-right']} />
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

    return (
        <StyledMotionAccordionHead
            animate={{ height: isOpen ? headHeight.open : headHeight.closed }}
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
                onClick={!isFixed ? onClick : undefined}
                ref={titleWrapperRef}
                key={`accordionHeadContentWrapper--${uuid}`}
            >
                <LayoutGroup key={`accordionHeadLayoutGroup--${uuid}`}>
                    <StyledMotionTitleWrapper key={`accordionHeadTitleWrapperWrapper--${uuid}`}>
                        <AnimatePresence initial={false} key={`accordionHeadTitleWrapper--${uuid}`}>
                            <StyledMotionTitle
                                animate={{ scale: 1 }}
                                initial={{ scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }}
                                exit={{ opacity: 0 }}
                                $isOpen={isOpen}
                                $isWrapped={isWrapped}
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
                        >
                            {titleElement}
                        </StyledMotionTitleElementWrapper>
                    )}
                </LayoutGroup>
            </StyledMotionContentWrapper>
            {(typeof onSearchChange === 'function' || rightElement) && (
                <StyledRightWrapper>
                    <AnimatePresence initial={false} key={`accordionRightWrapper--${uuid}`}>
                        {typeof onSearchChange === 'function' && isOpen ? (
                            <>
                                <StyledMotionRightInput
                                    animate={{ opacity: 1, width: '165px' }}
                                    autoComplete="off"
                                    exit={{ opacity: 0, width: 0 }}
                                    $hasIcon={hasSearchIcon}
                                    initial={{ opacity: 0, width: 0 }}
                                    key={`rightInput--${uuid}`}
                                    onChange={onSearchChange}
                                    placeholder={searchPlaceholder}
                                    type="text"
                                    value={searchValue}
                                />
                                {hasSearchIcon && (
                                    <StyledMotionRightInputIconWrapper
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        initial={{ opacity: 0 }}
                                        key={`rightInputIcon-${uuid}`}
                                    >
                                        <Icon icons={searchIcon} />
                                    </StyledMotionRightInputIconWrapper>
                                )}
                            </>
                        ) : (
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
