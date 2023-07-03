import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledAccordionItemProps = WithTheme<{
    isWrapped: boolean;
}>;

export const StyledAccordionItem = styled.div`
    color: ${({ theme }: StyledAccordionItemProps) => theme.text};
    padding: ${({ isWrapped }) => (isWrapped ? '8px 9px 8px 30px' : '8px 9px')};

    :not(:first-child) {
        border-top: 1px solid
            rgba(${({ theme }: StyledAccordionItemProps) => theme['headline-rgb']}, 0.5);
    }
`;
