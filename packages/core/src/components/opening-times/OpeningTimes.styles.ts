import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSliderButtonProps = WithTheme<{ isDisabled?: boolean }>;

export const StyledOpeningTimes = styled.div<StyledSliderButtonProps>`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const StyledOpeningTimesWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;
