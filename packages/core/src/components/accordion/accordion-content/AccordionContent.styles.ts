import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledAccordionContentProps = WithTheme<{
    $maxHeight?: number;
    $shouldPreventBottomSpace: boolean;
}>;

export const StyledAccordionContent = styled.div<StyledAccordionContentProps>`
    color: ${({ theme }: StyledAccordionContentProps) => theme.text};
    padding: 0 9px 18px 26px;

    ${({ $shouldPreventBottomSpace }) =>
        $shouldPreventBottomSpace &&
        css`
            padding-bottom: 0;
        `}

    ${({ $maxHeight }) =>
        typeof $maxHeight === 'number' &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: scroll;
        `}
`;
