import styled from 'styled-components';

export const StyledSidebarGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

interface StyledSidebarDropZoneProps {
    $depth?: number;
    $isActive: boolean;
    $isDragging: boolean;
    $isInside?: boolean;
}

export const StyledSidebarDropZone = styled.div<StyledSidebarDropZoneProps>`
    position: relative;
    width: 100%;
    flex-shrink: 0;
    margin-left: ${({ $depth = 0 }) => $depth * 8}px;
    height: ${({ $isDragging, $isInside }) => ($isDragging ? ($isInside ? 12 : 8) : 0)}px;
    transition: height 0.15s ease;

    &::after {
        content: '';
        position: absolute;
        inset: ${({ $isInside }) => ($isInside ? '1px 0' : '50% 0 auto 0')};
        height: ${({ $isInside }) => ($isInside ? 'auto' : '2px')};
        transform: ${({ $isInside }) => ($isInside ? 'none' : 'translateY(-50%)')};
        border-radius: 999px;
        background-color: ${({ $isActive }) =>
            $isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
        box-shadow: ${({ $isActive }) =>
            $isActive ? '0 0 0 1px rgba(255, 255, 255, 0.25)' : 'none'};
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
        transition: opacity 0.15s ease;
    }
`;
