import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

export type CodeHighlighterProps = {};

const CodeHighlighter: FC<CodeHighlighterProps> = ({}) => {
    const [currentChildrenIndex, setCurrentChildrenIndex] = useState(0);

    return useMemo(() => <p>hallo</p>, []);
};

CodeHighlighter.displayName = 'CodeHighlighter';

export default CodeHighlighter;
