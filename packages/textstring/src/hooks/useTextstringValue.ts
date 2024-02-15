import { useContext } from 'react';
import {
    PassTextstringProvider,
    TextStringContext,
} from '../components/textstring-provider/TextStringProvider';
import type { ITextstring, TextstringReplacement } from '../components/textstring/types';

export interface UseTextstringValue {
    textString: ITextstring;
    replacements?: TextstringReplacement;
}

export const useTextstringValue = ({ replacements, textString }: UseTextstringValue) => {
    const textStrings = useContext(TextStringContext);

    const test = PassTextstringProvider.value;

    console.log({ test, textStrings });

    const value = textStrings[textString.name] ?? textString.fallback;

    if (!replacements) {
        return value;
    }

    return Object.keys(replacements).reduce(
        (current, key) => current.replace(new RegExp(key, 'g'), <string>replacements[key] || ''),
        value,
    );
};
