import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledListItemRightElements = styled.div`
    display: flex;
    align-items: start;
    gap: 6px;
    margin-left: 8px;
`;

export const StyledListItemRightElementsLeft = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const StyledListItemRightElementsLeftPseudo = styled.div`
    display: flex;
    flex: 0 0 auto;
    font-size: 85%;
    color: transparent;
    height: 50%;
    line-height: normal;
    user-select: none;
`;

type StyledListItemRightElementsLeftTopProps = {
    $alignment?: CSSProperties['justifyContent'];
};

export const StyledListItemRightElementsLeftTop = styled.div<StyledListItemRightElementsLeftTopProps>`
    display: flex;
    flex: 0 0 auto;
    font-size: 85%;
    height: 50%;
    justify-content: ${({ $alignment }) => $alignment ?? 'end'};
    align-items: center;
    line-height: normal;
`;

type StyledListItemRightElementsLeftBottomProps = {
    $alignment?: CSSProperties['justifyContent'];
};

export const StyledListItemRightElementsLeftBottom = styled.div<StyledListItemRightElementsLeftBottomProps>`
    display: flex;
    flex: 0 0 auto;
    font-size: 85%;
    height: 50%;
    justify-content: ${({ $alignment }) => $alignment ?? 'end'};
    align-items: center;
    line-height: normal;
`;

export const StyledListItemRightElementsRight = styled.div`
    margin: auto 0;
    display: flex;
    flex: 0 0 auto;
    line-height: normal;
`;
