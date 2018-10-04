import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Icon extends PureComponent {
    static propTypes = {
        icon: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                iconName: PropTypes.string.isRequired,
                prefix: PropTypes.string.isRequired,
            }).isRequired,
        ]).isRequired,
        scale: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        scale: 1,
        color: undefined,
    };

    constructor(props) {
        super(props);
        const { icon } = props;
        if (!chayns.utils.isString(icon)) {
            library.add(icon);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { icon } = this.props;
        if(icon !== nextProps.icon && !chayns.utils.isString(nextProps.icon)) {
            library.add(nextProps.icon);
        }
    }

    render() {
        const { icon, scale, color } = this.props;
        if (chayns.utils.isString(icon)) {
            return <i className={icon} style={{ fontSize: `${scale}rem`, color }}/>;
        }
        return (
            <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} size={`${scale}x`} color={color}/>
        );
    }
}
