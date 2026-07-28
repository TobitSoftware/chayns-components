import React, { FC } from 'react';
import { CopyableContent, CopyableContentAppearance } from '@chayns-components/core';

const Component: FC = () => (
    <>
        <CopyableContent content={'# Markdown\n\nSicher kopierbarer **Inhalt**.'} />
        <CopyableContent
            appearance={CopyableContentAppearance.Chat}
            content={'# Chat-Inhalt\n\nDezent hervorgehobener Inhalt in einer Nachricht.'}
        />
        <CopyableContent
            collapsedHeight={180}
            content={Array.from(
                { length: 8 },
                (_, index) =>
                    `### Abschnitt ${index + 1}\n\nDieser längere Inhalt wird zunächst eingeklappt und kann über „Mehr anzeigen“ vollständig geöffnet werden.`,
            ).join('\n\n')}
        />
        <p>
            Die Clipboard API kopiert eine lesbare text/plain-Darstellung und ein sicher mit dem
            Formatter erzeugtes text/html. children ersetzt nur die sichtbare Darstellung.
        </p>
        <p>
            Mit CopyableContentAppearance.Chat verwendet der Block ein dezentes dunkles rgba(0, 0,
            0, 0.12)-Overlay für die Verwendung innerhalb von Nachrichten-Sprechblasen.
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
