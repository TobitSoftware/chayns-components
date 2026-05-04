import React, { FC } from 'react';
import {
    StyledCommunicationButton,
    StyledMotionCommunicationButtonImage,
} from './CommunicationButton.styles';
import { CommunicationButtonProps } from './CommunicationButton.types';
import { Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';

const CommunicationButton: FC<CommunicationButtonProps> = ({
    onClick,
    icons,
    personId,
    shouldFillBackground = true,
    isDisabled,
    className,
    iconColor,
}) => (
    <StyledCommunicationButton
        $shouldFillBackground={shouldFillBackground}
        onClick={isDisabled ? undefined : onClick}
        $isDisabled={isDisabled}
        className={className}
    >
        <AnimatePresence initial={false}>
            {personId && (
                <StyledMotionCommunicationButtonImage
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    src={`https://tsimg.cloud/${personId}/profile_w50.png`}
                />
            )}
        </AnimatePresence>
        <Icon icons={icons} size={18} color={iconColor} />
    </StyledCommunicationButton>
);

CommunicationButton.displayName = 'CommunicationButton';

export default CommunicationButton;
