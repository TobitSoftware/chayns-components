import React, { FC } from 'react';
import { CodeHighlighter } from '@chayns-components/code-highlighter';

const Component: FC = () => {
    const code = `console.log("TEST")`;

    return (
        <>
            <CodeHighlighter code={code} language="typescript" />
            <p>
                Die sticky Aktionsgruppe benötigt den vorgesehenen Scrollcontainer als Containing
                Block. Zwischen Component und diesem Container darf kein zusätzlicher Parent
                overflow:hidden, auto, scroll oder clip verwenden.
            </p>
        </>
    );
};

Component.displayName = 'Component';

export default Component;
