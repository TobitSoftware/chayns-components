import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledGroupNameProps = WithTheme<{ $groupName?: string }>;

export const StyledGroupName = styled.span<StyledGroupNameProps>`
    background: ${({ theme }: StyledGroupNameProps) => theme['102']};
    padding: 4px 10px;
    ${({ $groupName }) =>
        !$groupName &&
        css`
            border: 1px ${({ theme }: StyledGroupNameProps) => theme['102']} solid;
            padding: 0;
        `}
    cursor: default;
`;
