import Formatter from './Formatter';

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

        this.allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (thousandSeparator) {
            this.allowedChars.push(thousandSeparator);
        }

        if (decimalSeparator) {
            this.allowedChars.push(decimalSeparator);
        }
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

        return (isNaN(parsedValue) || !isFinite(parsedValue)) ? false : parsedValue;
    }

    validateChars(value) {
        for (let i = 0; i < value.length; i += 1) {
            if (this.allowedChars.indexOf(value[i]) === -1) {
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
