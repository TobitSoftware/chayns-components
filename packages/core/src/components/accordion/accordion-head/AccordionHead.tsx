import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, {
    ChangeEventHandler,
    FC,
    MouseEventHandler,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import Icon from '../../icon/Icon';
import { getAccordionHeadHeight } from '../utils';
import {
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
    title: string;
    titleElement?: ReactNode;
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
    title,
    titleElement,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: isWrapped ? 40 : 33,
        open: isWrapped ? 40 : 33,
    });
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeadHeight(
            getAccordionHeadHeight({
                isWrapped,
                title,
                width: (titleWrapperRef.current?.clientWidth ?? 0) - 10,
            })
        );
    }, [isWrapped, title]);

    return (
        <StyledMotionAccordionHead
            animate={{ height: isOpen ? headHeight.open : headHeight.closed }}
            className="beta-chayns-accordion-head"
            initial={false}
        >
            <StyledMotionIconWrapper
                animate={{ rotate: isOpen || isFixed ? 90 : 0 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
            >
                <Icon icons={[isFixed ? 'fa fa-horizontal-rule' : icon ?? 'fa fa-chevron-right']} />
            </StyledMotionIconWrapper>
            <StyledMotionContentWrapper
                animate={{ opacity: isTitleGreyed ? 0.5 : 1 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
                ref={titleWrapperRef}
            >
                <AnimateSharedLayout>
                    <StyledMotionTitleWrapper>
                        <AnimatePresence initial={false}>
                            <StyledMotionTitle
                                animate={{ scale: 1 }}
                                initial={{ scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }}
                                isOpen={isOpen}
                                isWrapped={isWrapped}
                                key={
                                    isOpen && !isWrapped
                                        ? 'accordionHeadTitleBig'
                                        : 'accordionHeadTitle'
                                }
                            >
                                {title}
                            </StyledMotionTitle>
                        </AnimatePresence>
                    </StyledMotionTitleWrapper>
                    {titleElement && (
                        <StyledMotionTitleElementWrapper layout>
                            {titleElement}
                        </StyledMotionTitleElementWrapper>
                    )}
                </AnimateSharedLayout>
            </StyledMotionContentWrapper>
            {(typeof onSearchChange === 'function' || rightElement) && (
                <StyledRightWrapper>
                    <AnimatePresence initial={false}>
                        {typeof onSearchChange === 'function' && isOpen ? (
                            <>
                                <StyledMotionRightInput
                                    animate={{ opacity: 1, width: 'auto' }}
                                    autoComplete="off"
                                    exit={{ opacity: 0, width: 0 }}
                                    initial={{ opacity: 0, width: 0 }}
                                    key="rightInput"
                                    onChange={onSearchChange}
                                    placeholder={searchPlaceholder}
                                    type="text"
                                />
                                {Array.isArray(searchIcon) && (
                                    <StyledMotionRightInputIconWrapper
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        initial={{ opacity: 0 }}
                                        key="rightInputIcon"
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
                                key="rightElementWrapper"
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
