import styled from 'styled-components';
import type { WithTheme } from '../../../color-scheme-provider/ColorSchemeProvider';
import { motion } from 'framer-motion';

export const StyledOpeningInput = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const StyledOpeningInputWrapper = styled.div`
    width: 60px;
`;

type StyledOpeningInputTextProps = WithTheme<{ isDisabled?: boolean }>;

export const StyledOpeningInputText = styled.div<StyledOpeningInputTextProps>`
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

type StyledOpeningInputButtonWrapperProps = WithTheme<unknown>;

export const StyledOpeningInputButtonWrapper = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${({ theme }: StyledOpeningInputButtonWrapperProps) => theme['202']};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledOpeningInputPseudoButton = styled.div`
    width: 20px;
`;
