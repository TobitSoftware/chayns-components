import { ChaynsParagraphFormat, useStyleSettings } from 'chayns-api';
import { useEffect, useState } from 'react';
import { getParagraphFormat } from '../../../api/theme/get';

export const useParagraphFormat = (siteId?: string, paragraphFormat?: ChaynsParagraphFormat[]) => {
    const styleSettings = useStyleSettings();
    const [value, setValue] = useState<ChaynsParagraphFormat[]>([]);
    const shouldLoad = !paragraphFormat && !styleSettings?.paragraphFormats;

    useEffect(() => {
        if (shouldLoad) {
            void getParagraphFormat(siteId).then((result) => {
                setValue(result ?? []);
            });
        }
    }, [shouldLoad, siteId]);

    return paragraphFormat ?? styleSettings?.paragraphFormats ?? value;
};
