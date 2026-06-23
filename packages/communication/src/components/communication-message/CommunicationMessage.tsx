import React, { FC, useMemo, useRef } from 'react';
import {
    CommunicationMessageAlignment,
    CommunicationMessageProps,
    CommunicationMessageStatus,
} from './CommunicationMessage.types';
import {
    StyledCommunicationMessage,
    StyledCommunicationMessageAuthorImage,
    StyledCommunicationMessageAuthorName,
    StyledCommunicationMessageDeletionHint,
    StyledCommunicationMessageFooter,
    StyledCommunicationMessageStatus,
    StyledCommunicationMessageStatusIcon,
    StyledCommunicationMessageTimestamp,
    StyledMotionCommunicationMessageContextMenu,
} from './CommunicationMessage.styles';
import { useMessageInteraction } from './CommunicationMessage.hooks';
import { ContextMenu, ContextMenuRef, Icon } from '@chayns-components/core';
import { AnimatePresence } from 'motion/react';
import { useDevice } from 'chayns-api';
import textStrings from '../../constants/textStrings';
import { useTranslation } from '@chayns/textstrings';

const CommunicationMessage: FC<CommunicationMessageProps> = ({
    metadata,
    content,
    options,
    shouldShowAuthorImage = true,
    shouldShowAuthorName = true,
    shouldShowTimestamp = true,
    shouldShowStatus = true,
    timestampFormatter,
    alignment,
}) => {
    const contextMenuRef = useRef<ContextMenuRef>(null);

    const { isTouch } = useDevice();
    const { t, language } = useTranslation();

    const {
        onMouseEnter,
        onMouseLeave,
        onTouchCancel,
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        shouldShowContextMenu,
    } = useMessageInteraction({
        isEnabled: Array.isArray(options) && options.length > 0,
        onLongPress: () => contextMenuRef.current?.show(),
    });

    const formattedDate = useMemo(() => {
        const date = new Date(metadata.creationTime);

        if (typeof timestampFormatter === 'function') {
            return timestampFormatter(date);
        }

        return new Intl.DateTimeFormat(language, {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }, [metadata.creationTime, timestampFormatter, language]);

    const statusElement = useMemo(() => {
        if (!shouldShowStatus) {
            return null;
        }

        const isDeliveredOrRead =
            metadata.status === CommunicationMessageStatus.DELIVERED ||
            metadata.status === CommunicationMessageStatus.READ;

        const color =
            metadata.status === CommunicationMessageStatus.READ ? 'rgb(32, 128, 255)' : undefined;

        return (
            <StyledCommunicationMessageStatus>
                <StyledCommunicationMessageStatusIcon>
                    <Icon icons={['fa ts-check']} size={15} color={color} />
                </StyledCommunicationMessageStatusIcon>

                {isDeliveredOrRead && (
                    <StyledCommunicationMessageStatusIcon $isRight>
                        <Icon icons={['fa ts-check']} size={15} color={color} />
                    </StyledCommunicationMessageStatusIcon>
                )}
            </StyledCommunicationMessageStatus>
        );
    }, [metadata.status, shouldShowStatus]);

    const optionsAnimation = useMemo(() => {
        const initialRight = alignment === CommunicationMessageAlignment.RIGHT ? 10 : 0;
        const animatedRight = alignment === CommunicationMessageAlignment.RIGHT ? 16 : 6;

        return {
            initial: { opacity: 0, right: initialRight },
            animate: { opacity: isTouch ? 0 : 1, right: animatedRight },
            exit: { opacity: 0, right: initialRight },
        };
    }, [alignment, isTouch]);

    return (
        <StyledCommunicationMessage
            $alignment={alignment}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchCancel={onTouchCancel}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            onTouchStart={onTouchStart}
        >
            <AnimatePresence>
                {shouldShowContextMenu && (
                    <StyledMotionCommunicationMessageContextMenu
                        initial={optionsAnimation.initial}
                        exit={optionsAnimation.exit}
                        animate={optionsAnimation.animate}
                    >
                        <ContextMenu items={options ?? []} ref={contextMenuRef} />
                    </StyledMotionCommunicationMessageContextMenu>
                )}
            </AnimatePresence>

            {shouldShowAuthorName && (
                <StyledCommunicationMessageAuthorName key={metadata.author.name}>
                    {metadata.author.name}
                </StyledCommunicationMessageAuthorName>
            )}

            {shouldShowAuthorImage && alignment !== CommunicationMessageAlignment.CENTER && (
                <StyledCommunicationMessageAuthorImage
                    key={metadata.author.imageUrl}
                    src={metadata.author.imageUrl}
                    $alignment={alignment}
                />
            )}

            {typeof metadata.deletionTime === 'string' ? (
                <StyledCommunicationMessageDeletionHint>
                    {t(textStrings.communicationMessage.textMessage.delete)}
                </StyledCommunicationMessageDeletionHint>
            ) : (
                content
            )}

            {(shouldShowTimestamp || shouldShowStatus) && (
                <>
                    <StyledCommunicationMessageFooter>
                        {statusElement}
                        {shouldShowTimestamp && (
                            <StyledCommunicationMessageTimestamp key={formattedDate}>
                                {formattedDate}
                            </StyledCommunicationMessageTimestamp>
                        )}
                    </StyledCommunicationMessageFooter>
                    <div />
                </>
            )}
        </StyledCommunicationMessage>
    );
};

CommunicationMessage.displayName = 'CommunicationMessage';

export default CommunicationMessage;
