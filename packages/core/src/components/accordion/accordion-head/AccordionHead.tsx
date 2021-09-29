import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import Icon from '../../icon/Icon';
import {
    StyledMotionAccordionHead,
    StyledMotionIconWrapper,
    StyledMotionTitle,
    StyledRightWrapper,
    StyledTitleWrapper,
} from './AccordionHead.styles';
import { getAccordionHeadHeight } from '../utils';

type AccordionHeadProps = {
    icon?: string;
    isOpen: boolean;
    isFixed?: boolean;
    isWrapped?: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    right?: ReactNode;
    title: string;
};

interface HeadHeight {
    closed?: number;
    open?: number;
}

const AccordionHead: FC<AccordionHeadProps> = ({
    icon,
    isOpen,
    isFixed,
    isWrapped,
    onClick,
    right,
    title,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: undefined,
        open: undefined,
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
            onClick={!isFixed ? onClick : undefined}
        >
            <StyledMotionIconWrapper
                animate={{ rotate: isOpen || isFixed ? 90 : 0 }}
                initial={false}
            >
                <Icon icons={[isFixed ? 'fa fa-horizontal-rule' : icon ?? 'fa fa-chevron-right']} />
            </StyledMotionIconWrapper>
            <StyledTitleWrapper ref={titleWrapperRef}>
                <AnimatePresence initial={false}>
                    <StyledMotionTitle
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                            opacity: 0,
                            position: 'absolute',
                            scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3,
                        }}
                        initial={{ opacity: 0, scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }}
                        key={isOpen && !isWrapped ? 'accordionHeadTitleBig' : 'accordionHeadTitle'}
                        style={{
                            fontSize: isOpen && !isWrapped ? '1.3rem' : undefined,
                            fontWeight: isOpen && isWrapped ? 700 : 'normal',
                            whiteSpace: isOpen && !isWrapped ? 'normal' : 'nowrap',
                        }}
                    >
                        {title}
                    </StyledMotionTitle>
                </AnimatePresence>
            </StyledTitleWrapper>
            {right && <StyledRightWrapper>{right}</StyledRightWrapper>}
        </StyledMotionAccordionHead>
    );
};

AccordionHead.displayName = 'AccordionHead';

export default AccordionHead;
