/* eslint-disable no-console */
import React, { useCallback, useState } from 'react';

import { Input } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Icon from '../../src/react-chayns-icon/component/Icon';
import DateInfo from '../../src/react-chayns-dateinfo/component/DateInfo';

const InputExample = () => {
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');

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
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Handynummer oder eMail"
                    onBlur={onBlur}
                    onChange={setUserName}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    value={userName}
                    right={(
                        <Button
                            disabled={!userName}
                            style={{
                                backgroundColor: '#8e8e93',
                                padding: '7px 15px',
                            }}
                        >
                            Weiter
                        </Button>
                    )}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Geburtstag"
                    onBlur={onBlur}
                    onChange={setDate}
                    onKeyUp={onKeyUp}
                    onEnter={onEnter}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    value={date}
                    right={(
                        <Icon
                            icon="fa fa-calendar-day"
                            style={{
                                marginLeft: '8px',
                                width: '30px',
                                fontSize: '1.5em',
                            }}
                            onClick={() => {
                                chayns.dialog.advancedDate({
                                    monthSelect: true,
                                    yearSelect: true,
                                    preSelect: new Date(date).getTime() / 1000,
                                })
                                    .then((value) => {
                                        if (value.buttonType === 1) {
                                            setDate(DateInfo.getRelativeDateString(value.selectedDates[0].timestamp * 1000, {
                                                showTime: false,
                                                showDate: true,
                                                language: chayns.env.language,
                                            }));
                                        }
                                    });
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default InputExample;
