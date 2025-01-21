import styled, { css } from 'styled-components';
import { getCheckBoxPosition } from '../../utils/checkBox';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { CheckboxProps } from './Checkbox';

export const StyledCheckbox = styled.div`
    align-items: center;
    display: flex;
    position: relative;
    width: 100%;
    min-height: 20px;
`;

export const StyledCheckboxInput = styled.input`
    display: none;
`;

type StyledCheckboxBoxProps = WithTheme<{
    $shouldShowAsSwitch?: CheckboxProps['shouldShowAsSwitch'];
    $isDisabled?: CheckboxProps['isDisabled'];
    $isChecked?: CheckboxProps['isChecked'];
    $lineHeight?: number;
}>;

export const StyledCheckboxBox = styled.label<StyledCheckboxBoxProps>`
    color: ${({ theme }: StyledCheckboxBoxProps) => theme.text};
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding-left: ${({ $shouldShowAsSwitch }) => ($shouldShowAsSwitch ? '48px' : '20px')};
    transition: opacity 0.2s ease;
    user-select: none;

    &:after {
        ${({ $isChecked, $shouldShowAsSwitch, $lineHeight, theme }: StyledCheckboxBoxProps) =>
            $shouldShowAsSwitch
                ? css`
                      background-color: white;
                      border-radius: 50%;
                      box-shadow: 0 1px 4px rgb(0 0 0 / 35%);
                      height: 16px;
                      left: 7px;
                      top: ${$lineHeight
                          ? `${(getCheckBoxPosition(Number(theme.fontSize)) ?? 5) + 6}px`
                          : '50%'};
                      transform: translateX(${$isChecked ? '18px' : 0}) translateY(-50%);
                      transition: transform 0.2s ease;
                      width: 16px;
                  `
                : css`
                      border-right: 2px solid #fff;
                      border-bottom: 2px solid #fff;
                      height: 10px;
                      left: 2px;
                      opacity: ${$isChecked ? 1 : 0};
                      top: ${$lineHeight
                          ? `${(getCheckBoxPosition(Number(theme.fontSize)) ?? 5) + 5}px`
                          : 'calc(50% - 2px)'};
                      transform: rotateZ(37deg) translateY(-50%);
                      transition: opacity 0.2s ease;
                      width: 5.5px;
                  `}

        content: ' ';
        position: absolute;
    }

    &:before {
        background-color: ${({
            $isChecked,
            $shouldShowAsSwitch,
            theme,
        }: StyledCheckboxBoxProps) => {
            if ($shouldShowAsSwitch) {
                return $isChecked ? theme.green : theme.red;
            }

            return $isChecked ? theme['408'] : theme['403'];
        }};

        ${({ $shouldShowAsSwitch, theme }) =>
            !$shouldShowAsSwitch &&
            css`
                border: 1px solid rgba(${theme['409-rgb']}, 0.5);
            `}

        border-radius: ${({ $shouldShowAsSwitch }) => ($shouldShowAsSwitch ? '100px' : 0)};
        content: ' ';
        height: ${({ $shouldShowAsSwitch }) => ($shouldShowAsSwitch ? '13px' : '15px')};
        left: ${({ $shouldShowAsSwitch }) => ($shouldShowAsSwitch ? '10px' : 0)};
        position: absolute;
        transition: background-color 0.2s ease;
        width: ${({ $shouldShowAsSwitch }) => ($shouldShowAsSwitch ? '28px' : '15px')};
        ${({ $lineHeight, theme, $shouldShowAsSwitch }: StyledCheckboxBoxProps) =>
            $lineHeight
                ? css`
                      top: ${getCheckBoxPosition(Number(theme.fontSize)) ??
                      5 + ($shouldShowAsSwitch ? 1 : 0)}px;
                  `
                : css`
                      top: 50%;
                      transform: translateY(-50%);
                  `}
    }
}
`;

type StyledCheckboxLabelProps = WithTheme<{
    $isDisabled?: CheckboxProps['isDisabled'];
    $shouldChangeOnLabelClick?: CheckboxProps['shouldChangeOnLabelClick'];
}>;

export const StyledCheckboxLabel = styled.label<StyledCheckboxLabelProps>`
    color: ${({ theme }: StyledCheckboxLabelProps) => theme.text};
    cursor: ${({ $shouldChangeOnLabelClick }) =>
        !$shouldChangeOnLabelClick ? 'default' : 'pointer'};
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    transition: opacity 0.2s ease;
    user-select: none;
`;
