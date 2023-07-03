import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledColorPickerContent = styled.div``;

export const StyledColorPickerContentSliderSelect = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px 10px 20px;
`;

export const StyledColorPickerContentSliders = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

type StyledColorPickerColorPreviewProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPickerColorPreview = styled.div<StyledColorPickerColorPreviewProps>`
    background-color: ${({ color }) => color};
    height: 40px;
    width: 40px;
`;
