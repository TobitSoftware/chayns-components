import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputProps } from './Input';

type StyledInputProps = WithTheme<Pick<InputProps, 'isDisabled'| 'isInvalid'>>;

export const StyledInput = styled.div<StyledInputProps>`
    align-items: center;
    background-color: ${({ theme }: StyledInputProps) => theme['100']};
    border: 1px solid ${({theme, isInvalid}:StyledInputProps ) => isInvalid ? theme.wrong : 'rgba(160, 160, 160, 0.3)'};
    border-radius: 3px;
    color: ${({ theme }: StyledInputProps) => theme['006']};
    display: flex;
    justify-content: space-between;
    min-height: 42px;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    transition: opacity 0.3s ease;
    width: 100%;
`;

export const StyledInputContent = styled.div`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    margin: 8px 10px;
    position: relative;
`;

type StyledInputFieldProps = WithTheme<Pick<InputProps, 'isInvalid'>>;

export const StyledInputField = styled.input<StyledInputFieldProps>`
    background: none;
    border: none;
    color: ${({ theme, isInvalid }: StyledInputFieldProps) => isInvalid ? theme.wrong : theme.text};
    padding: 0;
    width: 100%;
`;

type StyledMotionInputLabelProps = WithTheme<Pick<InputProps, 'isInvalid'>>;

export const StyledMotionInputLabel = styled(motion.label)<StyledMotionInputLabelProps>`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
    color: ${({theme, isInvalid}: StyledMotionInputLabelProps)=> isInvalid ? theme.wrong : undefined}
`;

type StyledMotionInputClearIconProps = WithTheme<Pick<InputProps, 'isInvalid'>>;

export const StyledMotionInputClearIcon = styled(motion.div)<StyledMotionInputClearIconProps>`
    align-items: center;
    border-left: 1px solid rgba(160, 160, 160, 0.3);
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    width: 40px;
`;

export const StyledInputIconWrapper = styled.div`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    margin-left: 10px;
`;
