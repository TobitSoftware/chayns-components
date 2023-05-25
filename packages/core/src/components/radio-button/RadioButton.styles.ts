import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledRadioButton = styled.span`
    display: flex;
    gap: 5px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
    align-items: center;
    position: relative;
`;

type StyledRadioButtonCheckBoxProps = WithTheme<unknown>;

export const StyledRadioButtonCheckBox = styled.input<StyledRadioButtonCheckBoxProps>`
    cursor: pointer !important;

    :before {
        background-color: ${({ theme }: StyledRadioButtonCheckBoxProps) => theme['secondary-103']};
        border: 1px solid rgba(160, 160, 160, 0.3);
        content: '';
        width: 13px;
        height: 13px;
        position: absolute;
        border-radius: 100%;
        top: 5.8px;
        left: 0;
        cursor: pointer !important;
    }

    :checked::before {
        content: '';
        width: 13px;
        height: 13px;
        background-color: ${({ theme }: StyledRadioButtonCheckBoxProps) => theme.secondary};
        position: absolute;
        border-radius: 100%;
        top: 5.75px;
        left: 0;
        cursor: pointer !important;
    }
`;

type StyledRadioButtonCheckBoxMarkProps = WithTheme<{
    isHovered: boolean;
    isSelected: boolean;
}>;

export const StyledRadioButtonCheckBoxMark = styled.input<StyledRadioButtonCheckBoxMarkProps>`
    cursor: pointer;
    background-color: transparent;
    position: absolute;
    top: 6.8px;
    left: 3.25px;
    display: inline-block;
    transform: rotate(35deg);
    height: 9px;
    width: 0.75px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    border-top: transparent;
    border-left: transparent;
    z-index: 2;

    ${({ isHovered, isSelected }) => {
        if (isSelected) {
            return css`
                opacity: 1;
            `;
        }

        if (isHovered) {
            return css`
                opacity: 0.5;
            `;
        }

        return css`
            opacity: 0;
        `;
    }}
`;

type StyledRadioButtonLabelProps = WithTheme<unknown>;

export const StyledRadioButtonLabel = styled.p<StyledRadioButtonLabelProps>`
    color: ${({ theme }: StyledRadioButtonLabelProps) => theme.text};
`;
