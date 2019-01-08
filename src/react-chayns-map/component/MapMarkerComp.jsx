/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../react-chayns-icon/component/Icon';

export default class MapMarkerComp extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        className: PropTypes.string,
        bgImg: PropTypes.string.isRequired,
        style: PropTypes.objectOf(PropTypes.string),
        // eslint-disable-next-line react/forbid-prop-types
        icon: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                iconName: PropTypes.string.isRequired,
                prefix: PropTypes.string.isRequired,
            }).isRequired,
        ]).isRequired,
    };

    static defaultProps = {
        onClick: null,
        className: '',
        style: {},
    };

    render() {
        const {
            style,
            className,
            bgImg,
            icon,
            onClick
        } = this.props;

        return (
            <div
                style={style}
                className={`${className} markerDiv`}
                id="mapMarkerC"
                onClick={onClick}
            >
                <img
                    style={{ height: '25px' }}
                    src={bgImg}
                    alt=""
                />
                <Icon
                    className="faIconC"
                    icon={icon}
                />
            </div>
        );
    }
}
