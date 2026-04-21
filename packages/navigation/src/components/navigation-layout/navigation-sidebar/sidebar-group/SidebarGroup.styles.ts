import styled from 'styled-components';

export const StyledSidebarGroup = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

interface StyledSidebarDropZoneProps {
    $depth?: number;
    $isActive: boolean;
    $isDragging: boolean;
    $placement?: 'before' | 'after' | 'inside';
}

export const StyledSidebarDropZone = styled.div<StyledSidebarDropZoneProps>`
    position: absolute;
    left: ${({ $depth = 0 }) => $depth * 8}px;
    right: 0;
    height: 24px;
    z-index: 1;
    pointer-events: ${({ $isDragging }) => ($isDragging ? 'auto' : 'none')};

    ${({ $placement = 'before' }) => {
        if ($placement === 'after') {
            return `
                top: 100%;
                transform: translateY(-50%);
            `;
        }

        if ($placement === 'inside') {
            return `
                top: 42px;
                transform: translateY(-50%);
            `;
        }

        return `
            top: 0;
            transform: translateY(-50%);
        `;
    }}

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
        border-radius: 999px;
        background-color: ${({ $isActive }) =>
            $isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
        box-shadow: ${({ $isActive }) =>
            $isActive ? '0 0 0 1px rgba(255, 255, 255, 0.25)' : 'none'};
        opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
        transition: opacity 0.15s ease;
    }
`;
