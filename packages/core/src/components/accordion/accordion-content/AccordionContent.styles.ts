import styled from 'styled-components';

type StyledAccordionContentProps = {
    isWrapped: boolean;
};

export const StyledAccordionContent = styled.div<StyledAccordionContentProps>`
    padding: ${({ isWrapped }) => (isWrapped ? '0 9px 18px 26px' : '0 9px 9px 10px')};
`;
