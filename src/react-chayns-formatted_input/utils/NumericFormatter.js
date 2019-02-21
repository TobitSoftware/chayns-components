import Formatter from './Formatter';
import IntegerFormatter from './IntegerFormatter';

export default class NumericFormatter extends Formatter {
    config = {
        seperators: {
            thousand: false,
            decimal: '.',
        }
    };

    constructor({
        decimalSeparator = ',',
        thousandSeparator = '.',
    } = {}) {
        super();

        this.config.seperators.thousand = thousandSeparator;
        this.config.seperators.decimal = decimalSeparator;
    }

    format(value) {
        const { thousand: thousandSeparator, decimal: decimalSeparator } = this.config.seperators;

        if (value === null) {
            return '';
        }

        const valueParts = String(value).split('.');
        valueParts[0] = valueParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

        return valueParts.join(decimalSeparator);
    }

    parse(value) {
        const { thousand: thousandSeparator, decimal: decimalSeparator } = this.config.seperators;

        if (value === '') {
            return null;
        }

        const parsedValue = parseFloat(value.split(thousandSeparator).join('').replace(decimalSeparator, '.'));

        /* eslint-disable-next-line no-restricted-globals */
        return (isNaN(parsedValue) || !isFinite(parsedValue)) ? false : parsedValue;
    }

    validateChars(value) {
        const { thousand: thousandSeparator, decimal: decimalSeparator } = this.config.seperators;

        for (let i = 0; i < value.length; i += 1) {
            if (IntegerFormatter.ALLOWED_CHARS.indexOf(value[i]) === -1
                && value[i] !== thousandSeparator
                && value[i] !== decimalSeparator) {
                if (i === 0 && value[i] === '-') {
                    return true;
                }

                return false;
            }
        }

        return true;
    }

    validate(value) {
        const { decimal: decimalSeparator } = this.config.seperators;

        if (value.split(decimalSeparator).length > 2) {
            return false;
        }

        if (!this.validateChars(value)) {
            return false;
        }

        return true;
    }
}
