import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledRadioButtonProps = WithTheme<{ isDisabled: boolean }>;

export const StyledRadioButton = styled.span<StyledRadioButtonProps>`
    display: flex;
    gap: 5px;
    user-select: none;
    width: fit-content;
    align-items: center;
    position: relative;
    cursor: ${({ isDisabled }: StyledRadioButtonProps) =>
        isDisabled ? 'default !important' : 'pointer'};
    opacity: ${({ isDisabled }: StyledRadioButtonProps) => (isDisabled ? 0.5 : 1)};
`;

type StyledRadioButtonCheckBoxProps = WithTheme<unknown>;

export const StyledRadioButtonCheckBox = styled.input<StyledRadioButtonCheckBoxProps>`
    opacity: 0;
`;

type StyledRadioButtonPseudoCheckBoxProps = WithTheme<{ isChecked: boolean }>;

export const StyledRadioButtonPseudoCheckBox = styled.div<StyledRadioButtonPseudoCheckBoxProps>`
    background-color: ${({ theme, isChecked }: StyledRadioButtonPseudoCheckBoxProps) =>
        isChecked ? theme.secondary : theme['secondary-103']};
    opacity: 0.5;
    border: 1px solid rgba(160, 160, 160, 0.3);
    width: 13px;
    height: 13px;
    position: absolute;
    border-radius: 100%;
    top: 22%;
    left: -1%;
    cursor: pointer !important;
`;

type StyledRadioButtonCheckBoxMarkProps = WithTheme<{
    isHovered: boolean;
    isSelected: boolean;
}>;

export const StyledRadioButtonCheckBoxMark = styled.span<StyledRadioButtonCheckBoxMarkProps>`
    cursor: pointer;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 2.925px;
    display: inline-block;
    transform: rotate(35deg);
    height: 9px;
    width: 5px;
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
