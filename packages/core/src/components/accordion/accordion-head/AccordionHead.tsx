import React, { FC, MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../icon/Icon';
import { AnimatePresence, motion } from 'framer-motion';

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

type StyledMotionAccordionHeadProps = {
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const StyledMotionAccordionHead = styled(motion.div)<StyledMotionAccordionHeadProps>`
    align-items: center;
    cursor: ${({ onClick }) => (typeof onClick === 'function' ? 'pointer' : 'default')};
    display: flex;
    overflow: hidden;
    padding: 4px 0;
`;

const StyledMotionIconWrapper = styled(motion.div)`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 25px;
    justify-content: center;
    width: 25px;
`;

const StyledTitleWrapper = styled.div`
    align-self: flex-start;
    flex: 1 1 auto;
    height: 100%;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
`;

const StyledMotionTitle = styled(motion.div)`
    overflow: hidden;
    text-overflow: ellipsis;
    transform-origin: top left;
    user-select: none;
    width: 100%;
`;

const StyledRightWrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: center;
    margin-right: 5px;
    overflow: hidden;
`;

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

//region Utils
interface GetAccordionHeadHeightOptions {
    isWrapped?: boolean;
    title: string;
    width: number;
}

interface GetAccordionHeadHeightResult {
    closed: number;
    open: number;
}

const getAccordionHeadHeight = ({
    isWrapped,
    title,
    width,
}: GetAccordionHeadHeightOptions): GetAccordionHeadHeightResult => {
    const element = document.createElement('div');

    element.style.fontSize = '1rem';
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.whiteSpace = 'nowrap';
    element.style.width = `${width}px`;

    element.innerText = title;

    document.body.appendChild(element);

    const closedHeight = Math.max(element.clientHeight + 8, 33);

    if (isWrapped) {
        element.style.fontWeight = 'bold';
    } else {
        element.style.fontSize = '1.3rem';
    }

    element.style.whiteSpace = 'normal';

    const openHeight = Math.max(element.clientHeight + 8, 33);

    document.body.removeChild(element);

    return { closed: closedHeight, open: openHeight };
};
//endregion
