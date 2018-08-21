/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RefuelCounter extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.number,
        name: PropTypes.string,
    };

    static defaultProps = {
        onClick: null,
        value: null,
        name: null,
    };

    _onClick = () => {
        const { onClick } = this.props;

        if(onClick) {
            onClick();
        }
    };

    _getUpper() {
        const { value } = this.props;

        return (
            <span className="refuel-counter refuel-counter__upper noselect">
                {(parseFloat(value) % 1).toFixed(3).substring(4)}
            </span>
        );
    }

    _getLower() {
        const { value } = this.props;

        return (
            <span className="refuel-counter refuel-counter__lower noselect">
                {`${Math.floor(parseFloat(value))},${(parseFloat(value) % 1).toFixed(2).substring(2)}`}
            </span>
        );
    }

    render() {
        const { name } = this.props;

        return(
            <div
                className="refuel-info"
                onClick={this._onClick}
            >
                <div className="refuel-info__name">
                    {name}
                </div>

                <div className="refuel-counter__container chayns__background-color--100">
                    <div style={{ verticalAlign: 'center' }}>
                        {this._getLower()}
                        {this._getUpper()}
                    </div>
                </div>
            </div>
        );
    }
}
