import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { RadioButtonRightElementMargin } from './RadioButton.types';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledRadioButtonProps = WithTheme<{
    $isDisabled: boolean;
    $radioButtonRightElementMargin: RadioButtonRightElementMargin;
}>;

export const StyledRadioButton = styled.span<StyledRadioButtonProps>`
    display: flex;
    flex-direction: column;

    position: relative;

    opacity: ${({ $isDisabled }: StyledRadioButtonProps) => ($isDisabled ? 0.5 : 1)};

    ${({ $radioButtonRightElementMargin }: StyledRadioButtonProps) => {
        switch ($radioButtonRightElementMargin) {
            case 'BOTH':
                return css`
                    margin: 6px 0;
                `;
            case 'TOP':
                return css`
                    margin-top: 6px;
                `;
            case 'BOTTOM':
                return css`
                    margin-bottom: 6px;
                `;
            case 'NONE':
            default:
                return css`
                    margin: 0;
                `;
        }
    }}
`;

export const StyledRadioButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    gap: 5px;
    user-select: none;
`;

type StyledRadioButtonCheckBoxProps = WithTheme<{ $isDisabled: boolean }>;

export const StyledRadioButtonCheckBox = styled.input<StyledRadioButtonCheckBoxProps>`
    opacity: 0;
    height: 15px;
    width: 15px;
    cursor: ${({ $isDisabled }: StyledRadioButtonCheckBoxProps) =>
        $isDisabled ? 'default !important' : 'pointer !important'};
`;

type StyledRadioButtonPseudoCheckBoxProps = WithTheme<{
    $isChecked: boolean;
    $isDisabled: boolean;
}>;

export const StyledRadioButtonPseudoCheckBox = styled.div<StyledRadioButtonPseudoCheckBoxProps>`
    background-color: ${({ theme, $isChecked }: StyledRadioButtonPseudoCheckBoxProps) =>
        $isChecked ? theme['secondary-408'] : theme['secondary-403']};
    opacity: 1;
    border: 1px solid
        rgba(${({ theme }: StyledRadioButtonPseudoCheckBoxProps) => theme['409-rgb']}, 0.5);
    width: 15px;
    height: 15px;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    transform: translateY(-50%);
    cursor: ${({ $isDisabled }: StyledRadioButtonPseudoCheckBoxProps) =>
        $isDisabled ? 'default !important' : 'pointer !important'};
`;

type StyledRadioButtonCheckBoxMarkProps = WithTheme<{
    $isHovered: boolean;
    $isSelected: boolean;
    $isDisabled: boolean;
}>;

export const StyledRadioButtonCheckBoxMark = styled.span<StyledRadioButtonCheckBoxMarkProps>`
    background-color: transparent;
    position: absolute;
    top: 1px;
    left: 3.925px;
    display: inline-block;
    transform: rotate(35deg);
    height: 9px;
    width: 5px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    border-top: transparent;
    border-left: transparent;
    z-index: 2;
    cursor: ${({ $isDisabled }: StyledRadioButtonCheckBoxMarkProps) =>
        $isDisabled ? 'default !important' : 'pointer !important'};

    ${({ $isHovered, $isSelected }) => {
        if ($isSelected) {
            return css`
                opacity: 1;
            `;
        }

        if ($isHovered) {
            return css`
                opacity: 0.5;
            `;
        }

        return css`
            opacity: 0;
        `;
    }}
`;

type StyledRadioButtonLabelProps = WithTheme<{ $isDisabled: boolean }>;

export const StyledRadioButtonLabel = styled.p<StyledRadioButtonLabelProps>`
    color: ${({ theme }: StyledRadioButtonLabelProps) => theme.text};
    margin: 0;
    cursor: ${({ $isDisabled }: StyledRadioButtonLabelProps) =>
        $isDisabled ? 'default !important' : 'pointer !important'};
`;

export const StyledLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
`;

type StyledMotionRadioButtonChildrenProps = WithTheme<unknown>;

export const StyledMotionRadioButtonChildren = styled(
    motion.div,
)<StyledMotionRadioButtonChildrenProps>`
    margin-left: 20px;
    cursor: text;
    overflow: hidden;
    color: ${({ theme }: StyledMotionRadioButtonChildrenProps) => theme.text};
`;
