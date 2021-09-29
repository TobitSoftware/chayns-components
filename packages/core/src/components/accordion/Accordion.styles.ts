import styled, { css } from 'styled-components';

type StyledMotionAccordionProps = {
    isOpen: boolean;
    isWrapped: boolean;
};

export const StyledAccordion = styled.div<StyledMotionAccordionProps>`
    ${({ isOpen, isWrapped }) =>
        isOpen &&
        !isWrapped &&
        css`
            background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
            border-radius: 3px; // ToDo: Add correct border-radius here
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15); // ToDo: Add correct box-shadow here
        `}

    margin-bottom: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '30px' : '0px')};
    transition: background-color 0.2s ease, border-radius 0.2s ease, box-shadow 0.2s ease,
        margin-bottom 0.2s ease;

    ${({ isWrapped }) =>
        !isWrapped &&
        css`
            margin-top: 10px;

            &:hover {
                background-color: rgba(${({ theme }) => theme['100-rgb']}, 0.85);
            }
        `}
`;
