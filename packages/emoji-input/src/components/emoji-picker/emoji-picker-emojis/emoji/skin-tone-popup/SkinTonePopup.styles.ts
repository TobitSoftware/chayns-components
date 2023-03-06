import type { WithTheme } from '@chayns-components/core';
import { m } from 'framer-motion';
import styled, { css } from 'styled-components';
import { AnchorAlignment } from '../../../../../constants/alignment';
import type { SkinTonePopupProps } from './SkinTonePopup';

export const StyledMotionSkinTonePopup = styled(m.div)`
    z-index: 1;
`;

export const skinTonePopupContentSize = {
    height: 48,
    width: 200,
};

type StyledSkinTonePopupContentProps = WithTheme<
    Pick<SkinTonePopupProps, 'anchorAlignment' | 'anchorOffset'>
>;

export const StyledSkinTonePopupContent = styled.div<StyledSkinTonePopupContentProps>`
    align-items: stretch;
    background-color: ${({ theme }: StyledSkinTonePopupContentProps) => theme['001']};
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-shadow: 1px 3px 8px rgb(0 0 0 / 30%);
    display: flex;
    height: ${skinTonePopupContentSize.height}px;
    justify-content: stretch;
    position: absolute;
    width: ${skinTonePopupContentSize.width}px;
    z-index: 2;

    ::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom-right-radius: 3px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;

        ${({ anchorAlignment, anchorOffset }) => {
            switch (anchorAlignment) {
                case AnchorAlignment.Bottom:
                    return css`
                        bottom: -7px;
                        left: calc(50% - 7px + ${anchorOffset}px);
                        transform: rotate(45deg);
                    `;
                case AnchorAlignment.Top:
                    return css`
                        top: -7px;
                        left: calc(50% - 7px + ${anchorOffset}px);
                        transform: rotate(225deg);
                    `;
                default:
                    return undefined;
            }
        }}
    }

    ::before {
        background-color: inherit;
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
`;

export const StyledSkinTonePopupContentEmoji = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    font-size: 24px;
    justify-content: center;
`;

export const StyledSkinTonePopupOverlay = styled.div`
    cursor: default;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
`;
