import { formatStringToHtml } from '@chayns-components/format';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import { createDialog, DialogType, ToastType } from 'chayns-api';
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import textStrings from '../../constants/textStrings';
import { useStickyActionState } from '../../hooks/useStickyActionState';
import SharingContextMenu from '../sharing-context-menu/SharingContextMenu';
import Icon from '../icon/Icon';
import {
    StyledCopyableContent,
    StyledCopyableContentActionGroup,
    StyledCopyableContentActions,
    StyledCopyableContentBody,
    StyledCopyableContentButton,
} from './CopyableContent.styles';
import { CopyableContentAppearance } from './CopyableContent.types';
import { copyableContentToClipboard } from './copyableContentClipboard';

const COPY_FEEDBACK_DURATION = 1500;

export type CopyableContentProps = {
    /**
     * Controls the visual surface of the content block.
     */
    appearance?: CopyableContentAppearance;
    /**
     * Markdown source used for rendering and clipboard data.
     */
    content: string;
    /**
     * Replaces only the visible rendered content and never the copied source.
     */
    children?: ReactNode;
    /**
     * Replaces the localized error message shown when copying fails.
     */
    copyFailedMessage?: string;
};

const CopyableContent: FC<CopyableContentProps> = ({
    appearance = CopyableContentAppearance.Default,
    content,
    children,
    copyFailedMessage,
}) => {
    const rootRef = useRef<HTMLElement>(null);
    const actionGroupRef = useRef<HTMLDivElement>(null);
    const copyFeedbackTimeoutRef = useRef<number>();
    const isActionGroupSticky = useStickyActionState(rootRef, actionGroupRef);
    const [hasCopied, setHasCopied] = useState(false);

    const defaultCopyButtonText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.copy),
    });
    const defaultCopyFailedMessage = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.copyFailed),
    });
    const shareText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.copyableContent.share),
    });

    const html = useMemo(() => formatStringToHtml(content).html, [content]);

    useEffect(
        () => () => {
            window.clearTimeout(copyFeedbackTimeoutRef.current);
        },
        [],
    );

    const showCopyFeedback = useCallback(() => {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
        setHasCopied(true);

        copyFeedbackTimeoutRef.current = window.setTimeout(() => {
            setHasCopied(false);
        }, COPY_FEEDBACK_DURATION);
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await copyableContentToClipboard(content);
            showCopyFeedback();
        } catch {
            void createDialog({
                showCloseIcon: true,
                text: copyFailedMessage ?? defaultCopyFailedMessage,
                toastType: ToastType.ERROR,
                type: DialogType.TOAST,
            }).open();
        }
    }, [content, defaultCopyFailedMessage, copyFailedMessage, showCopyFeedback]);

    return (
        <StyledCopyableContent $appearance={appearance} className="copyable-content" ref={rootRef}>
            <StyledCopyableContentActions ref={actionGroupRef}>
                <StyledCopyableContentActionGroup>
                    <StyledCopyableContentButton
                        $isSticky={isActionGroupSticky}
                        aria-label={defaultCopyButtonText}
                        onClick={() => {
                            void handleCopy();
                        }}
                        type="button"
                    >
                        <Icon icons={hasCopied ? ['fa fa-check'] : ['fa-light fa-copy']} />
                    </StyledCopyableContentButton>
                    <SharingContextMenu
                        link={content}
                        shouldShowCallingCodeAction={false}
                        shouldShowCopyAction={false}
                        shouldUseDefaultTriggerStyles={false}
                    >
                        <StyledCopyableContentButton
                            $isSticky={isActionGroupSticky}
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

export { CopyableContentAppearance } from './CopyableContent.types';
