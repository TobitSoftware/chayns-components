import Formatter from './Formatter';
import IntegerFormatter from './IntegerFormatter';

export default class DecimalFormatter extends Formatter {
    config = {
        seperators: {
            thousand: false,
            decimal: '.',
        },
        decimals: null,
    };

    constructor({
        decimalSeparator = ',',
        thousandSeparator = '.',
        decimals = null,
    } = {}) {
        super();

        this.config.seperators.thousand = thousandSeparator;
        this.config.seperators.decimal = decimalSeparator;
        this.config.decimals = decimals;
    }

    format(value) {
        const { decimals } = this.config;
        const {
            thousand: thousandSeparator,
            decimal: decimalSeparator,
        } = this.config.seperators;

        if (value === null) {
            return '';
        }

        const valueParts = String(value).split('.');
        valueParts[0] = valueParts[0].replace(
            /\B(?=(\d{3})+(?!\d))/g,
            thousandSeparator
        );

        if (decimals) {
            if (valueParts[1] && valueParts[1].length > decimals) {
                valueParts[1] = valueParts[1].slice(0, decimals);
            } else if (!valueParts[1] || valueParts[1].length < decimals) {
                const length = valueParts[1] ? valueParts[1].length : 0;

                let padding = '';
                for (let i = length; i < decimals; i += 1) {
                    padding += '0';
                }

                valueParts[1] = (valueParts[1] || '') + padding;
            }
        }

        return valueParts.join(decimalSeparator);
    }

    parse(value) {
        const {
            thousand: thousandSeparator,
            decimal: decimalSeparator,
        } = this.config.seperators;

        if (value === '') {
            return null;
        }

        const parsedValue = parseFloat(
            value
                .split(thousandSeparator)
                .join('')
                .replace(decimalSeparator, '.')
        );

        /* eslint-disable-next-line no-restricted-globals */
        return isNaN(parsedValue) || !isFinite(parsedValue)
            ? false
            : parsedValue;
    }

    validateChars(value) {
        const {
            thousand: thousandSeparator,
            decimal: decimalSeparator,
        } = this.config.seperators;

        for (let i = 0; i < value.length; i += 1) {
            if (
                IntegerFormatter.ALLOWED_CHARS.indexOf(value[i]) === -1 &&
                value[i] !== thousandSeparator &&
                value[i] !== decimalSeparator
            ) {
                if (i === 0 && value[i] === '-') {
                    return true;
                }

                return false;
            }
        }

        return true;
    }

    validate(value, selection) {
        const { decimals } = this.config;
        const { decimal: decimalSeparator } = this.config.seperators;

        const valueParts = value.split(decimalSeparator);

        if (
            valueParts.length > 2 ||
            (decimals !== null &&
                valueParts[1] &&
                valueParts[1].length > decimals) ||
            !this.validateChars(value)
        ) {
            return {
                valid: false,
                selection: {
                    start: Math.max(0, selection.start - 1),
                    end: Math.min(value.length, selection.end),
                },
            };
        }

        return {
            valid: true,
        };
    }
}
