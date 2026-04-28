import { defineTextStringsConfig } from '@chayns/textstrings';

export default defineTextStringsConfig({
    libraries: [
        {
            libraryName: 'chayns-components-v5-color-picker',
            prefix: 'txt_chayns_components_v5_color_picker',
        },
    ],
    singleFile: true,
    folderPath: './src/constants/textStrings',
    format: 'ts',
});
