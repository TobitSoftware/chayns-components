import styled from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

export const StyledListItemSubtitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
`;

type StyledListItemHeadSubtitleTextProps = WithTheme<{ $isOpen: boolean }>;

export const StyledListItemHeadSubtitleText = styled.span<StyledListItemHeadSubtitleTextProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

    flex: 1 1 auto;
    font-size: 85%;
    min-width: 0;
    opacity: 0.75;
`;

export const StyledListItemBottomRightElement = styled.div`
    display: flex;
    flex: 0 0 auto;
    font-size: 85%;
    margin-left: auto;
    height: 50%;
    align-items: center;
    line-height: normal;
`;
