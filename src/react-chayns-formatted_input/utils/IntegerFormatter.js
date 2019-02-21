import Formatter from './Formatter';

export default class IntegerFormatter extends Formatter {
    static ALLOWED_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    /* eslint-disable-next-line class-methods-use-this */
    format(value) {
        if (value === null) {
            return '';
        }

        return String(parseInt(value, 10));
    }

    /* eslint-disable-next-line class-methods-use-this */
    parse(value) {
        const parsedValue = parseInt(value, 10);

        /* eslint-disable-next-line no-restricted-globals */
        return (isNaN(parsedValue) || !isFinite(parsedValue)) ? false : parsedValue;
    }

    /* eslint-disable-next-line class-methods-use-this */
    validate(value) {
        return value === String(parseInt(value, 10));
    }
}
