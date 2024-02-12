import { useContext } from 'react';
import type { ITextstring, TextstringReplacement } from '../components/textstring/types';
import { TextStringContext } from '../components/textstring-provider/TextStringProvider';

export interface UseTextstringValue {
    textString: ITextstring;
    replacements?: TextstringReplacement;
}

export const useTextstringValue = ({ replacements, textString }: UseTextstringValue) => {
    const textStrings = useContext(TextStringContext);

    const value = textStrings[textString.name] ?? textString.fallback;

    if (!replacements) {
        return value;
    }

    return Object.keys(replacements).reduce(
        (current, key) => current.replace(new RegExp(key, 'g'), <string>replacements[key] || ''),
        value,
    );
};
