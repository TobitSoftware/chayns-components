import React, { FC } from 'react';
import { AdaptiveTranslation, TranslationOptionsProvider } from '@chayns-components/translation';
import { Language, useLanguage } from 'chayns-api';

const Component: FC = () => {
    const language = useLanguage();

    return (
        <TranslationOptionsProvider
            from={language.site as Exclude<Language, Language.Unknown>}
            to={language.active as Exclude<Language, Language.Unknown>}
        >
            <AdaptiveTranslation>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel finibus nunc, a
                cursus magna.
            </AdaptiveTranslation>
        </TranslationOptionsProvider>
    );
};

Component.displayName = 'Component';

export default Component;
