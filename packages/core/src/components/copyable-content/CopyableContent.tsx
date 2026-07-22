import { formatStringToHtml } from '@chayns-components/format';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import { createDialog, DialogType, ToastType } from 'chayns-api';
import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import textStrings from '../../constants/textStrings';
import { useStickyActionPosition } from '../../hooks/useStickyActionPosition';
import SharingContextMenu from '../sharing-context-menu/SharingContextMenu';
import Icon from '../icon/Icon';
import {
    StyledCopyableContent,
    StyledCopyableContentActionGroup,
    StyledCopyableContentActions,
    StyledCopyableContentBody,
    StyledCopyableContentButton,
} from './CopyableContent.styles';
import { copyableContentToClipboard } from './copyableContentClipboard';

export type CopyableContentProps = {
    content: string;
    children?: ReactNode;
    copiedMessage?: string;
    copyFailedMessage?: string;
};

const CopyableContent: FC<CopyableContentProps> = ({
    content,
    children,
    copiedMessage,
    copyFailedMessage,
}) => {
    const rootRef = useRef<HTMLElement>(null);
    const actionGroupRef = useRef<HTMLDivElement>(null);
    const stickyActionPosition = useStickyActionPosition(rootRef, actionGroupRef);

    const defaultCopyButtonText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.copy),
    });
    const defaultCopiedMessage = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.copied),
    });
    const defaultCopyFailedMessage = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.copyFailed),
    });
    const shareText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.share),
    });

    const html = useMemo(() => formatStringToHtml(content).html, [content]);

    const handleCopy = useCallback(async () => {
        try {
            await copyableContentToClipboard(content);
            void createDialog({
                showCloseIcon: true,
                text: copiedMessage ?? defaultCopiedMessage,
                toastType: ToastType.SUCCESS,
                type: DialogType.TOAST,
            }).open();
        } catch {
            void createDialog({
                showCloseIcon: true,
                text: copyFailedMessage ?? defaultCopyFailedMessage,
                toastType: ToastType.ERROR,
                type: DialogType.TOAST,
            }).open();
        }
    }, [content, copiedMessage, defaultCopiedMessage, defaultCopyFailedMessage, copyFailedMessage]);

    return (
        <StyledCopyableContent className="copyable-content" ref={rootRef}>
            <StyledCopyableContentActions
                $fixedRight={stickyActionPosition.fixedRight}
                $fixedTop={stickyActionPosition.fixedTop}
                $isFixed={stickyActionPosition.isFixed}
                ref={actionGroupRef}
            >
                <StyledCopyableContentActionGroup>
                    <StyledCopyableContentButton
                        $isSticky={stickyActionPosition.isSticky}
                        aria-label={defaultCopyButtonText}
                        onClick={() => {
                            void handleCopy();
                        }}
                        type="button"
                    >
                        <Icon icons={['fa-light fa-copy']} />
                    </StyledCopyableContentButton>
                    <SharingContextMenu link={content} shouldUseDefaultTriggerStyles={false}>
                        <StyledCopyableContentButton
                            $isSticky={stickyActionPosition.isSticky}
                            aria-label={shareText}
                            type="button"
                        >
                            <Icon icons={['fa fa-share-nodes']} />
                        </StyledCopyableContentButton>
                    </SharingContextMenu>
                </StyledCopyableContentActionGroup>
            </StyledCopyableContentActions>
            <StyledCopyableContentBody>
                {children ?? <div dangerouslySetInnerHTML={{ __html: html }} />}
            </StyledCopyableContentBody>
        </StyledCopyableContent>
    );
};

CopyableContent.displayName = 'CopyableContent';

export default CopyableContent;
