import { Icon, SharingContextMenu } from '@chayns-components/core';
import { ttsToITextString, useTextstringValue } from '@chayns-components/textstring';
import { createDialog, DialogType, ToastType } from 'chayns-api';
import React, { FC, RefObject, useCallback, useRef } from 'react';
import { CodeHighlighterTheme } from '../../../types/codeHighlighter';
import {
    StyledCopyToClipboard,
    StyledCopyToClipboardActionGroup,
    StyledCopyToClipboardButton,
} from './CopyToClipboard.styles';
import textStrings from '../../../constants/textStrings';
import { useStickyActionState } from './useStickyActionState';

export type CopyToClipboardProps = {
    copyButtonText?: string;
    rootRef: RefObject<HTMLDivElement>;
    text: string;
    theme: CodeHighlighterTheme;
};

const CopyToClipboard: FC<CopyToClipboardProps> = ({ copyButtonText, rootRef, text, theme }) => {
    const actionGroupRef = useRef<HTMLDivElement>(null);
    const isActionGroupSticky = useStickyActionState(rootRef, actionGroupRef);

    const defaultCopyText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.codeHighlighter.copyToClipboard.copy),
    });
    const copiedText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.codeHighlighter.copyToClipboard.copied),
    });
    const copyFailedText = useTextstringValue({
        textstring: ttsToITextString(
            textStrings.components.codeHighlighter.copyToClipboard.copyFailed,
        ),
    });
    const shareText = useTextstringValue({
        textstring: ttsToITextString(textStrings.components.codeHighlighter.copyToClipboard.share),
    });

    const copyText = copyButtonText ?? defaultCopyText;
    const iconColor = theme === CodeHighlighterTheme.Dark ? '#f4f6f8' : '#5f6368';

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
            void createDialog({
                showCloseIcon: true,
                text: copiedText,
                toastType: ToastType.SUCCESS,
                type: DialogType.TOAST,
            }).open();
        } catch {
            void createDialog({
                showCloseIcon: true,
                text: copyFailedText,
                toastType: ToastType.ERROR,
                type: DialogType.TOAST,
            }).open();
        }
    }, [copiedText, copyFailedText, text]);

    return (
        <StyledCopyToClipboard $codeTheme={theme} ref={actionGroupRef}>
            <StyledCopyToClipboardActionGroup>
                <StyledCopyToClipboardButton
                    $codeTheme={theme}
                    $isSticky={isActionGroupSticky}
                    aria-label={copyText}
                    onClick={() => {
                        void handleCopy();
                    }}
                    type="button"
                >
                    <Icon color={iconColor} icons={['fa-light fa-copy']} />
                </StyledCopyToClipboardButton>
                <SharingContextMenu link={text} shouldUseDefaultTriggerStyles={false}>
                    <StyledCopyToClipboardButton
                        $codeTheme={theme}
                        $isSticky={isActionGroupSticky}
                        aria-label={shareText}
                        type="button"
                    >
                        <Icon color={iconColor} icons={['fa fa-share-nodes']} />
                    </StyledCopyToClipboardButton>
                </SharingContextMenu>
            </StyledCopyToClipboardActionGroup>
        </StyledCopyToClipboard>
    );
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
