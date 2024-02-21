import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledCategoryProps = WithTheme<{ $color: CSSProperties['color'] }>;

export const StyledCategory = styled.div<StyledCategoryProps>`
    border-radius: 50%;
    width: 24%;
    aspect-ratio: 1;
    background-color: ${({ $color }) => $color};
    border: 1px solid white;
`;
