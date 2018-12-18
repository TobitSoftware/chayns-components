import React from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import PropTypes from 'prop-types';
import './admin.scss';

export default class MapMarkerComp extends React.Component {
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
        onClick: () => {
        },
        className: '',
        style: {},
        icon: '',
    };

    constructor(props) {
        super(props);
        if (props.onClick) {
            this.onClick = props.onClick.bind(this);
        }
    }

    render() {
        // TODO: this.props
        const {
            style,
            className,
            bgImg,
            icon
        } = this.props;
        return (
            <div
                style={style}
                className={`${className} markerDiv`}
                id="mapMarkerC"
                onClick={this.onClick}
                onKeyPress={undefined}
            >
                <img
                    style={{height: '25px'}}
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
