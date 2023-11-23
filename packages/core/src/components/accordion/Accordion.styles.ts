import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { AccordionProps } from './Accordion';

type StyledMotionAccordionProps = WithTheme<{
    isOpen: boolean;
    isParentWrapped: boolean;
}> &
    Pick<AccordionProps, 'isWrapped' | 'shouldForceBackground' | 'shouldHideBackground'>;

export const StyledAccordion = styled.div<StyledMotionAccordionProps>`
    ${({
        isOpen,
        isWrapped,
        shouldForceBackground,
        shouldHideBackground,
        theme,
    }: StyledMotionAccordionProps) =>
        (isOpen || shouldForceBackground) &&
        !isWrapped &&
        !shouldHideBackground &&
        css`
            background-color: ${theme['100']}; // ToDo: Add opacity here
            border-radius: 3px; // ToDo: Add correct border-radius here
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15); // ToDo: Add correct box-shadow here
        `}

    border-bottom: 1px solid transparent;
    margin-bottom: ${({ isOpen, isWrapped }) => (isOpen && !isWrapped ? '30px' : '0px')};
    transition:
        background-color 0.3s ease,
        border-bottom-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease,
        margin-bottom 0.3s ease;

    ${({ isOpen, isWrapped, shouldForceBackground, theme }: StyledMotionAccordionProps) => {
        if (shouldForceBackground) return undefined;

        if (isWrapped) {
            return css`
                :not(:last-child) {
                    border-bottom-color: ${theme.headline};
                }
            `;
        }

        if (!isOpen) {
            return css`
                border-bottom-color: ${theme.headline};
            `;
        }

        return undefined;
    }}

    ${({ isParentWrapped }) =>
        isParentWrapped &&
        css`
            padding-left: 17px;
        `}

    ${({ isWrapped }) =>
        !isWrapped &&
        css`
            margin-top: 10px;
        `}

    ${({ isWrapped, shouldHideBackground, theme }) =>
        !isWrapped &&
        !shouldHideBackground &&
        css`
            &:hover {
                background-color: ${theme['100']}; // ToDo: Add opacity here
            }
        `}
`;
