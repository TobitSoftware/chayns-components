import WeatherForecast from './WeatherForecast';
import WeatherInfo from './WeatherInfo';
import { isInteger } from './utils';


export default class WorldWeatherOnline {
    constructor(jsonString) {
        if(jsonString) {
            this._error = this.parseJson(jsonString);
        } else {
            this._error = true;
        }
    }

    parseJson(json) {
        try {
            let weather = json;

            if(typeof json === 'string' || json instanceof String) {
                weather = JSON.parse(json);
            }

            if(!weather.data) {
                return true;
            }

            if(weather.data.current_condition) {
                this._currentCondition = new WeatherInfo(weather.data.current_condition[0], this);
            }

            if(weather.data.weather) {
                this._forecast = weather.data.weather;
            }

            return false;
        } catch (ex) {
            console.warn('Error while parsing Weather', ex, json);
        }

        return true;
    }

    getCurrentCondition() {
        return this._currentCondition;
    }

    getForecast(date) {
        if(isInteger(date) && this._forecast[date]) {
            return new WeatherForecast(this._forecast[date], this);
        }

        return null;
    }

    getForecasts() {
        return this._forecast.map((element) => {
            return new WeatherForecast(element, this);
        });
    }

    setTexts(object) {
        this._textStrings = object;
    }

    getWeatherString(weatherCode) {
        if(this._textStrings[weatherCode]) {
            return this._textStrings[weatherCode];
        }

        return null;
    }
}
