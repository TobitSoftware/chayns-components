import { Icon, Popup } from '@chayns-components/core';
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

    const popupContent = (
        <span style={{ display: 'block', padding: '5px' }}>
            {/* <h1 style={{ margin: 0 }}>Popup</h1> */}
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
            </StyledCopyToClipboard>
        </Popup>
    );
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
