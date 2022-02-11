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
            <Button onClick={handleAutogrow}>
                Toggle Autogrow (current:
                {` ${autogrow}`})
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
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={(data) => {
                    console.log(data);
                }}
                defaultValue="Test"
                design={TextArea.BORDER_DESIGN}
                autogrow
            />
            <h2>With scrollbar</h2>
            <TextArea
                onChange={console.log}
                style={{ maxHeight: '100px', overflowY: 'scroll' }}
                placeholder="autogrow, className: scrollbar, max-height: 100px; overflow-y: scroll;"
                className="scrollbar"
                autogrow
            />
            <TextArea
                onChange={console.log}
                style={{ height: '100px', overflowY: 'scroll' }}
                placeholder="className: scrollbar, height: 100px; overflow-y: scroll;"
                className="scrollbar"
            />
            <TextArea
                onChange={console.log}
                style={{ maxHeight: '100px', overflowY: 'scroll' }}
                placeholder="autogrow, className: scrollbar, max-height: 100px; overflow-y: scroll;"
                className="scrollbar"
                autogrow
                design={TextArea.BORDER_DESIGN}
            />
            <TextArea
                onChange={console.log}
                style={{
                    height: '100px',
                    overflowY: 'scroll',
                    marginTop: '10px',
                }}
                placeholder="className: scrollbar, height: 100px; overflow-y: scroll;"
                className="scrollbar"
                design={TextArea.BORDER_DESIGN}
            />
        </div>
    );
};

export default TextAreaExample;
