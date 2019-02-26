import NumericFormatter from './NumericFormatter';
import endsWith from '../../utils/endsWith';
import startsWith from '../../utils/startsWith';

export default class PriceFormatter extends NumericFormatter {
    currency = {
        sign: '',
    };

    constructor(currencySign = '', {
        decimalSeparator = ',',
        thousandSeparator = '.',
        currencyBefore = null,
    } = {}) {
        super({
            decimalSeparator,
            thousandSeparator,
            decimals: 2,
        });

        this.currency.sign = currencySign;
        this.currency.before = (currencyBefore === null) ? (currencySign !== '€') : !!currencyBefore;
    }

    format(value) {
        if (value === null || value === '') {
            return '';
        }

        if (this.currency.before) {
            return `${this.currency.sign} ${super.format(value)}`;
        }

        return `${super.format(value)} ${this.currency.sign}`;
    }

    removeCurrencySign(value) {
        let newValue = value;

        if (this.currency.before) {
            if (startsWith(newValue, this.currency.sign)) {
                newValue = newValue.slice(1);
            }

            if (startsWith(newValue, ' ')) {
                newValue = newValue.slice(1);
            }
        } else {
            if (endsWith(newValue, this.currency.sign)) {
                newValue = newValue.slice(0, -this.currency.sign.length);
            }

            if (endsWith(newValue, ' ')) {
                newValue = newValue.slice(0, -1);
            }
        }

        return newValue;
    }

    parse(value) {
        if (value === '') {
            return null;
        }

        const newValue = this.removeCurrencySign(value);

        return super.parse(newValue);
    }

    validate(value) {
        const newValue = this.removeCurrencySign(value);

        return super.validate(newValue);
    }
}
