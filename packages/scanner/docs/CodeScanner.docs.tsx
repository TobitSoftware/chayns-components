import React, { FC } from 'react';
import { CodeScanner, ScannerErrorMessages } from '@chayns-components/scanner';

const Component: FC = () => {
    const errorMessages: ScannerErrorMessages = {
        alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
        cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
        noCodeFound: 'Es konnte kein Code gefunden werden.',
        noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
    };

    return <CodeScanner errorMessages={errorMessages} />;
};

Component.displayName = 'Component';

export default Component;
