import styled from 'styled-components';

type StyledFinderBodyProps = { $shouldRenderInline?: boolean };

export const StyledFinderBody = styled.div<StyledFinderBodyProps>`
    display: flex;
    flex-direction: column;
    height: ${({ $shouldRenderInline }) => ($shouldRenderInline ? 'auto' : '300px')};
`;

export const StyledFinderBodyContent = styled.div`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;
`;
