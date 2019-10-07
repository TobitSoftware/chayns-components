import React, { PureComponent } from 'react';

import {
    FormattedInput,
    PriceFormatter,
    FORMAT_DECIMAL,
    FORMAT_INTEGER,
    FORMAT_PRICE,
} from '../../src';

export default class InputExample extends PureComponent {
    static priceFormatter = new PriceFormatter('€');

    onChange = (value, valid) => {
        console.log('onChange', value, valid);
    };

    render() {
        return (
            <div>
                <h3>IntegerFormatter</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={FORMAT_INTEGER}
                    placeholder="input"
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />
                <h3>NumericFormatter</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={FORMAT_DECIMAL}
                    placeholder="input"
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />
                <h3>PriceFormatter (NumericFormatter)</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={FORMAT_PRICE}
                    onChange={this.onChange}
                    type="number"
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                    }}
                    dynamic
                    placeholder="price"
                />
                <h3>PriceFormatter (with currency-sign)</h3>
                <FormattedInput
                    defaultValue={100456.784}
                    initialFormatter={InputExample.priceFormatter}
                    onChange={this.onChange}
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                    }}
                    dynamic
                    placeholder="price"
                />
            </div>
        );
    }
}
