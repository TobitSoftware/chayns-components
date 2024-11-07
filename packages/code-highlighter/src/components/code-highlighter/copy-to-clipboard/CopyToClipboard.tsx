import { Icon, Popup } from '@chayns-components/core';
import React, { FC } from 'react';
import { CodeHighlighterTheme } from '../../../types/codeHighlighter';
import { StyledCopyToClipboard, StyledCopyToClipboardText } from './CopyToClipboard.styles';

export type CopyToClipboardProps = {
    copyButtonText?: string;
    text: string;
    theme: CodeHighlighterTheme;
};

const CopyToClipboard: FC<CopyToClipboardProps> = ({ copyButtonText, text, theme }) => {
    const handleClick = () => {
        void navigator.clipboard.writeText(text);
    };

    const popupContent = (
        <span style={{ display: 'block', padding: '5px' }}>
            <p>Kopiert!</p>
        </span>
    );

    return (
        <Popup content={popupContent}>
            <StyledCopyToClipboard onClick={handleClick}>
                <Icon
                    icons={['fa-light fa-clipboard']}
                    color={theme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999'}
                />
                {copyButtonText && (
                    <StyledCopyToClipboardText $codeTheme={theme}>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <twIgnore>{copyButtonText}</twIgnore>
                    </StyledCopyToClipboardText>
                )}
            </StyledCopyToClipboard>
        </Popup>
    );
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
