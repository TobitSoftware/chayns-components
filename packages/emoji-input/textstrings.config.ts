import { defineTextStringsConfig } from '@chayns/textstrings';

export default defineTextStringsConfig({
    libraries: [
        {
            libraryName: 'chayns-components-v5-emoji-input',
            prefix: 'txt_chayns_components_v5_emoji_input',
        },
    ],
    singleFile: true,
    folderPath: './src/constants/textStrings',
    format: 'ts',
});
