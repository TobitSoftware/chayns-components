import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledColorPickerContent = styled.div`
    max-width: 320px;
`;

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
    height: 50px;
`;

type StyledColorPickerColorPreviewProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPickerColorPreview = styled.div<StyledColorPickerColorPreviewProps>`
    background-color: ${({ color }) => color};
    height: 40px;
    width: 40px;
`;

export const StyledColorPickerContentPresentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5px 20px 10px 20px;
    gap: 5px;
`;
