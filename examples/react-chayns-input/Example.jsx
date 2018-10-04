import React, { PureComponent } from 'react';

import { Input, DynamicInput } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
    static onBlur(value) {
        console.log('onBlur', value);
    }

    static onChange(value) {
        console.log('onChange', value);
    }

    static onEnter(value) {
        console.log('onEnter', value);
    }

    static onKeyUp(e) {
        console.log('onKeyUp', e);
    }

    render() {
        return (
            <ExampleContainer headline="Input">
                <Input
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
                    defaultValue="invalid value"
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

                <DynamicInput
                    placeholder="Dynamic Input Placeholder"
                />
            </ExampleContainer>
        );
    }
}
