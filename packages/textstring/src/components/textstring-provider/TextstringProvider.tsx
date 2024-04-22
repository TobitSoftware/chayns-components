import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import type { TextstringValue } from '../../types/textstring';
import { loadLibrary } from '../../utils/textstring';

export const TextstringContext = createContext<TextstringValue>({});

export type TextstringProviderProps = {
    /**
     * The element that should use the library.
     */
    children?: ReactNode;
    /**
     * The language that should be used.
     */
    language: string;
    /**
     * The name of the library.
     */
    libraryName: string;
};

const TextstringProvider: FC<TextstringProviderProps> = ({ children, libraryName, language }) => {
    const [textstrings, setTextstrings] = useState<TextstringValue>({});

    useEffect(() => {
        const loadData = async () => {
            const textstringResult = await loadLibrary({ libraryName, language });

            if (textstringResult) {
                const prevTextstrings = window.Textstrings;

                window.Textstrings = {
                    ...prevTextstrings,
                    [libraryName]: textstringResult,
                };

                setTextstrings(textstringResult);
            }
        };

        void loadData();
    }, [language, libraryName]);

    return <TextstringContext.Provider value={textstrings}>{children}</TextstringContext.Provider>;
};

TextstringProvider.displayName = 'TextstringProvider';

export default TextstringProvider;
