import NumericFormatter from './NumericFormatter';

export default class PriceFormatter extends NumericFormatter {
    currencySign = '€';

    constructor(currencySign = '€', {
        decimalSeparator = ',',
        thousandSeparator = '',
    } = {}) {
        super({
            decimalSeparator,
            thousandSeparator,
        });

        this.config.currencySign = currencySign;
    }

    format(value) {
        if (value === null || value === '') {
            return '';
        }

        return `${super.format(value)} ${this.config.currencySign}`;
    }

    parse(value) {
        if (value === '') {
            return null;
        }

        let newValue = value;

        if (newValue.endsWith(this.config.currencySign)) {
            newValue = newValue.slice(0, -this.config.currencySign.length);
        }

        if (newValue.endsWith(' ')) {
            newValue = newValue.slice(0, -1);
        }

        return super.parse(newValue);
    }

    validate(value) {
        let newValue = value;

        if (newValue.endsWith(this.config.currencySign)) {
            newValue = newValue.slice(0, -this.config.currencySign.length);
        }

        if (newValue.endsWith(' ')) {
            newValue = newValue.slice(0, -1);
        }

        const parts = newValue.split(',');
        if (parts[1] && parts[1].length > 2) {
            return false;
        }

        return super.validate(newValue);
    }
}
