import React from 'react';
import PropTypes from 'prop-types';

import { fetchDataFromApi } from '../../utils/fetch';

import RefuelCounter from './RefuelCounter';

export default class Refuel extends React.Component {
    static propTypes = {
        locationId: PropTypes.number,
        tappId: PropTypes.number,
        noContent: PropTypes.node,
        isFetching: PropTypes.node,
        onLoaded: PropTypes.func,
        onError: PropTypes.func,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        server: PropTypes.string,
        waitForLatLng: PropTypes.bool,
        city: PropTypes.string,
        qa: PropTypes.bool
    };

    static defaultProps = {
        locationId: null,
        tappId: null,
        noContent: null,
        isFetching: null,
        onLoaded: null,
        onError: null,
        latitude: null,
        longitude: null,
        server: null,
        waitForLatLng: null,
        city: null,
        qa: null
    };

    constructor() {
        super();

        this.state = {
            isFetching: false
        };
    }

    componentDidMount() {
        this._fetch();
    }

    componentDidUpdate(prevProps) {
        const { latitude, longitude, onError } = this.props;

        if(prevProps.latitude !== latitude || prevProps.longitude !== longitude) {
            if(latitude <= 90 && longitude <= 180) {
                this._fetch(this);
            } else if(onError) {
                onError();
            }
        }
    }

    _openRefuel = () => {
        const {
            qa,
            city,
            latitude,
            longitude,
        } = this.props;

        let url = `https://tapp01.tobit.com/Tapps/FuelPrice/Web/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${city || ''}&TappID=3`; // ${window.chayns.env.site.tapp.id}
        if(qa) {
            url = `https://tappqa.tobit.com/Tapps/FuelStationTapp/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${city || ''}&TappID=3`;
        }


        if(latitude && longitude) {
            url += `&lat=${encodeURI(`${latitude}`)}&lng=${encodeURI(`${longitude}`)}`;
        }

        let title = 'Tanken';
        if(city) {
            title += ` in ${city}`;
        }

        window.chayns.openUrl({
            url,
            exclusiveView: false,
            title
        });
        // window.chayns.openUrl({
        //     url:`https://tappqa.tobit.com/Tapps/FuelStationTapp/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&TappID=-7&lat=52.066879362577&lng=7.0164507166667`,
        //     exclusiveView:false
        // });
    };

    _fetch() {
        const {
            server,
            locationId,
            tappId,
            qa,
            latitude,
            longitude,
            onLoaded,
            onError,
            waitForLatLng,
        } = this.props;

        this.setState({
            isFetching: true
        });

        let url = `${server || 'https://tapp01.tobit.com/Tapps/FuelPrice/API/api/Fuel'}/?locationId=${locationId || window.chayns.env.site.locationId}&tappId=${tappId || (window.chayns.env.site.tapp && window.chayns.env.site.tapp.id) || 1}`;
        if(qa) {
            url = `https://tappqa.tobit.com/Tapps/RefuelApi/api/Fuel/?locationId=${locationId || window.chayns.env.site.locationId}&tappId=${tappId || (window.chayns.env.site.tapp && window.chayns.env.site.tapp.id) || 1}`;
        }

        if(latitude && longitude) {
            url += `&lat=${encodeURI(`${latitude}`)}&lng=${encodeURI(`${longitude}`)}`;
        }

        if(!waitForLatLng || (latitude && longitude)) {
            fetchDataFromApi(url).then((data) => {
                this._refuel = data;

                if(onLoaded) {
                    onLoaded(data);
                }
            }).catch((error) => {
                console.warn('Error while fetching Fuel-Data', error);

                if(onError) {
                    onError(error);
                }
            }).then(() => {
                this.setState({
                    isFetching: false
                });
            });
        }
    }

    render() {
        if(this._refuel) {
            return (
                <div className="refuel">
                    {
                        this._refuel.map((element) => {
                            let name = element.fuelId;
                            if (name === 2) {
                                name = 'Super';
                            } else if (name === 1) {
                                name = 'Diesel';
                            } else if (name === 3) {
                                name = 'Super E10';
                            }

                            return (
                                <RefuelCounter
                                    name={name}
                                    value={element.data[0].cost}
                                    key={element.fuelId}
                                    onClick={this._openRefuel}
                                />
                            );
                        })
                    }
                </div>
            );
        }

        const { isFetching } = this.state;
        const { isFetching: isFetchingText } = this.props;


        if(isFetching) {
            return (
                <div>
                    {isFetchingText || 'Tankdaten werden vom Server geladen.'}
                </div>
            );
        }

        const { noContent } = this.props;

        return (
            <div>
                {noContent || 'Es konnten keine Tankdaten zu ihrem Standort gefunden werden.'}
            </div>
        );
    }
}
