import { Icon, Tooltip } from '@chayns-components/core';
import React, { FC } from 'react';
import { CodeHighlighterTheme } from '../../types/codeHighlighter';
import { StyledCopyToClipboard } from './CopyToClipboard.styles';

export type CopyToClipboardProps = {
    text: string;
    theme: CodeHighlighterTheme;
};

const CopyToClipboard: FC<CopyToClipboardProps> = ({ text, theme }) => {
    const handleClick = () => {
        void navigator.clipboard.writeText(text);
    };

    return (
        <Tooltip
            item={{
                text: 'Kopieren',
            }}
        >
            <StyledCopyToClipboard onClick={handleClick}>
                <Icon
                    icons={['fa-light fa-clipboard']}
                    color={theme === CodeHighlighterTheme.Dark ? '#e5e5e5' : '#999999'}
                />
            </StyledCopyToClipboard>
        </Tooltip>
    );
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
