import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { CommunicationInputTextType } from '../CommunicationInput.types';

type StyledInputElementProps = WithTheme<{ $textType: CommunicationInputTextType }>;

export const StyledInputElement = styled.div<StyledInputElementProps>`
    width: 100%;

    ${({ $textType }) => {
        if ($textType === CommunicationInputTextType.MARKDOWN) {
            return css`
                div:first-child {
                    background-color: transparent;
                    border: none;
                    min-height: 36px;
                }
            `;
        }

        return css`
            div:first-child {
                min-height: 36px;

                div:first-child {
                    background-color: transparent;
                    border: none;
                }
            }
        `;
    }}
`;
