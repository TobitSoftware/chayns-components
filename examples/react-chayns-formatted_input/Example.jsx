import React, { PureComponent } from 'react';

import FormattedInput from '../../src/react-chayns-formatted_input/component/FormattedInput';
import NumericFormatter from '../../src/react-chayns-formatted_input/utils/NumericFormatter';
import IntegerFormatter from '../../src/react-chayns-formatted_input/utils/IntegerFormatter';
import PriceFormatter from '../../src/react-chayns-formatted_input/utils/PriceFormatter';

export default class InputExample extends PureComponent {
    static integerFormatter = new IntegerFormatter();

    static numericFormatter = new NumericFormatter();

    static priceFormatter = new PriceFormatter();

    onChange = (value, valid) => {
        console.log('onChange', value, valid);
    };

    render() {
        return (
            <div>
                <h3>IntegerFormatter</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={InputExample.integerFormatter}
                    placeholder="input"
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <h3>NumericFormatter</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={InputExample.numericFormatter}
                    placeholder="input"
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                />
                <h3>PriceFormatter (NumericFormatter)</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={InputExample.priceFormatter}
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px'
                    }}
                    dynamic
                    placeholder="price"
                />
            </div>
        );
    }
}
