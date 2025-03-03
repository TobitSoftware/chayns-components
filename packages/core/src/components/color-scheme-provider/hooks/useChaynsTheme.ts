import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { ChaynsDesignSettings, ChaynsParagraphFormat, ColorMode } from 'chayns-api';
import { useEffect, useMemo, useRef, useState } from 'react';
import { convertIconStyle, getFontSize, getHeadlineColorSelector } from '../../../utils/font';
import type { Theme } from '../ColorSchemeProvider';
import { useDesignSettings } from './useDesignSettings';
import { useParagraphFormat } from './useParagraphFormat';

export type ThemeOptions = {
    colors?: Theme;
    colorMode: ColorMode;
    color: string;
    secondaryColor?: string;
    designSettings?: ChaynsDesignSettings;
    paragraphFormat?: ChaynsParagraphFormat[];
    siteId?: string;
    theme?: Theme;
};

const createTheme = ({
    colors,
    colorMode,
    color,
    secondaryColor,
    designSettings,
    paragraphFormat,
    theme,
}: Omit<ThemeOptions, 'siteId'>) => {
    if (theme) {
        return theme;
    }

    const result: Theme = {};

    const availableColors = getAvailableColorList();

    if (!colors) {
        availableColors.forEach((colorName: string) => {
            const hexColor = getColorFromPalette(colorName, {
                color,
                colorMode,
                secondaryColor,
            });

            if (hexColor) {
                const rgbColor = hexToRgb255(hexColor);

                result[colorName] = hexColor;

                if (rgbColor) {
                    result[`${colorName}-rgb`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
                }
            }
        });
    }

    switch (colorMode) {
        case ColorMode.Light:
            result.colorMode = 'light';
            break;
        case ColorMode.Dark:
            result.colorMode = 'dark';
            break;
        default:
            result.colorMode = 'classic';
            break;
    }
    if (designSettings) {
        Object.keys(designSettings).forEach((key) => {
            if (key === 'iconStyle') {
                result[key] = convertIconStyle(designSettings.iconStyle);

                return;
            }
            result[key] = designSettings[key as keyof ChaynsDesignSettings] as string;
        });
    }
    if (paragraphFormat) {
        const { themeResult } = getHeadlineColorSelector(paragraphFormat);

        // Update Theme
        Object.keys(themeResult).forEach((key) => {
            result[key] = themeResult[key] as string;
        });
    }
    result.fontSize = getFontSize();

    return result;
};

export const useChaynsTheme = ({
    colors,
    colorMode,
    color,
    secondaryColor,
    designSettings: designSettingsProp,
    paragraphFormat: paragraphFormatProp,
    siteId,
    theme,
}: ThemeOptions) => {
    const designSettings = useDesignSettings(siteId, designSettingsProp);
    const paragraphFormat = useParagraphFormat(siteId, paragraphFormatProp);
    const isMountedRef = useRef<boolean>(false);

    const [internalTheme, setInternalTheme] = useState<Theme>(() =>
        createTheme({
            colors,
            colorMode,
            color,
            secondaryColor,
            designSettings,
            paragraphFormat,
            theme,
        }),
    );

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }
        setInternalTheme(
            createTheme({
                colors,
                colorMode,
                color,
                secondaryColor,
                designSettings,
                paragraphFormat,
                theme,
            }),
        );
    }, [color, colorMode, colors, designSettings, paragraphFormat, secondaryColor, theme]);

    return useMemo(
        () => ({
            theme: internalTheme,
            designSettings,
            paragraphFormat,
        }),
        [internalTheme, designSettings, paragraphFormat],
    );
};
