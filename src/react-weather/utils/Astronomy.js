import parseAstronomyTime from './parseAstronomyTime';

export default class Astronomy {
    constructor(jsonObject, parent) {
        if (jsonObject[0]) {
            // eslint-disable-next-line prefer-destructuring
            this._info = jsonObject[0];
        }

        if (parent) {
            this._parent = parent;
        }
    }

    getMoonrise() {
        if (this._info) {
            return parseAstronomyTime(this._info.moonrise, this._parent) || null;
        }

        return null;
    }

    getMoonset() {
        if (this._info) {
            return parseAstronomyTime(this._info.moonset, this._parent) || null;
        }

        return null;
    }

    getSunrise() {
        if (this._info) {
            return parseAstronomyTime(this._info.sunrise, this._parent) || null;
        }

        return null;
    }

    getSunset() {
        if (this._info) {
            return parseAstronomyTime(this._info.sunset, this._parent) || null;
        }

        return null;
    }
}
