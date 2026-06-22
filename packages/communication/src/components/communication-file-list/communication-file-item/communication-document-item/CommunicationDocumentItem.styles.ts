import styled from 'styled-components';

export const StyledDocumentItem = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px;
    box-sizing: border-box;

    border-radius: 8px;
    background: var(--background-color-secondary);
`;

export const StyledDocumentName = styled.span`
    text-align: center;
    word-break: break-word;
`;
