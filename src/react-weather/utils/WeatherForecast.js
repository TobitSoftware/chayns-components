import WorldWeatherOnline from './WorldWeatherOnline';
import Astronomy from './Astronomy';
import WeatherInfo from './WeatherInfo';

export default class WeatherForecast {
    constructor(jsonObject) {
        this._forecast = jsonObject;
        this._wwo = WorldWeatherOnline;
    }

    getMinTemp(fahrenheit) {
        if (!fahrenheit) {
            return parseInt(this._forecast.mintempC, 10) || 0;
        }

        return parseInt(this._forecast.mintempF, 10) || 0;
    }

    getMaxTemp(fahrenheit) {
        if (!fahrenheit) {
            return parseInt(this._forecast.maxtempC, 10) || 0;
        }

        return parseInt(this._forecast.maxtempF, 10) || 0;
    }

    getAvgTemp(fahrenheit) {
        const minTemp = this.getMinTemp(fahrenheit);
        const maxTemp = this.getMaxTemp(fahrenheit);

        if (minTemp !== null && maxTemp !== null) {
            return (minTemp + maxTemp) / 2;
        }

        return null;
    }

    getAvgHoursTemp(fahrenheit) {
        let avgTemp = 0;
        let i = 0;

        this.getHours().map((element) => {
            const temp = element.getTemp(fahrenheit);

            if (temp !== null) {
                avgTemp += temp;
                i += 1;
            }
        });

        if (avgTemp !== null && i) {
            return avgTemp / i;
        }

        return null;
    }

    getUvIndex() {
        return parseInt(this._forecast.uvIndex, 10) || null;
    }

    getAstronomy() {
        if (this._forecast.astronomy) {
            return new Astronomy(this._forecast.astronomy, this);
        }

        return null;
    }

    getDate() {
        if (this._forecast.date) {
            return new Date(this._forecast.date);
        }

        return null;
    }

    getHour(hour) {
        const hours = this.getHours();

        if (!hours) return null;

        return hours[hour];
    }

    getHourByIndex(index) {
        return new WeatherInfo(this._forecast.hourly[index], this._wwo);
    }

    getHours() {
        if (this._forecast.hourly) {
            return this._forecast.hourly.map((element) => {
                return new WeatherInfo(element, this._wwo);
            });
        }

        return null;
    }

    getPrecipitation(inches) {
        const hours = this.getHours();
        let all = 0.0;
        let i = 0;

        hours.map((element) => {
            const precip = element.getPrecipitation(inches);
            if (precip) {
                i += 1;
                all += precip;
            }
        });

        i = 0;
        if (i === 0) {
            return all;
        }

        return all / i;
    }
}
