import DecimalFormatter from './DecimalFormatter';
import endsWith from '../../utils/endsWith';
import startsWith from '../../utils/startsWith';

export default class PriceFormatter extends DecimalFormatter {
    currency = {
        sign: '',
    };

    constructor(
        currencySign = '',
        {
            decimalSeparator = ',',
            thousandSeparator = '.',
            currencyBefore = null,
        } = {}
    ) {
        super({
            decimalSeparator,
            thousandSeparator,
            decimals: 2,
        });

        this.currency.sign = currencySign;
        this.currency.before =
            currencyBefore === null ? currencySign !== '€' : !!currencyBefore;
    }

    format(value) {
        if (value === null || value === '') {
            return '';
        }

        if (!this.currency.sign) {
            return super.format(value);
        }

        if (this.currency.before) {
            return `${this.currency.sign} ${super.format(value)}`;
        }

        return `${super.format(value)} ${this.currency.sign}`;
    }

    removeCurrencySign(value, selection = null) {
        let newValue = value;
        const newSelection = { ...selection };

        if (this.currency.sign) {
            if (this.currency.before) {
                if (startsWith(newValue, this.currency.sign)) {
                    newValue = newValue.slice(1);

                    newSelection.start = Math.max(0, newSelection.start - 1);
                    newSelection.end = Math.max(0, newSelection.end - 1);
                }

                if (startsWith(newValue, ' ')) {
                    newValue = newValue.slice(1);

                    newSelection.start = Math.max(0, newSelection.start - 1);
                    newSelection.end = Math.max(0, newSelection.end - 1);
                }
            } else {
                if (endsWith(newValue, this.currency.sign)) {
                    newValue = newValue.slice(0, -this.currency.sign.length);
                }

                if (endsWith(newValue, ' ')) {
                    newValue = newValue.slice(0, -1);
                }

                newSelection.start = Math.min(
                    newSelection.start,
                    newValue.length
                );
                newSelection.end = Math.min(newSelection.end, newValue.length);
            }
        }

        return {
            value: newValue,
            selection: newSelection,
        };
    }

    parse(value) {
        if (value === '') {
            return null;
        }

        const newValue = this.removeCurrencySign(value);

        return super.parse(newValue.value);
    }

    validate(value, selection) {
        const {
            value: newValue,
            selection: newSelection,
        } = this.removeCurrencySign(value, selection);

        return super.validate(newValue, newSelection);
    }
}
