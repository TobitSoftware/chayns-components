import styled from 'styled-components';

export const StyledCodeScanner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

type StyledCodeScannerPreviewProps = {
    $isVisible: boolean;
};

export const StyledCodeScannerTextWrapper = styled.div`
    width: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 3 / 2;
    flex-direction: column;
    text-align: center;
    padding: 20px;
`;

export const StyledCodeScannerPreview = styled.video<StyledCodeScannerPreviewProps>`
    width: 100%;
    height: 100%;

    ${({ $isVisible }) =>
        !$isVisible &&
        `
        display: none;
    `}
`;

export const StyledCodeScannerIconOverlay = styled.div`
    opacity: 0.7;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
