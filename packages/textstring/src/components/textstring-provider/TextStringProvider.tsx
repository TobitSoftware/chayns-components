import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { loadLibrary } from '../../utils/textstring';

export type TextStringValue = {
    [key: string]: string;
};

export const TextStringContext = createContext<TextStringValue>({});

export type TextStringProviderProps = {
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

export const PassTextstringProvider: { value?: TextStringValue } = {};

const TextStringProvider: FC<TextStringProviderProps> = ({ children, libraryName, language }) => {
    const [textStrings, setTextStrings] = useState<TextStringValue>({});

    useEffect(() => {
        const loadData = async () => {
            const textStringResult = await loadLibrary({ libraryName, language });

            if (textStringResult) {
                setTextStrings(textStringResult);
                PassTextstringProvider.value = textStringResult;
            }
        };

        void loadData();
    }, [language, libraryName]);

    return <TextStringContext.Provider value={textStrings}>{children}</TextStringContext.Provider>;
};

TextStringProvider.displayName = 'TextStringProvider';

export default TextStringProvider;
