import { getAvailableColorList, getColorFromPalette, hexToRgb255 } from '@chayns/colors';
import { ChaynsDesignSettings, ChaynsParagraphFormat, ColorMode } from 'chayns-api';
import { convertIconStyle, getHeadlineColorSelector } from '../../../utils/font';
import type { Theme } from '../ColorSchemeProvider';
import { useDesignSettings } from './useDesignSettings';
import { useParagraphFormat } from './useParagraphFormat';

export type ThemeOptions = {
    colors?: Theme;
    colorMode: ColorMode;
    iconColor?: string;
    color: string;
    secondaryColor?: string;
    designSettings?: ChaynsDesignSettings & { fontSizePx?: number };
    paragraphFormat?: ChaynsParagraphFormat[];
    siteId?: string;
    theme?: Theme;
    customVariables?: Record<string, string>;
};

const DesignSettingsKeyMap: Partial<Record<keyof ChaynsDesignSettings, string>> = {
    headerBarColor: 'header-bar',
};

const createTheme = ({
    colors,
    colorMode,
    color,
    secondaryColor,
    designSettings,
    paragraphFormat,
    theme,
    iconColor,
    customVariables,
}: Omit<ThemeOptions, 'siteId'>) => {
    if (theme) {
        return theme;
    }

    const result: Theme = {};

    if (customVariables) {
        Object.keys(customVariables).forEach((key) => {
            result[key] = customVariables[key] as string;
        });
    }

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

    if (designSettings) {
        Object.keys(designSettings).forEach((key) => {
            if (key === 'iconStyle') {
                result[key] = convertIconStyle(designSettings.iconStyle);

                return;
            }
            result[DesignSettingsKeyMap[key as keyof ChaynsDesignSettings] || key] = designSettings[
                key as keyof ChaynsDesignSettings
            ] as string;
        });
    }

    if (paragraphFormat) {
        const { themeResult } = getHeadlineColorSelector(paragraphFormat);

        // Update Theme
        Object.keys(themeResult).forEach((key) => {
            result[key] = themeResult[key] as string;
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

    if (iconColor) {
        result.iconColor = iconColor;
    }

    result.fontSize = (designSettings?.fontSizePx || 15) as unknown as string;

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
    iconColor,
    theme,
    customVariables,
}: ThemeOptions) => {
    'use memo';

    const designSettings = useDesignSettings({
        color,
        colorMode,
        designSettings: designSettingsProp,
        siteId,
    });

    const paragraphFormat = useParagraphFormat(siteId, paragraphFormatProp);

    return {
        theme: createTheme({
            colors,
            colorMode,
            color,
            secondaryColor,
            designSettings,
            paragraphFormat,
            theme,
            iconColor,
            customVariables,
        }),
        designSettings,
        paragraphFormat,
    };
};
