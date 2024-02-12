import { useSite, type ColorMode } from 'chayns-api';
import { useEffect, useState } from 'react';

export const useColorMode = (): ColorMode => {
    const [colorMode, setColorMode] = useState<ColorMode>(0);

    const site = useSite();

    useEffect(() => {
        if (site.colorMode) {
            setColorMode(site.colorMode);
        }
    }, [site.colorMode]);

    return colorMode;
};
