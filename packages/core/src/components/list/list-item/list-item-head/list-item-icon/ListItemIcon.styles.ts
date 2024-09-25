import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemIconProps = WithTheme<{
    $shouldHideBackground?: boolean;
    $shouldShowRoundIcon?: boolean;
}>;

export const StyledListItemIcon = styled.div<StyledListItemIconProps>`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    transition:
        background-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease;
    width: 40px;

    border-radius: ${({ $shouldShowRoundIcon }) => ($shouldShowRoundIcon ? '50%' : undefined)};

    ${({ $shouldHideBackground }) =>
        !$shouldHideBackground &&
        css`
            background-color: rgba(
                ${({ theme }: StyledListItemIconProps) => theme['text-rgb']},
                0.1
            );
            box-shadow: 0 0 0 1px
                rgba(${({ theme }: StyledListItemIconProps) => theme['009-rgb']}, 0.08) inset;
        `}
`;
