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
        thousandSeparator = '',
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

        return {
            value: valueParts.join(decimalSeparator),
        };
    }

    parse(value) {
        const { thousand: thousandSeparator, decimal: decimalSeparator } = this.config.seperators;

        if (value === '') {
            return null;
        }

        const parsedValue = parseFloat(value.split(thousandSeparator).join('').replace(decimalSeparator, '.'));

        return {
            value: (isNaN(parsedValue) || !isFinite(parsedValue)) ? false : parsedValue,
        };
    }
}
