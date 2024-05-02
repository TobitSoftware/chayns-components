import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledInputProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledInput = styled.div<StyledInputProps>`
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    display: flex;
    width: 100%;
`;

type StyledInputContentWrapperProps = WithTheme<{
    $shouldRoundRightCorners: boolean;
    $shouldShowOnlyBottomBorder?: boolean;
    $isInvalid?: boolean;
    $shouldChangeColor: boolean;
}>;

export const StyledInputContentWrapper = styled.div<StyledInputContentWrapperProps>`
    align-items: center;
    background-color: ${({ theme, $shouldChangeColor }: StyledInputContentWrapperProps) =>
        theme.colorMode === 'classic' || $shouldChangeColor ? theme['000'] : theme['100']};
    border: 1px solid
        ${({ theme, $isInvalid }: StyledInputContentWrapperProps) =>
            $isInvalid ? theme.wrong : 'rgba(160, 160, 160, 0.3)'};
    color: ${({ theme }: StyledInputContentWrapperProps) => theme['006']};
    display: flex;
    justify-content: space-between;
    width: 100%;
    transition: opacity 0.3s ease;

    ${({ $shouldShowOnlyBottomBorder }) =>
        !$shouldShowOnlyBottomBorder &&
        css`
            min-height: 42px;
        `}

    ${({ $shouldRoundRightCorners, $shouldShowOnlyBottomBorder, theme }) => {
        if ($shouldShowOnlyBottomBorder) {
            return css`
                border-top: none;
                border-right: none;
                border-left: none;
                background-color: transparent;
                border-color: ${theme['408']};
            `;
        }

        if ($shouldRoundRightCorners) {
            return css`
                border-radius: 3px;
            `;
        }

        return css`
            border-bottom-left-radius: 3px;
            border-top-left-radius: 3px;
            border-right: none;
        `;
    }}
`;

type StyledInputContentProps = WithTheme<{ $shouldShowOnlyBottomBorder?: boolean }>;

export const StyledInputContent = styled.div<StyledInputContentProps>`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    margin: ${({ $shouldShowOnlyBottomBorder }) =>
        !$shouldShowOnlyBottomBorder ? '8px 10px' : '4px 0'};
    position: relative;
`;

type StyledInputFieldProps = WithTheme<{
    $isInvalid?: boolean;
    $shouldShowCenteredContent: boolean;
    $placeholderWidth: number;
}>;

export const StyledInputField = styled.input<StyledInputFieldProps>`
    background: none;
    border: none;
    color: ${({ theme, $isInvalid }: StyledInputFieldProps) =>
        $isInvalid ? theme.wrong : theme.text};
    padding: 0;
    width: ${({ $placeholderWidth }) => `calc(100% - ${$placeholderWidth}px)`};
    line-height: 1em;

    ${({ $shouldShowCenteredContent }) =>
        $shouldShowCenteredContent &&
        css`
            text-align: center;
        `}
`;

export const StyledMotionInputLabelWrapper = styled(motion.label)`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
    max-width: 100%;
`;

type StyledInputLabelProps = WithTheme<{ $isInvalid?: boolean }>;

export const StyledInputLabel = styled.label<StyledInputLabelProps>`
    line-height: 1.3;
    pointer-events: none;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, $isInvalid }: StyledInputLabelProps) =>
        $isInvalid ? theme.wrong : undefined};
`;

type StyledMotionInputClearIconProps = WithTheme<{ $shouldShowOnlyBottomBorder?: boolean }>;

export const StyledMotionInputClearIcon = styled(motion.div)<StyledMotionInputClearIconProps>`
    align-items: center;
    border-left: ${({ $shouldShowOnlyBottomBorder }) =>
        $shouldShowOnlyBottomBorder ? 'none' : '1px solid rgba(160, 160, 160, 0.3)'};
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

export const StyledInputRightElement = styled.div`
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
    flex: 0 0 auto;
`;
