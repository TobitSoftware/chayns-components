import React, { useState, useCallback } from 'react';
import { Button, TextArea } from '../../src';

const TextAreaExample = () => {
    const [value, setValue] = useState('');
    const [autogrow, setAutogrow] = useState(false);

    const handleAutogrow = useCallback(() => {
        setAutogrow((v) => !v);
    }, [setAutogrow]);

    return (
        <div>
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={setValue}
                onBlur={console.log}
                value={value}
                autogrow={autogrow}
                required
            />
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={setValue}
                value={value}
                autogrow={autogrow}
            />
            <Button
                onClick={handleAutogrow}
            >
                Toggle Autogrow (current:
                {` ${autogrow}`}
                )
            </Button>
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
