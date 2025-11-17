import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { OldInputSize } from './OldInput';
import { CSSProperties } from 'react';

type StyledOldInputProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledOldInput = styled.div<StyledOldInputProps>`
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    display: flex;
    width: 100%;
`;

type StyledOldInputContentWrapperProps = WithTheme<{
    $backgroundColor?: CSSProperties['backgroundColor'];
    $shouldRoundRightCorners: boolean;
    $shouldShowOnlyBottomBorder?: boolean;
    $isInvalid?: boolean;
    $size: OldInputSize;
    $shouldShowTransparentBackground: boolean;
}>;

export const StyledOldInputContentWrapper = styled.div<StyledOldInputContentWrapperProps>`
    align-items: center;
    background-color: ${({ theme, $backgroundColor }: StyledOldInputContentWrapperProps) =>
        $backgroundColor ?? theme['100']};
    border: 1px solid transparent;
    color: ${({ theme }: StyledOldInputContentWrapperProps) => theme['006']};
    display: flex;
    justify-content: space-between;
    width: 100%;
    transition: opacity 0.3s ease;

    ${({ theme, $isInvalid, $shouldShowTransparentBackground }) => {
        if ($isInvalid) {
            return css`
                border-color: ${theme.wrong};
            `;
        }

        if ($shouldShowTransparentBackground) {
            if (theme.colorMode === 'dark') {
                return css`
                    border-color: rgba(255, 255, 255, 0.5);
                `;
            }

            return css`
                border-color: rgba(0, 0, 0, 0.5);
            `;
        }

        return css`
            border-color: rgba(160, 160, 160, 0.3);
        `;
    }}

    ${({ $size }) =>
        $size === 'small' &&
        css`
            height: 32px;
        `}

    ${({ $shouldShowOnlyBottomBorder, $size }) =>
        !$shouldShowOnlyBottomBorder &&
        css`
            min-height: ${$size === 'medium' ? '42px' : '32px'};
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

type StyledOldInputContentProps = WithTheme<{ $shouldShowOnlyBottomBorder?: boolean }>;

export const StyledOldInputContent = styled.div<StyledOldInputContentProps>`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    margin: ${({ $shouldShowOnlyBottomBorder }) =>
        !$shouldShowOnlyBottomBorder ? '8px 10px' : '4px 0'};
    position: relative;
`;

type StyledOldInputFieldProps = WithTheme<{
    $color?: CSSProperties['color'];
    $isInvalid?: boolean;
    $placeholderWidth: number;
    $shouldShowCenteredContent: boolean;
}>;

export const StyledOldInputField = styled.input<StyledOldInputFieldProps>`
    background: none;
    border: none;
    color: ${({ theme, $color, $isInvalid }: StyledOldInputFieldProps) =>
        $color ?? ($isInvalid ? theme.wrong : theme.text)};
    padding: 0;
    width: ${({ $placeholderWidth }) => `calc(100% - ${$placeholderWidth}px)`};
    line-height: 1em;

    ${({ $shouldShowCenteredContent }) =>
        $shouldShowCenteredContent &&
        css`
            text-align: center;
        `}
`;

export const StyledMotionOldInputLabelWrapper = styled(motion.label)`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
    max-width: 100%;
`;

type StyledOldInputLabelProps = WithTheme<{ $isInvalid?: boolean }>;

export const StyledOldInputLabel = styled.label<StyledOldInputLabelProps>`
    line-height: 1.3;
    pointer-events: none;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, $isInvalid }: StyledOldInputLabelProps) =>
        $isInvalid ? theme.wrong : `rgba(${theme['text-rgb'] ?? ''}, 0.45)`};
`;

type StyledMotionOldInputClearIconProps = WithTheme<{
    $shouldShowOnlyBottomBorder?: boolean;
    $size: OldInputSize;
}>;

export const StyledMotionOldInputClearIcon = styled(motion.div)<StyledMotionOldInputClearIconProps>`
    align-items: center;
    border-left: ${({ $shouldShowOnlyBottomBorder }) =>
        $shouldShowOnlyBottomBorder ? 'none' : '1px solid rgba(160, 160, 160, 0.3)'};
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    height: ${({ $size }) => ($size === 'medium' ? '40px' : '30px')};
    justify-content: center;
    width: ${({ $size }) => ($size === 'medium' ? '40px' : '30px')};
`;

export const StyledOldInputIconWrapper = styled.div`
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    margin-left: 10px;
`;

export const StyledOldInputRightElement = styled.div`
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
    flex: 0 0 auto;
`;
