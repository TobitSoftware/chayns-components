import { ChaynsDesignSettings, useStyleSettings } from 'chayns-api';
import { useEffect, useState } from 'react';
import { getDesignSettings } from '../../../api/theme/get';
import { ThemeOptions } from './useChaynsTheme';

interface UseDesignSettingsOptions {
    color?: ThemeOptions['color'];
    colorMode?: ThemeOptions['colorMode'];
    designSettings?: ChaynsDesignSettings;
    siteId?: string;
}

export const useDesignSettings = ({
    color,
    colorMode,
    designSettings,
    siteId,
}: UseDesignSettingsOptions) => {
    const [value, setValue] = useState<ChaynsDesignSettings | undefined>(undefined);

    const styleSettings = useStyleSettings();

    const shouldLoad = !designSettings && !styleSettings?.designSettings;

    useEffect(() => {
        if (shouldLoad) {
            void getDesignSettings(siteId).then((result) => {
                setValue(result);
            });
        }
    }, [shouldLoad, siteId]);

    return {
        ...(designSettings ?? styleSettings?.designSettings ?? value),
        color,
        colorMode,
    } as ChaynsDesignSettings | undefined;
};
