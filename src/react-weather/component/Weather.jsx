/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import WorldWeather from '../utils/WorldWeatherOnline';
import { fetchDataFromApi } from '../../utils/fetch';

export default class Weather extends React.Component {
    static propTypes = {
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        onLoaded: PropTypes.func,
        onError: PropTypes.func,
        server: PropTypes.string,
        city: PropTypes.string,
        qa: PropTypes.bool,
        locationId: PropTypes.number
    };

    static defaultProps = {
        longitude: null,
        latitude: null,
        onLoaded: null,
        onError: null,
        server: null,
        city: null,
        qa: null,
        locationId: null,
    };

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        const { latitude, longitude } = this.props;

        if(latitude && longitude) {
            this._fetch();
        }
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude } = this.props;

        if(latitude && longitude && prevProps.latitude !== latitude && prevProps.longitude !== longitude) {
            this._fetch();
        }
    }

    _openWeather = () => {
        const { city, qa, server } = this.props;

        let url = `https://tapp01.tobit.com/Tapps/Weather/Web/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${city || ''}&TappID=3`; // ${window.chayns.env.site.tapp.id}
        if(qa) {
             url = `${server || 'https://tappqa.tobit.com/Tapps/WeatherTapp'}/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${city || ''}&TappID=3`;
        }

        return url;
        //
        // if(this.props.latitude && this.props.longitude) {
        //     url += `&lat=${encodeURI(this.props.latitude+"")}&lng=${encodeURI(this.props.longitude+"")}`;
        // }
        //
        // let title = 'Wetter';
        // if(this.props.city) {
        //     title += ' in ' + this.props.city;
        // }
        //
        // window.chayns.openUrl({
        //     "url": url,
        //     "exclusiveView": false,
        //     "title": title
        // });
    };

    _fetch() {
        const {
            longitude: lng,
            latitude: lat,
            server,
            locationId,
            qa,
            onLoaded,
            onError,
        } = this.props;

        this.setState({
            // eslint-disable-next-line react/no-unused-state
            isFetching: true
        });

        let url = `${server || 'https://tapp01.tobit.com/Tapps/Weather/API/Weather'}/${locationId || window.chayns.env.site.locationId}/?current=true&forecast=true`;
        if(qa) {
            url = `${server || 'https://tappqa.tobit.com/Tapps/WeatherProxy/Weather'}/${locationId || window.chayns.env.site.locationId}/?current=true&forecast=true`;
        }

        if(lat && lng) {
            url += `&lat=${encodeURI(`${lat}`)}&lng=${encodeURI(`${lng}`)}`;
        }


        fetchDataFromApi(url).then((data) => {
            this.setState({
                weather: new WorldWeather(data)
            });

            if(onLoaded) {
                onLoaded(data);
            }
        }).catch((error) => {
            console.warn('Error while fetching Weather-Data', error);

            if(onError) {
                onError(error);
            }
        }).then(() => {
            this.setState({
                // eslint-disable-next-line react/no-unused-state
                isFetching: false
            });
        });
    }

    render() {
        let temp = 'no content';
        let icon = '';
        let minTemp = '';
        let maxTemp = '';

        const { weather } = this.state;

        if(weather) {
            temp = weather.getCurrentCondition().getTemp();
            icon = weather.getCurrentCondition().getWeatherIcon();
            minTemp = weather.getForecast(1).getMinTemp();
            maxTemp = weather.getForecast(1).getMaxTemp();
        }

        if(weather && temp !== null && icon && minTemp !== null && maxTemp !== null) {
            return (
                <div
                    className="weather-widget"
                    onClick={this._openWeather}
                >
                    <div className="weather-widget__empty"/>
                    <div className="weather-widget__icon">
                        <i className={`${icon} chayns__color--100`}/>
                    </div>
                    <div className="weather-widget__temp">
                        {temp || 'non content'}
                    </div>
                    <div className="weather-widget__celsius">
                        {'°C'}
                    </div>
                    <div className="weather-widget__info">
                        <div className="weather-widget__info__max">
                            <i className="fa fa-caret-up"/>
                            {` ${maxTemp} °`}
                        </div>

                        <div className="weather-widget__info__min">
                            <i className="fa fa-caret-down"/>
                            {` ${minTemp} °`}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}
