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
        if(prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
            if(this.props.latitude <= 90 && this.props.longitude <= 180) {
                this._fetch(this);
            } else if(this.props.onError) {
                this.props.onError();
            }
        }
    }

    _openRefuel = () => {
        let url = `https://tapp01.tobit.com/Tapps/FuelPrice/Web/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${this.props.city || ''}&TappID=3`; // ${window.chayns.env.site.tapp.id}
        if(this.props.qa) {
            url = `https://tappqa.tobit.com/Tapps/FuelStationTapp/?AppVersion=##version##&ColorScheme=##colorscheme##&OS=##os##&color=##color##&colormode=##colormode##&font=##fontid##&city=${this.props.city || ''}&TappID=3`;
        }


        if(this.props.latitude && this.props.longitude) {
            url += `&lat=${encodeURI(`${this.props.latitude}`)}&lng=${encodeURI(`${this.props.longitude}`)}`;
        }

        let title = 'Tanken';
        if(this.props.city) {
            title += ` in ${this.props.city}`;
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
        this.setState({
            isFetching: true
        });

        let url = `${this.props.server || 'https://tapp01.tobit.com/Tapps/FuelPrice/API/api/Fuel'}/?locationId=${this.props.locationId || window.chayns.env.site.locationId}&tappId=${this.props.tappId || (window.chayns.env.site.tapp && window.chayns.env.site.tapp.id) || 1}`;
        if(this.props.qa) {
            url = `https://tappqa.tobit.com/Tapps/RefuelApi/api/Fuel/?locationId=${this.props.locationId || window.chayns.env.site.locationId}&tappId=${this.props.tappId || (window.chayns.env.site.tapp && window.chayns.env.site.tapp.id) || 1}`;
        }

        if(this.props.latitude && this.props.longitude) {
            url += `&lat=${encodeURI(`${this.props.latitude}`)}&lng=${encodeURI(`${this.props.longitude}`)}`;
        }

        if(!this.props.waitForLatLng || (this.props.latitude && this.props.longitude)) {
            fetchDataFromApi(url).then((data) => {
                this._refuel = data;

                if(this.props.onLoaded) {
                    this.props.onLoaded(data);
                }
            }).catch((error) => {
                console.warn('Error while fetching Fuel-Data', error);

                if(this.props.onError) {
                    this.props.onError(error);
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
            return (<div className="refuel">
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
            </div>);
        }


        if(this.state.isFetching) {
            return (<div>{this.props.isFetching || 'Tankdaten werden vom Server geladen.'}</div>);
        }


        return (<div>{this.props.noContent || 'Es konnten keine Tankdaten zu ihrem Standort gefunden werden.'}</div>);
    }
}
