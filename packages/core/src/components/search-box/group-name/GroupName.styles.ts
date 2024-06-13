import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledGroupNameProps = WithTheme<{ $groupName?: string }>;

export const StyledGroupName = styled.span<StyledGroupNameProps>`
    color: ${({ theme }: StyledGroupNameProps) => theme.text};
    font-weight: bold;

    padding: 4px 10px;
    ${({ $groupName }) =>
        !$groupName &&
        css`
            border: 1px ${({ theme }: StyledGroupNameProps) => theme['103']} solid;
            padding: 0;
        `}
    cursor: default;
`;
