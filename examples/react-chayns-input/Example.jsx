import React, { PureComponent } from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Input } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class InputExample extends PureComponent {
    onBlur(value, valid) {
        console.log('onBlur', value, valid);
    }

    onChange(value, valid) {
        console.log('onChange', value, valid);
    }

    onEnter(value, valid) {
        console.log('onEnter', value, valid);
    }

    onKeyUp(e) {
        console.log('onKeyUp', e);
    }

    render() {
        return (
            <ExampleContainer
                headline="Input"
                id="react-chayns-input"
            >
                <Input
                    stopPropagation
                    defaultValue="Input"
                    placeholder="input"
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onEnter={this.onEnter}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <Input
                    placeholder="password"
                    type="password"
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onEnter={this.onEnter}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <Input
                    placeholder="invalid input"
                    invalid
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onEnter={this.onEnter}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <Input
                    placeholder='type "eee"'
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    onEnter={this.onEnter}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        defaultValue="Dynamic Input"
                        placeholder="Dynamic Input Placeholder"
                        style={{
                            width: '100%'
                        }}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                        onEnter={this.onEnter}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        placeholder="Icon"
                        icon="ts-tobit2016"
                        style={{
                            width: '100%'
                        }}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                        onEnter={this.onEnter}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        placeholder='type "eee"'
                        regExp={new RegExp('.*e{3}.*')}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                        onEnter={this.onEnter}
                        icon={faCoffee}
                        style={{
                            width: '100%'
                        }}
                        noDeleteIcon
                        onIconClick={console.log}
                        dynamic
                    />
                </div>
            </ExampleContainer>
        );
    }
}
