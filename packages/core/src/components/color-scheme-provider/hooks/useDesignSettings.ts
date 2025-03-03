import { ChaynsDesignSettings, useStyleSettings } from 'chayns-api';
import { useEffect, useState } from 'react';
import { getDesignSettings } from '../../../api/theme/get';

export const useDesignSettings = (siteId?: string, designSettings?: ChaynsDesignSettings) => {
    const styleSettings = useStyleSettings();
    const [value, setValue] = useState<ChaynsDesignSettings | undefined>(undefined);
    const shouldLoad = !designSettings && !styleSettings?.designSettings;

    useEffect(() => {
        if (shouldLoad) {
            void getDesignSettings(siteId).then((result) => {
                setValue(result);
            });
        }
    }, [shouldLoad, siteId]);

    return designSettings ?? styleSettings?.designSettings ?? value;
};
