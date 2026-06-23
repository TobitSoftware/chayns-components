import React, { FC, useMemo } from 'react';
import {
    StyledPreviewMessage,
    StyledPreviewMessageAuthor,
    StyledPreviewMessageContent,
    StyledPreviewMessageContentWrapper,
    StyledPreviewMessageFile,
    StyledPreviewMessageIndicator,
    StyledPreviewMessageInnerWrapper,
    StyledPreviewMessageRemoveIcon,
    StyledPreviewMessageRight,
} from './PreviewMessage.styles';
import { CombinedPreviewFile, MessageMetaData } from '../CommunicationMessage.types';
import { Icon } from '@chayns-components/core';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

interface PreviewMessageProps {
    metadata: MessageMetaData;
    onClick?: VoidFunction;
    onRemove?: VoidFunction;
}

const PreviewMessage: FC<PreviewMessageProps> = ({ metadata, onRemove, onClick }) => {
    const { t } = useTranslation();

    const firstFile = useMemo(
        () => (metadata.files ? metadata.files[0] : undefined),
        [metadata.files],
    );

    const { iconElement, textElement } = useMemo(() => {
        let text = metadata.plainText || '';
        let icon: string | null = null;

        if (metadata.plugin) {
            icon = metadata.plugin.icon || 'fa fa-puzzle-piece';
            text =
                metadata.plugin.name || metadata.plainText || t(textStrings.previewMessage.plugin);
        }

        if (firstFile) {
            switch (firstFile.type) {
                case 'image':
                    icon = 'fa fa-image';
                    text = metadata.plainText || t(textStrings.previewMessage.image);
                    break;
                case 'video':
                    icon = 'fa fa-video';
                    text = metadata.plainText || t(textStrings.previewMessage.video);
                    break;
                case 'file':
                default:
                    icon = 'fa fa-file';
                    text =
                        metadata.plainText ||
                        firstFile.fileName ||
                        t(textStrings.previewMessage.file);
                    break;
            }
        }

        return {
            iconElement: icon ? <Icon icons={[icon]} size={13} /> : null,
            textElement: <div>{text}</div>,
        };
    }, [firstFile, metadata.plainText, metadata.plugin, t]);

    return (
        <StyledPreviewMessage $isClickable={typeof onClick === 'function'}>
            <StyledPreviewMessageIndicator />
            <StyledPreviewMessageInnerWrapper>
                <StyledPreviewMessageContentWrapper>
                    <StyledPreviewMessageAuthor>{metadata.author.name}</StyledPreviewMessageAuthor>
                    <StyledPreviewMessageContent>
                        {iconElement}
                        {textElement}
                    </StyledPreviewMessageContent>
                </StyledPreviewMessageContentWrapper>
                <StyledPreviewMessageRight>
                    {firstFile && ['video', 'image'].includes(firstFile.type) && (
                        <StyledPreviewMessageFile
                            src={(firstFile as CombinedPreviewFile).previewUrl}
                        />
                    )}
                    {typeof onRemove === 'function' && (
                        <StyledPreviewMessageRemoveIcon onClick={onRemove}>
                            <Icon icons={['fa fa-xmark']} />
                        </StyledPreviewMessageRemoveIcon>
                    )}
                </StyledPreviewMessageRight>
            </StyledPreviewMessageInnerWrapper>
        </StyledPreviewMessage>
    );
};

PreviewMessage.displayName = 'CodePreviewMessage.Preview';

export default PreviewMessage;
