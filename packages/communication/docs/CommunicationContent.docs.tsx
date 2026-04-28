import React from 'react';
import { CommunicationContent } from '@chayns-components/communication';

const Component = () => {
    return (
        <div>
            <CommunicationContent
                breakPoint={720}
                content={
                    <div>
                        <span>Betreff: Projektupdate Mai</span>
                        <span>Von: Michael Gesenhues</span>
                        <span>
                            Diese Ansicht wird abhängig von der Breite als Sidepanel oder Overlay
                            angezeigt.
                        </span>
                    </div>
                }
                overlayContentConfig={{ minHeight: 64, topOffset: 24 }}
                shouldShowContent
                sideContentConfig={{ initialWidth: 360, maxWidth: 520, minWidth: 280 }}
            >
                <div>
                    <span>Projektupdate Mai</span>
                    <span>Rückfrage zum Angebot</span>
                    <span>Monatsreport</span>
                </div>
            </CommunicationContent>
        </div>
    );
};

Component.displayName = 'Component';

export default Component;
