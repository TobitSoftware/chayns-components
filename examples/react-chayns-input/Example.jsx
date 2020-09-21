/* eslint-disable no-console */
import React, { useCallback } from 'react';

import { Input } from '../../src/index';

const InputExample = () => {
    const onBlur = useCallback((value, valid) => {
        console.log('onBlur', value, valid);
    }, []);
    const onChange = useCallback((value, valid) => {
        console.log('onChange', value, valid);
    }, []);
    const onEnter = useCallback((value, valid) => {
        console.log('onEnter', value, valid);
    }, []);
    const onKeyUp = useCallback((value, valid) => {
        console.log('onKeyUp', value, valid);
    }, []);
    const qrScanner = useCallback((value) => {
        console.log(value);
        chayns.invokeCall({
            action: 255,
            value: {
                cancel: false,
            },
        });
    }, []);

    return (
        <div>
            <Input
                stopPropagation
                defaultValue="Input"
                placeholder="input"
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                style={{
                    marginBottom: '20px',
                }}
            />
            <Input
                stopPropagation
                placeholder="required"
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                required
                style={{
                    marginBottom: '20px',
                }}
            />
            <Input
                placeholder="password"
                type="password"
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                style={{
                    marginBottom: '20px',
                }}
            />
            <Input
                placeholder="invalid input"
                invalid
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                style={{
                    marginBottom: '20px',
                }}
            />
            <Input
                placeholder='type "eee"'
                regExp={new RegExp('.*e{3}.*')}
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                style={{
                    marginBottom: '20px',
                }}
            />
            <Input
                disabled
                placeholder='type "eee"'
                regExp={new RegExp('.*e{3}.*')}
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onEnter={onEnter}
                style={{
                    marginBottom: '20px',
                }}
            />
            <div style={{ marginBottom: '20px' }}>
                <Input
                    defaultValue="Dynamic Input"
                    placeholder="Dynamic Input Placeholder"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Icon"
                    icon="ts-tobit2016"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder='type "eee"'
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="fa fa-coffee"
                    noDeleteIcon
                    onIconClick={console.log}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="required"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    onIconClick={console.log}
                    dynamic
                    required
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    required
                    placeholder="regexp & required"
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="fa fa-coffee"
                    noDeleteIcon
                    onIconClick={console.log}
                    dynamic
                    clearIcon
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    disabled
                    required
                    placeholder="disabled input"
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="ts-tobit"
                    noDeleteIcon
                    onIconClick={console.log}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Finden"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="ts-calling-code"
                    iconLeft="fal fa-search"
                    onIconClick={qrScanner}
                    design={Input.BORDER_DESIGN}
                    clearIcon
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Finden (disabled)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="ts-calling-code"
                    iconLeft="fal fa-search"
                    onIconClick={qrScanner}
                    design={Input.BORDER_DESIGN}
                    disabled
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Finden (invalid)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="ts-calling-code"
                    iconLeft="fal fa-search"
                    onIconClick={qrScanner}
                    design={Input.BORDER_DESIGN}
                    invalid
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Finden (dynamic)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    icon="ts-calling-code"
                    iconLeft="fal fa-search"
                    onIconClick={qrScanner}
                    design={Input.BORDER_DESIGN}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Name"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Name (disabled)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    disabled
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Name (invalid)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    invalid
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Postleitzahl (Type=number, Regex)"
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    defaultValue={48683}
                    regExp={new RegExp('^[0-9]{5}$')}
                    type="number"
                />
            </div>
        </div>
    );
};

export default InputExample;
