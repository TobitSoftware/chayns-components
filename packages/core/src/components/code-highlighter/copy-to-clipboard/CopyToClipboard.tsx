import React, { FC } from 'react';
import { Icon, Popup } from '../../../index';
import { CodeHighlighterTheme } from '../../../types/codeHighlighter';
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
