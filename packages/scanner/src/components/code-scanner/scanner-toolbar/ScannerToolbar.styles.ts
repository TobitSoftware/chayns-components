import styled, { css } from 'styled-components';

export const StyledScannerToolbar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 85px;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    color: white;
`;

type ScannerToolbarButtonProps = {
    $isAvailable?: boolean;
    $isActive?: boolean;
};

export const StyledScannerToolbarButton = styled.div<ScannerToolbarButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 45px;
    cursor: pointer;
    border-radius: 50%;

    ${({ $isAvailable = false }) =>
        !$isAvailable &&
        css`
            cursor: default;
            opacity: 0;
            pointer-events: none;
        `};

    ${({ $isActive = false }) =>
        $isActive &&
        css`
            background-color: rgba(255, 255, 255, 0.2);
        `};

    text-shadow: 0 0 10px black;

    i {
        color: white;
    }
`;
