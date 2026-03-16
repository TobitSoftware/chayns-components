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

    const [apiData, setApiData] = useState<ChaynsDesignSettings | undefined>(undefined);

    useEffect(() => {
        const shouldLoad = !designSettings && !styleSettings?.designSettings;

        if (shouldLoad) {
            void getDesignSettings(siteId).then((result) => {
                setApiData(result);
            });
        }
    }, [designSettings, styleSettings?.designSettings, siteId]);

    const designSettingsOverride = designSettings ?? styleSettings?.designSettings;

    const combinedSettings = Object.assign(apiData ?? {}, designSettingsOverride);

    return useMemo(
        () => ({ ...combinedSettings, color, colorMode }) as ChaynsDesignSettings | undefined,
        [color, colorMode, combinedSettings],
    );
};
