import { formatStringToHtml } from '@chayns-components/format';
import { useTranslation } from '@chayns/textstrings';
import { createDialog, DialogType, ToastType } from 'chayns-api';
import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import textStrings from '../../constants/textStrings';
import { useStickyActionState } from '../../hooks/useStickyActionState';
import { useColorScheme } from '../color-scheme-provider/ColorSchemeProvider';
import SharingContextMenu from '../sharing-context-menu/SharingContextMenu';
import Icon from '../icon/Icon';
import Truncation from '../truncation/Truncation';
import {
    CopyableContentColorMode,
    StyledCopyableContent,
    StyledCopyableContentActionGroup,
    StyledCopyableContentActions,
    StyledCopyableContentBody,
    StyledCopyableContentButton,
    StyledCopyableContentTruncation,
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
     * Disables the copy and share actions.
     */
    isDisabled?: boolean;
    /**
     * Replaces only the visible rendered content and never the copied source.
     */
    children?: ReactNode;
    /**
     * Replaces the localized error message shown when copying fails.
     */
    copyFailedMessage?: string;
    /**
     * The height of the content in its collapsed state.
     */
    collapsedHeight?: number;
    /**
     * Transforms the generated HTML before it is written to the clipboard.
     */
    transformClipboardHtml?: (html: string) => string;
};

const CopyableContent: FC<CopyableContentProps> = ({
    appearance = CopyableContentAppearance.Default,
    content,
    children,
    copyFailedMessage,
    collapsedHeight,
    isDisabled = false,
    transformClipboardHtml,
}) => {
    const rootRef = useRef<HTMLElement>(null);
    const actionGroupRef = useRef<HTMLDivElement>(null);
    const copyFeedbackTimeoutRef = useRef<number>();
    const isActionGroupSticky = useStickyActionState(rootRef, actionGroupRef);
    const [hasCopied, setHasCopied] = useState(false);

    const colorScheme = useColorScheme();
    const colorMode =
        colorScheme?.theme.colorMode === 'dark'
            ? CopyableContentColorMode.Dark
            : CopyableContentColorMode.Light;

    const { t } = useTranslation();
    const defaultCopyButtonText = t(textStrings.components.copyableContent.copy);
    const defaultCopyFailedMessage = t(textStrings.components.copyableContent.copyFailed);
    const shareText = t(textStrings.components.copyableContent.share);

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
        if (isDisabled) {
            return;
        }

        try {
            await copyableContentToClipboard(content, transformClipboardHtml);
            showCopyFeedback();
        } catch {
            void createDialog({
                showCloseIcon: true,
                text: copyFailedMessage ?? defaultCopyFailedMessage,
                toastType: ToastType.ERROR,
                type: DialogType.TOAST,
            }).open();
        }
    }, [
        content,
        defaultCopyFailedMessage,
        isDisabled,
        copyFailedMessage,
        showCopyFeedback,
        transformClipboardHtml,
    ]);

    return (
        <StyledCopyableContent
            $appearance={appearance}
            $colorMode={colorMode}
            className="copyable-content"
            ref={rootRef}
        >
            <StyledCopyableContentActions ref={actionGroupRef}>
                <StyledCopyableContentActionGroup>
                    <StyledCopyableContentButton
                        $colorMode={colorMode}
                        $isSticky={isActionGroupSticky}
                        aria-label={defaultCopyButtonText}
                        disabled={isDisabled}
                        onClick={() => {
                            void handleCopy();
                        }}
                        type="button"
                    >
                        <Icon icons={hasCopied ? ['fa fa-check'] : ['fa-light fa-copy']} />
                    </StyledCopyableContentButton>
                    <SharingContextMenu
                        link={content}
                        shouldDisableClick={isDisabled}
                        shouldShowCallingCodeAction={false}
                        shouldShowCopyAction={false}
                        shouldUseDefaultTriggerStyles={false}
                    >
                        <StyledCopyableContentButton
                            $colorMode={colorMode}
                            $isSticky={isActionGroupSticky}
                            aria-label={shareText}
                            disabled={isDisabled}
                            type="button"
                        >
                            <Icon icons={['fa fa-share-nodes']} />
                        </StyledCopyableContentButton>
                    </SharingContextMenu>
                </StyledCopyableContentActionGroup>
            </StyledCopyableContentActions>
            {typeof collapsedHeight === 'number' ? (
                <StyledCopyableContentTruncation>
                    <Truncation collapsedHeight={collapsedHeight}>
                        <StyledCopyableContentBody
                            $colorMode={colorMode}
                            $shouldShowPadding={false}
                        >
                            {children ?? <div dangerouslySetInnerHTML={{ __html: html }} />}
                        </StyledCopyableContentBody>
                    </Truncation>
                </StyledCopyableContentTruncation>
            ) : (
                <StyledCopyableContentBody $colorMode={colorMode}>
                    {children ?? <div dangerouslySetInnerHTML={{ __html: html }} />}
                </StyledCopyableContentBody>
            )}
        </StyledCopyableContent>
    );
};

CopyableContent.displayName = 'CopyableContent';

export default CopyableContent;

export { CopyableContentAppearance } from './CopyableContent.types';
