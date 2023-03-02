import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { CheckboxProps } from './Checkbox';

export const StyledCheckbox = styled.div`
    align-items: center;
    display: flex;
    position: relative;
`;

export const StyledCheckboxInput = styled.input`
    display: none;
`;

type StyledCheckboxLabelProps = WithTheme<Omit<CheckboxProps, 'children' | 'onChange'>>;

export const StyledCheckboxLabel = styled.label<StyledCheckboxLabelProps>`
    color: ${({ theme }: StyledCheckboxLabelProps) => theme.text};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    padding-left: ${({ shouldShowAsSwitch }) => (shouldShowAsSwitch ? '48px' : '20px')};
    transition: opacity 0.2s ease;
    user-select: none;

    &:after {
        ${({ isChecked, shouldShowAsSwitch }) =>
            shouldShowAsSwitch
                ? css`
                      background-color: white;
                      border-radius: 50%;
                      box-shadow: 0 1px 4px rgb(0 0 0 / 35%);
                      height: 16px;
                      left: 7px;
                      transform: translateY(-50%) translateX(${isChecked ? '18px' : 0});
                      transition: transform 0.2s ease;
                      width: 16px;
                  `
                : css`
                      border-right: 2px solid #fff;
                      border-bottom: 2px solid #fff;
                      height: 10px;
                      left: 1px;
                      opacity: ${isChecked ? 1 : 0};
                      transform: translateY(-50%) rotateZ(37deg);
                      transition: opacity 0.2s ease;
                      width: 5.5px;
                  `}

        content: ' ';
        position: absolute;
        top: 50%;
        transform-origin: 100% 100%;
    }

    &:before {
        background-color: ${({
            isChecked,
            shouldShowAsSwitch,
            theme,
        }: StyledCheckboxLabelProps) => {
            if (shouldShowAsSwitch) {
                return isChecked ? theme.green : theme.red;
            }

            return isChecked ? theme['408'] : theme['403'];
        }};
        border: 1px solid rgba(${({ theme }: StyledCheckboxLabelProps) => theme['409-rgb']}, 0.5);
        border-radius: ${({ shouldShowAsSwitch }) => (shouldShowAsSwitch ? '100px' : 0)};
        content: ' ';
        height: ${({ shouldShowAsSwitch }) => (shouldShowAsSwitch ? '13px' : '15px')};
        left: ${({ shouldShowAsSwitch }) => (shouldShowAsSwitch ? '10px' : 0)};
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.2s ease;
        width: ${({ shouldShowAsSwitch }) => (shouldShowAsSwitch ? '28px' : '15px')};
    }
`;
