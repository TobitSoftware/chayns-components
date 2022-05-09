import styled from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemIconProps = WithTheme<unknown>;

export const StyledListItemIcon = styled.div`
    align-items: center;
    background-color: rgba(${({ theme }: StyledListItemIconProps) => theme['text-rgb']}, 0.1);
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledListItemIconProps) => theme['009-rgb']}, 0.08)
        inset;
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
`;
