import { ChaynsDesignSettings, ColorMode, useStyleSettings } from 'chayns-api';
import { useEffect, useMemo, useState } from 'react';
import { getDesignSettings } from '../../../api/theme/get';

interface UseDesignSettingsOptions {
    color?: string;
    colorMode?: ColorMode;
    designSettings?: ChaynsDesignSettings;
    siteId?: string;
}

export const useDesignSettings = ({
    color,
    colorMode,
    designSettings,
    siteId,
}: UseDesignSettingsOptions) => {
    const styleSettings = useStyleSettings();

    const [value, setValue] = useState<ChaynsDesignSettings | undefined>(
        designSettings ?? styleSettings?.designSettings,
    );

    const shouldLoad = !designSettings && !styleSettings?.designSettings;

    useEffect(() => {
        setValue(designSettings ?? styleSettings?.designSettings);
    }, [designSettings, styleSettings?.designSettings]);

    useEffect(() => {
        if (shouldLoad) {
            void getDesignSettings(siteId).then((result) => {
                setValue(result);
            });
        }
    }, [shouldLoad, siteId]);

    return useMemo(
        () => ({ ...value, color, colorMode }) as ChaynsDesignSettings | undefined,
        [color, colorMode, value],
    );
};
