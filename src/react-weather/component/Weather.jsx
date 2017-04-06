import React from 'react';

import WorldWeather from '../utils/WorldWeatherOnline';
import {fetchDataFromApi} from '../utils/fetch';

export default class Weather extends React.Component {
    static PropTypes = {
        longitude: React.PropTypes.float,
        latitude: React.PropTypes.float,
        onLoaded: React.PropTypes.func,
        onError: React.PropTypes.func,
        server: React.PropTypes.string,
        city: React.PropTypes.string,
        qa: React.PropTypes.boolean
    };

    constructor() {
        super();

        this.state = {};
    }

    render() {
        let temp = 'no content';
        let icon = '';
        let minTemp = '';
        let maxTemp = '';

        if(this.state.weather) {
            temp = this.state.weather.getCurrentCondition().getTemp();
            icon = this.state.weather.getCurrentCondition().getWeatherIcon();
            minTemp = this.state.weather.getForecast(1).getMinTemp();
            maxTemp = this.state.weather.getForecast(1).getMaxTemp();
        }

        if(this.state.weather && temp !== null && icon && minTemp !== null && maxTemp !== null)
        return(
            <div className="weather-widget" onClick={this._openWeather.bind(this)}>
                <div className="weather-widget__empty">
                </div>
                <div className="weather-widget__icon">
                    <i className={icon + ' chayns__color--100'} />
                </div>
                <div className="weather-widget__temp">
                    {temp || 'non content'}
                </div>
                <div className="weather-widget__celsius">
                    °C
                </div>
                <div className="weather-widget__info">
                    <div className="weather-widget__info__max">
                        <i className="fa fa-caret-up" /> {maxTemp} °
                    </div>

                    <div className="weather-widget__info__min">
                        <i className="fa fa-caret-down" /> {minTemp} °
                    </div>
                </div>
            </div>
        );

        return null;
    }

    _openWeather() {
        let url = `https://tapp01.tobit.com/Tapps/Weather/Web/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${this.props.city || ''}&TappID=3`; //${window.chayns.env.site.tapp.id}
        if(this.props.qa) {
            url = `${this.props.server || 'https://tappqa.tobit.com/Tapps/WeatherTapp'}/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${this.props.city || ''}&TappID=3`;
        }

        if(this.props.latitude && this.props.longitude) {
            url += `&lat=${encodeURI(this.props.latitude+"")}&lng=${encodeURI(this.props.longitude+"")}`;
        }

        let title = 'Wetter';
        if(this.props.city) {
            title += ' in ' + this.props.city;
        }

        window.chayns.openUrl({
            "url": url,
            "exclusiveView": false,
            "title": title
        });
    }

    componentDidMount() {
        if(this.props.latitude && this.props.longitude) {
            this._fetch();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.latitude && this.props.longitude && prevProps.latitude != this.props.latitude && prevProps.longitude != this.props.longitude) {
            this._fetch();
        }
    }

    _fetch() {
        let lat = this.props.latitude;
        let lng = this.props.longitude;

        this.setState({
            isFetching: true
        });

        let url = `${this.props.server || 'https://tapp01.tobit.com/Tapps/Weather/API/Weather'}/${this.props.locationId || window.chayns.env.site.locationId}/?current=true&forecast=true`;
        if(this.props.qa) {
            url = `${this.props.server || 'https://tappqa.tobit.com/Tapps/WeatherProxy/Weather'}/${this.props.locationId || window.chayns.env.site.locationId}/?current=true&forecast=true`;
        }

        if(this.props.latitude && this.props.longitude) {
            url += `&lat=${encodeURI(lat+"")}&lng=${encodeURI(lng+"")}`;
        }


        fetchDataFromApi(url).then((data) => {
            this.setState({
                weather: new WorldWeather(data)
            });

            if(this.props.onLoaded)
                this.props.onLoaded(data)
        }).catch((error) => {
            console.warn("Error while fetching Weather-Data", error);

            if(this.props.onError)
                this.props.onError(error)
        }).then(() => {
            this.setState({
                isFetching: false
            });
        });
    }
}