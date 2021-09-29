import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import Icon from '../../icon/Icon';
import {
    StyledMotionAccordionHead,
    StyledMotionIconWrapper,
    StyledMotionTitle,
    StyledRightWrapper,
    StyledMotionTitleWrapper,
} from './AccordionHead.styles';
import { getAccordionHeadHeight } from '../utils';

type AccordionHeadProps = {
    icon?: string;
    isOpen: boolean;
    isFixed: boolean;
    isTitleGreyed: boolean;
    isWrapped: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    right?: ReactNode;
    title: ReactNode;
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
    right,
    title,
}) => {
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: isWrapped ? 40 : 33,
        open: isWrapped ? 40 : 33,
    });
    const titleWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof title === 'string') {
            setHeadHeight(
                getAccordionHeadHeight({
                    isWrapped,
                    title,
                    width: (titleWrapperRef.current?.clientWidth ?? 0) - 10,
                })
            );
        }
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
            <StyledMotionTitleWrapper
                animate={{ opacity: isTitleGreyed ? 0.5 : 1 }}
                initial={false}
                onClick={!isFixed ? onClick : undefined}
                ref={titleWrapperRef}
            >
                <AnimatePresence initial={false}>
                    <StyledMotionTitle
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                            opacity: 0,
                            position: 'absolute',
                            scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3,
                        }}
                        initial={{ opacity: 0, scale: isOpen && !isWrapped ? 1 / 1.3 : 1.3 }}
                        isOpen={isOpen}
                        isWrapped={isWrapped}
                        key={isOpen && !isWrapped ? 'accordionHeadTitleBig' : 'accordionHeadTitle'}
                    >
                        {title}
                    </StyledMotionTitle>
                </AnimatePresence>
            </StyledMotionTitleWrapper>
            {right && <StyledRightWrapper>{right}</StyledRightWrapper>}
        </StyledMotionAccordionHead>
    );
};

AccordionHead.displayName = 'AccordionHead';

export default AccordionHead;
