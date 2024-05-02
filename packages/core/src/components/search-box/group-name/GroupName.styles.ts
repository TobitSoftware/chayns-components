import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledGroupNameProps = WithTheme<{ $groupName?: string }>;

export const StyledGroupName = styled.span<StyledGroupNameProps>`
    background: ${({ theme }: StyledGroupNameProps) => theme['103']};
    color: ${({ theme }: StyledGroupNameProps) => theme.text};

    padding: 4px 10px;
    ${({ $groupName }) =>
        !$groupName &&
        css`
            border: 1px ${({ theme }: StyledGroupNameProps) => theme['103']} solid;
            padding: 0;
        `}
    cursor: default;
`;
