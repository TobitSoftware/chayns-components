import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

export const StyledListItemTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
`;

export const StyledListItemTitleLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
`;

export const StyledListItemHeadTitleElement = styled.div`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    margin-left: 8px;
`;

type StyledListItemHeadTitleTextProps = WithTheme<{
    $shouldShowMultilineTitle: boolean;
    $isEllipsis?: boolean;
}>;

export const StyledListItemHeadTitleText = styled.span<StyledListItemHeadTitleTextProps>`
    font-weight: ${({ $isEllipsis }) => ($isEllipsis ? 'normal' : 'bold')};
    white-space: ${({ $isEllipsis }) => ($isEllipsis ? 'nowrap' : 'normal')};
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 auto;

    ${({ $shouldShowMultilineTitle, $isEllipsis }) =>
        $shouldShowMultilineTitle &&
        $isEllipsis &&
        css`
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            white-space: normal;
        `}
`;

export const StyledListItemTopRightElement = styled.div`
    display: flex;
    flex: 0 0 auto;
    font-size: 85%;
    margin-left: auto;
    height: 50%;
    align-items: center;
    line-height: normal;
`;
