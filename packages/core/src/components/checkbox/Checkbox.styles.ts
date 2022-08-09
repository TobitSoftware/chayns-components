import styled from 'styled-components';
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

type StyledCheckboxLabelProps = WithTheme<Pick<CheckboxProps, 'isChecked' | 'isDisabled'>>;

export const StyledCheckboxLabel = styled.label<StyledCheckboxLabelProps>`
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    padding-left: 20px;
    transition: opacity 0.2s ease;
    user-select: none;

    &:after {
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        content: ' ';
        height: 10px;
        left: 1px;
        opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
        position: absolute;
        top: 50%;
        transform: translateY(-50%) rotateZ(37deg);
        transform-origin: 100% 100%;
        transition: opacity 0.2s ease;
        width: 5.5px;
    }

    &:before {
        background-color: ${({ isChecked, theme }: StyledCheckboxLabelProps) =>
            isChecked ? theme['408'] : theme['403']};
        border: 1px solid rgba(${({ theme }: StyledCheckboxLabelProps) => theme['409-rgb']}, 0.5);
        content: ' ';
        height: 15px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.2s ease;
        width: 15px;
    }
`;
