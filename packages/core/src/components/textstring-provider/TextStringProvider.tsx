import React, { createContext, FC, useEffect, useState } from 'react';
import { loadLibrary } from './library';

export type TextStringValue = {
    [key: string]: string;
};

export const TextStringContext = createContext<TextStringValue>({});

export type TextStringProviderProps = {
    /**
     * The language that should be used.
     */
    language: string;
    /**
     * The name of the library.
     */
    libraryName: string;
};

const TextStringProvider: FC<TextStringProviderProps> = ({ children, libraryName, language }) => {
    const [textStrings, setTextStrings] = useState<TextStringValue>({});

    useEffect(() => {
        const loadData = async () => {
            const textStringResult = await loadLibrary({ libraryName, language });

            if (textStringResult) {
                setTextStrings(textStringResult);
            }
        };

        void loadData();
    }, [language, libraryName]);

    return <TextStringContext.Provider value={textStrings}>{children}</TextStringContext.Provider>;
};

TextStringProvider.displayName = 'TextStringProvider';

export default TextStringProvider;
