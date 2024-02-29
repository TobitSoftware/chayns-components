import React, { FC, useMemo, useState } from 'react';
import { StyledHintText } from './HintText.styles';

export type HintTextProps = {
    text: string;
};

const HintText: FC<HintTextProps> = ({ text }) => {
    const [newHintText, setNewHintText] = useState<string>();

    return useMemo(() => <StyledHintText>{text}</StyledHintText>, [text]);
};

HintText.displayName = 'HintText';

export default HintText;
