import { defineTextStringsConfig } from '@chayns/textstrings';

export default defineTextStringsConfig({
    libraries: [
        {
            libraryName: 'chayns-components-v5-ranking',
            prefix: 'txt_chayns_components_v5_ranking',
        },
    ],
    singleFile: true,
    folderPath: './src/constants/textStrings',
    format: 'ts',
});
