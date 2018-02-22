export default function getWeatherIcon(weatherCode, isNight) {
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
