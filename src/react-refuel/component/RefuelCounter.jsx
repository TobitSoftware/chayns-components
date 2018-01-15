/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default class RefuelCounter extends React.Component {
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

    _getLower() {
        return (
            <span className="refuel-counter refuel-counter__lower noselect">
                {`${Math.floor(parseFloat(this.props.value))},${(parseFloat(this.props.value) % 1).toFixed(2).substring(2)}`}
            </span>
        );
    }

    _getUpper() {
        return (
            <span className="refuel-counter refuel-counter__upper noselect">
                {(parseFloat(this.props.value) % 1).toFixed(3).substring(4)}
            </span>
        );
    }

    _onClick = () => {
        if(this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        return(
            <div
                className="refuel-info"
                onClick={this._onClick}
            >
                <div className="refuel-info__name">{this.props.name}</div>

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
