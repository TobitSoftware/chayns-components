import styled from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledFilter = styled.div``;

export const StyledFilterHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    position: relative;
`;

type StyledFilterHeadlineProps = WithTheme<{ isSearchActive: boolean }>;

export const StyledFilterHeadline = styled.h1<StyledFilterHeadlineProps>`
    margin: 0;

    opacity: ${({ isSearchActive }) => (isSearchActive ? 0 : 1)};

    transition: opacity 0.3s;
`;

export const StyledFilterSearch = styled.div`
    position: absolute;
    width: 100%;
`;

type StyledFilterIconProps = WithTheme<unknown>;

export const StyledFilterIcon = styled.div<StyledFilterIconProps>`
    cursor: pointer;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${({ theme }) => theme['100']};
    }
`;
