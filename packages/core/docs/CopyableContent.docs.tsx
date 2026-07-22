import React, { FC } from 'react';
import { CopyableContent, CopyableContentAppearance } from '@chayns-components/core';

const Component: FC = () => (
    <>
        <CopyableContent content={'# Markdown\n\nSicher kopierbarer **Inhalt**.'} />
        <CopyableContent
            appearance={CopyableContentAppearance.Chat}
            content={'# Chat-Inhalt\n\nDezent hervorgehobener Inhalt in einer Nachricht.'}
        />
        <p>
            Der ursprüngliche content wird unverändert als text/plain und text/markdown kopiert.
            text/html wird sicher mit dem Formatter erzeugt. children ersetzt nur die sichtbare
            Darstellung.
        </p>
        <p>
            Mit CopyableContentAppearance.Chat verwendet der Block ein dezentes, vom Farbschema
            abhängiges Overlay für die Verwendung innerhalb von Nachrichten-Sprechblasen.
        </p>
        <p>
            Die sticky Aktionsgruppe benötigt den vorgesehenen Scrollcontainer als Containing Block.
            Zwischen Component und diesem Container darf kein zusätzlicher Parent overflow:hidden,
            auto, scroll oder clip verwenden. Der CopyableContent selbst erzeugt keinen eigenen
            Scrollcontainer.
        </p>
    </>
);

Component.displayName = 'Component';

export default Component;
