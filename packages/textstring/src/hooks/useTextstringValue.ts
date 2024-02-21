import { useContext } from 'react';
import { TextstringContext } from '../components/textstring-provider/TextstringProvider';
import type { ITextstring, TextstringReplacement } from '../components/textstring/types';

export interface UseTextstringValue {
    textstring: ITextstring;
    replacements?: TextstringReplacement;
}

export const useTextstringValue = ({ replacements, textstring }: UseTextstringValue) => {
    const textstrings = useContext(TextstringContext);

    const value = textstrings[textstring.name] ?? textstring.fallback;

    if (!replacements) {
        return value;
    }

    return Object.keys(replacements).reduce(
        (current, key) => current.replace(new RegExp(key, 'g'), <string>replacements[key] || ''),
        value,
    );
};
