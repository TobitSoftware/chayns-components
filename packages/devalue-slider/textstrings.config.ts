import { defineTextStringsConfig } from '@chayns/textstrings';

export default defineTextStringsConfig({
    libraries: [
        {
            libraryName: 'chayns-components-v5-devalue-slider',
            prefix: 'txt_chayns_components_v5_devalue_slider',
        },
    ],
    singleFile: true,
    folderPath: './src/constants/textStrings',
    format: 'ts',
});
