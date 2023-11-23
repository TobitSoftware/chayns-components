import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import type { MentionFinderItemProps } from './MentionFinderItem';

type StyledMentionFinderItemProps = WithTheme<Pick<MentionFinderItemProps, 'isActive'>>;

export const StyledMentionFinderItem = styled.div<StyledMentionFinderItemProps>`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 64px;
    padding: 12px 9px;

    &:not(:last-child) {
        border-bottom: 1px solid
            rgba(${({ theme }: StyledMentionFinderItemProps) => theme['text-rgb']}, 0.15);
    }

    &:nth-child(even) {
        background-color: ${({ theme }: StyledMentionFinderItemProps) => theme['002']};
    }

    ${({ isActive, theme }) =>
        isActive &&
        css`
            background-color: ${theme['102']} !important;
        `}
`;

type StyledMentionFinderItemImageProps = WithTheme<unknown>;

export const StyledMentionFinderItemImage = styled.img`
    background-color: rgba(
        ${({ theme }: StyledMentionFinderItemImageProps) => theme['text-rgb']},
        0.1
    );
    border-radius: 50%;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMentionFinderItemImageProps) => theme['009-rgb']}, 0.08) inset;
    flex: 0 0 auto;
    height: 40px;
    overflow: hidden;
    transition: border-radius 0.3s ease;
    width: 40px;
`;

type StyledMentionFinderItemContentProps = WithTheme<unknown>;

export const StyledMentionFinderItemContent = styled.div`
    color: ${({ theme }: StyledMentionFinderItemContentProps) => theme.text};
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
    line-height: normal;
    margin-left: 10px;
    min-width: 0;
`;

export const StyledMentionFinderItemContentName = styled.div``;

export const StyledMentionFinderItemContentInfo = styled.div`
    font-size: 85%;
    margin-top: 2px;
    opacity: 0.75;
`;
