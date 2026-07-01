import React, { FC } from 'react';
import {
    StyledCommunicationButton,
    StyledMotionCommunicationButtonImage,
} from './CommunicationButton.styles';
import { CommunicationButtonProps } from './CommunicationButton.types';
import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

const CommunicationButton: FC<CommunicationButtonProps> = ({
    onClick,
    icons,
    personId,
    shouldFillBackground = true,
    isDisabled,
    className,
    iconColor,
    size = CommunicationInputSize.MEDIUM,
}) => (
    <StyledCommunicationButton
        $shouldFillBackground={shouldFillBackground}
        onClick={isDisabled ? undefined : onClick}
        $isDisabled={isDisabled}
        $size={size}
        className={className}
    >
        <AnimatePresence initial={false}>
            {personId && (
                <StyledMotionCommunicationButtonImage
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2, type: 'tween' }}
                    src={`https://tsimg.cloud/${personId}/profile_w50.png`}
                />
            )}
        </AnimatePresence>
        <Icon
            icons={icons}
            size={size === CommunicationInputSize.MEDIUM ? 18 : 16}
            color={iconColor}
        />
    </StyledCommunicationButton>
);

CommunicationButton.displayName = 'CommunicationButton';

export default CommunicationButton;
