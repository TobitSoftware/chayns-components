import type { ColorMode } from 'chayns-api';
import { useEffect, useState } from 'react';

export const useColorMode = (): ColorMode => {
    const [colorMode, setColorMode] = useState<ColorMode>(chayns.env.site.colorMode);

    useEffect(() => {
        const listener = () => {
            setColorMode(chayns.env.site.colorMode);
        };

        void chayns.addDesignSettingsChangeListener(listener);

        return () => {
            void chayns.removeDesignSettingsChangeListener(listener);
        };
    }, []);

    return colorMode;
};
