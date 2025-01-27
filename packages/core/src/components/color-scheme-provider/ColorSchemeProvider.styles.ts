import { getAvailableColorList } from '@chayns/colors';
import { styled } from 'styled-components';

export const StyledColorSchemeProvider = styled.div`
    color: var(--chayns-color--text);
    ${(props) =>
        getAvailableColorList().map((colorName: string) => {
            const colorNameRgb = `${colorName}-rgb`;
            return [
                `--chayns-color--${colorName}: ${props.theme[colorName]};`,
                `--chayns-color-rgb--${colorName}: ${props.theme[colorNameRgb]};`,
            ];
        })}
`;
