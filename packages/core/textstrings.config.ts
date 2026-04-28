import { defineTextStringsConfig } from '@chayns/textstrings';

export default defineTextStringsConfig({
    libraries: [
        {
            libraryName: 'chayns-components-v5-core',
            prefix: 'txt_chayns_components_v5_core',
        },
    ],
    singleFile: true,
    folderPath: './src/constants/textStrings',
    format: 'ts',
});
