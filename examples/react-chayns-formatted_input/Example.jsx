import React, { PureComponent } from 'react';

import FormattedInput from '../../src/react-chayns-formatted_input/FormattedInput';

export default class InputExample extends PureComponent {
    state = {
        value: '',
    };

    onChange = (value, valid) => {
        console.log('onChange', value, valid);

        this.setState({
            value,
        });
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <div>
                    {`Value: ${value}`}
                </div>
                <FormattedInput
                    value={value}
                    placeholder="input"
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
            </div>
        );
    }
}
