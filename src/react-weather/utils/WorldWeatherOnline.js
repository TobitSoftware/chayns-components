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

    static getWeatherIcon(weatherCode, isNight) {
        let icon = '';

        switch (weatherCode) {
            case 395:
            case 392:
                icon = 'wi-##daytime##-snow-thunderstorm';
                break;
            case 389:
                icon = 'wi-##daytime##-thunderstorm';
                break;
            case 386:
                icon = 'wi-##daytime##-storm-showers';
                break;
            case 377:
            case 374:
                icon = 'wi-##daytime##-sleet';
                break;
            case 371:
            case 362:
                icon = 'wi-##daytime##-snow';
                break;
            case 359:
            case 356:
                icon = 'wi-##daytime##-rain';
                break;
            case 353:
                icon = 'wi-##daytime##-sprinkle';
                break;
            case 350:
                icon = 'wi-##daytime##-hail';
                break;
            case 338:
            case 335:
            case 332:
            case 329:
            case 326:
            case 323:
                icon = 'wi-##daytime##-snow';
                break;
            case 320:
            case 317:
            case 314:
            case 311:
            case 284:
            case 281:
                icon = 'wi-##daytime##-sleet';
                break;
            case 308:
            case 305:
            case 302:
            case 299:
            case 296:
            case 293:
                icon = 'wi-##daytime##-rain';
                break;
            case 266:
            case 263:
                icon = 'wi-##daytime##-thunderstorm';
                break;
            case 260:
            case 248:
                icon = 'wi-##daytime##-fog';
                break;
            case 230:
                icon = 'wi-##daytime##-snow-thunderstorm';
                break;
            case 227:
                icon = 'wi-##daytime##-snow-wind';
                break;
            case 200:
                icon = 'wi-##daytime##-storm-showers';
                break;
            case 185:
            case 182:
            case 179:
                icon = 'wi-##daytime##-sleet';
                break;
            case 176:
                icon = 'wi-##daytime##-rain';
                break;
            case 143:
                icon = 'wi-##daytime##-fog';
                break;
            case 122:
            case 119:
                icon = 'wi-##daytime##-cloudy-windy';
                break;
            case 116:
                icon = 'wi-##daytime##-cloudy';
                break;
            case 113:
                icon = 'wi-##daytime##-sunny';
                break;
            default:
                break;
        }

        if(!isNight) {
            return `wi ${icon.replace(/##daytime##/g, 'day')}`;
        }

        return `wi ${icon.replace(/##daytime##/g, 'night')}`;
    }

    static parseAstronomyTime(string, parent) {
        let hour = parseInt(string.slice(0, 2), 10);
        const minutes = parseInt(string.slice(3, 5), 10);
        const type = string.slice(6, 8).toLowerCase();

        if(type === 'pm' && hour <= 12) {
            hour += 12;
        }

        const retval = parent.getDate();
        retval.setHours(hour);
        retval.setMinutes(minutes);

        return retval;
    }

    static parseHmmTime(string, date = new Date()) {
        if(string.length < 3) { date.setHours(0); date.setMinutes(0); return date; }

        const hour = parseInt(string.slice(0, string.length - 2), 10);
        const minutes = parseInt(string.slice(string.length - 2, string.length), 10);

        date.setHours(hour);
        date.setMinutes(minutes);

        return date;
    }
}
