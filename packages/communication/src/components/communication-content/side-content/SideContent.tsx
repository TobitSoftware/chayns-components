import React, { FC, ReactNode, useCallback, useState } from 'react';
import { StyledMotionSideContent, StyledSideContentHandle } from './SideContent.styles';
import { CommunicationContentProps } from '../CommunicationContent.types';
import { clamp, useDragHandle } from './SideContent.hooks';

interface SideContentProps {
    children: ReactNode;
    config?: CommunicationContentProps['sideContentConfig'];
    onChange?: CommunicationContentProps['onChange'];
}

const DEFAULT_INITIAL_WIDTH = 360;
const DEFAULT_MIN_WIDTH = 280;
const DEFAULT_MAX_WIDTH = 520;

const SideContent: FC<SideContentProps> = ({ children, config, onChange }) => {
    const {
        initialWidth = DEFAULT_INITIAL_WIDTH,
        minWidth = DEFAULT_MIN_WIDTH,
        maxWidth = DEFAULT_MAX_WIDTH,
    } = config ?? {};

    const [width, setWidth] = useState(initialWidth);

    const handleChange = useCallback(
        (deltaX: number) => {
            setWidth((prev) => {
                const newWidth = clamp(prev + deltaX, minWidth, maxWidth);

                if (typeof onChange === 'function') {
                    // onChange(newWidth);
                }

                return newWidth;
            });
        },
        [maxWidth, minWidth, onChange],
    );

    const handleMouseDown = useDragHandle(handleChange);

    return (
        <StyledMotionSideContent
            animate={{ width }}
            initial={false}
            transition={{
                type: 'tween',
                duration: 0,
            }}
        >
            {children}
            <StyledSideContentHandle onMouseDown={handleMouseDown} />
        </StyledMotionSideContent>
    );
};

SideContent.displayName = 'SideContent';

export default SideContent;
