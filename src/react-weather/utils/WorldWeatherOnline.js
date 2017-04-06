if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

Number.isInteger = Number.isInteger || function(value) {
        return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
    };


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
        } catch(ex) {
            console.warn('Error while parsing Weather', ex, json);
        }

        return true;
    }

    getCurrentCondition() {
        return this._currentCondition;
    }

    getForecast(date) {
        if(Number.isInteger(date) && this._forecast[date]) {
            return new WeatherForecast(this._forecast[date], this);
        }
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

        switch(weatherCode) {
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
            return 'wi '+ icon.replace(/##daytime##/g, 'day');
        }

        return 'wi '+ icon.replace(/##daytime##/g, 'night');
    }

    static parseAstronomyTime(string, parent) {
        let hour = parseInt( string.slice(0, 2) );
        let minutes = parseInt( string.slice(3, 5) );
        let type = string.slice(6, 8).toLowerCase();

        if(type == 'pm' && hour <= 12) {
            hour += 12;
        }

        let retval = parent.getDate();
        retval.setHours(hour);
        retval.setMinutes(minutes);

        return retval;
    }

    static parseHmmTime(string, date) {
        if(!date) date = new Date();
        if(string.length < 3) { date.setHours(0); date.setMinutes(0); return date; }

        let hour = parseInt( string.slice(0, string.length-2) );
        let minutes = parseInt( string.slice(string.length-2, string.length) );

        date.setHours(hour);
        date.setMinutes(minutes);

        return date;
    }


}

class WeatherForecast {
    constructor(jsonObject, wwoParser) {
        this._forecast = jsonObject;
        this._wwo = WorldWeatherOnline;
    }

    getMinTemp(fahrenheit) {
        if(!fahrenheit)
            return parseInt(this._forecast.mintempC) || 0;

        return parseInt(this._forecast.mintempF) || 0;
    }

    getMaxTemp(fahrenheit) {
        if(!fahrenheit)
            return parseInt(this._forecast.maxtempC) || 0;

        return parseInt(this._forecast.maxtempF) || 0;
    }

    getAvgTemp(fahrenheit) {
        let minTemp = this.getMinTemp(fahrenheit);
        let maxTemp = this.getMaxTemp(fahrenheit);

        if(minTemp !== null && maxTemp !== null) {
            return ( minTemp + maxTemp ) / 2;
        }

        return null;
    }

    getAvgHoursTemp(fahrenheit) {

        let avgTemp = 0;
        let i = 0;

        this.getHours().map((element, index) => {
            let temp = element.getTemp(fahrenheit);

            if(temp !== null) {
                avgTemp += temp;
                i++;
            }
        });

        if(avgTemp != null && i) {
            return avgTemp / i;
        }

        return null;
    }

    getUvIndex() {
        return parseInt(this._forecast.uvIndex) || null;
    }

    getAstronomy() {
        if(this._forecast.astronomy) {
            return new Astronomy(this._forecast.astronomy, this);
        }

        return null;
    }

    getDate() {
        if(this._forecast.date)
            return new Date(this._forecast.date);

        return null;
    }

    getHour(hour) {

    }

    getHourByIndex(index) {
        return new WeatherInfo(this._forecast.hourly[index], this._wwo);
    }

    getHours() {

        if(this._forecast.hourly)
            return this._forecast.hourly.map((element) => {
                return new WeatherInfo(element, this._wwo);
            })
    }

    getPrecipitation(inches) {
        let hours = this.getHours();
        let all = 0.0;
        let i = 0;

        hours.map((element) => {
            let precip = element.getPrecipitation(inches);
            if(precip) {
                i++;
                all += precip;
            }
        });

        i=0;
        if(i == 0) {
            return all;
        }

        return all/i;
    }


}

class Astronomy {
    constructor(jsonObject, parent) {
        if(jsonObject[0])
            this._info = jsonObject[0];

        if(parent) {
            this._parent = parent;
        }
    }

    getMoonrise() {
        if(this._info)
            return WorldWeatherOnline.parseAstronomyTime(this._info.moonrise, this._parent) || null;

        return null
    }

    getMoonset() {
        if(this._info)
            return WorldWeatherOnline.parseAstronomyTime(this._info.moonset, this._parent) || null;

        return null
    }

    getSunrise() {
        if(this._info)
            return WorldWeatherOnline.parseAstronomyTime(this._info.sunrise, this._parent) || null;

        return null
    }

    getSunset() {
        if(this._info)
            return WorldWeatherOnline.parseAstronomyTime(this._info.sunset, this._parent) || null;

        return null
    }
}

class WeatherInfo {
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
        return parseInt(this._info.humiditiy) || null;
    }

    getPressure() {
        return parseInt(this._info.pressure) || null;
    }

    getTemp(fahrenheit) {
        if(!fahrenheit)
            return parseInt(this._info.temp_C) || parseInt(this._info.tempC) || null;

        return parseInt(this._info.temp_F) || parseInt(this._info.tempC) || null;
    }

    getWeatherIcon(isNight) {
        return WorldWeatherOnline.getWeatherIcon(this.getWeatherCode(), isNight);
    }

    getWeatherCode() {
        return parseInt(this._info.weatherCode) || null;
    }

    getWeatherText() {
        return parseInt(this._info.weatherCode) || null;
    }

    getWinddir(point) {
        if(!point)
            return parseInt(this._info.winddirDegree) || null;

        return this._info.winddir16Point || null;
    }

    getWindspeed(miles) {
        if(!miles)
            return parseInt(this._info.windspeedKmph) || null;

        return parseInt(this._info.windspeedMiles) || null;
    }

    getVisibility(miles) {
        return parseInt(this._info.visibility) || null;
    }

    getTime() {
        if(!this._info.time) return null;

        return WorldWeatherOnline.parseHmmTime(this._info.time, new Date());
    }

    getPrecipitation(inches) {
        if(!inches)
            return parseFloat(this._info.precipMM) || 0;

        return parseFloat(this._info.precipInches) || 0;
    }
}