import React, { PureComponent } from 'react';

import FormattedInput from '../../src/react-chayns-formatted_input/FormattedInput';
import NumericFormatter from '../../src/react-chayns-formatted_input/utils/NumericFormatter';

export default class InputExample extends PureComponent {
    static formatter = new NumericFormatter();

    state = {
        value: 1000000.44646,
    };

    onChange = (value, valid) => {
        console.log('onChange', value, valid);

        if (value !== false) {
            this.setState({
                value,
            });
        }
    };

    render() {
        const { value } = this.state;

        return (
            <div>
                <div>
                    {`Value: ${value}`}
                </div>
                <FormattedInput
                    defaultValue={value}
                    initialFormatter={InputExample.formatter}
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
