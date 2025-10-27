import React, { FC } from 'react';
import { CodeHighlighter } from '@chayns-components/code-highlighter';

const Component: FC = () => {
    const code = `console.log("TEST")`;

    return <CodeHighlighter code={code} language="typescript" />;
};

Component.displayName = 'Component';

export default Component;
