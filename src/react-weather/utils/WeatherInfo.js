import WorldWeatherOnline from './WorldWeatherOnline';

export default class WeatherInfo {
    constructor(jsonObject, parent) {
        this._info = jsonObject;
        this._parent = parent;
    }

    getRaw() {
        return this._info;
    }

    getCloudcover() {
        return this._info.cloudcover || null;
    }

    getHumidity() {
        return parseInt(this._info.humiditiy, 10) || null;
    }

    getPressure() {
        return parseInt(this._info.pressure, 10) || null;
    }

    getTemp(fahrenheit) {
        if (!fahrenheit) {
            return parseInt(this._info.temp_C, 10) || parseInt(this._info.tempC, 10) || null;
        }

        return parseInt(this._info.temp_F, 10) || parseInt(this._info.tempC, 10) || null;
    }

    getWeatherIcon(isNight) {
        return WorldWeatherOnline.getWeatherIcon(this.getWeatherCode(), isNight);
    }

    getWeatherCode() {
        return parseInt(this._info.weatherCode, 10) || null;
    }

    getWeatherText() {
        return parseInt(this._info.weatherCode, 10) || null;
    }

    getWinddir(point) {
        if (!point) {
            return parseInt(this._info.winddirDegree, 10) || null;
        }

        return this._info.winddir16Point || null;
    }

    getWindspeed(miles) {
        if (!miles) {
            return parseInt(this._info.windspeedKmph, 10) || null;
        }

        return parseInt(this._info.windspeedMiles, 10) || null;
    }

    getVisibility() {
        return parseInt(this._info.visibility, 10) || null;
    }

    getTime() {
        if (!this._info.time) return null;

        return WorldWeatherOnline.parseHmmTime(this._info.time, new Date());
    }

    getPrecipitation(inches) {
        if (!inches) {
            return parseFloat(this._info.precipMM) || 0;
        }

        return parseFloat(this._info.precipInches) || 0;
    }
}
