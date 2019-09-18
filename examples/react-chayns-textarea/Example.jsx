import React, { useState } from 'react';
import { TextArea } from '../../src';

const TextAreaExample = () => {
    const [value, setValue] = useState('');

    return (
        <div>
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={setValue}
                value={value}
                autogrow
            />
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={setValue}
                value={value}
                autogrow
            />
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={(data) => {
                    console.log(data);
                }}
                defaultValue="Test"
                autogrow
            />
        </div>
    );
};

export default TextAreaExample;
