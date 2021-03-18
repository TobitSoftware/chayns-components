import React, { useState } from 'react';
import { Input } from '../../src/index';
import InputBox from '../../src/react-chayns-input_box/component/InputBox';

const InputBoxExample = () => {
    const [value, setValue] = useState('');

    return (
        <div>
            <InputBox
                type="password"
                inputComponent={Input}
                value={value}
                onChange={setValue}
                placeholder="input"
                hasOpenCloseIcon
            >
                {`Password: ${value}`}
            </InputBox>
            <div style={{ height: 20 }} />
            <div style={{ height: 300, padding: '20px 0', overflowY: 'auto' }}>
                <div style={{ height: 500 }}>
                    <InputBox
                        type="password"
                        inputComponent={Input}
                        value={value}
                        onChange={setValue}
                        placeholder="input"
                    >
                        {`Password: ${value}`}
                    </InputBox>
                </div>
            </div>
        </div>
    );
};

export default InputBoxExample;
