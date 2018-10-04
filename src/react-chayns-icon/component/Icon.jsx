import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
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
        className: PropTypes.string,
    };

    static defaultProps = {
        scale: 1,
        color: undefined,
        className: undefined,
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
        const { icon, scale, color, className } = this.props;

        if (chayns.utils.isString(icon)) {
            const classes = classNames(icon, {
                [className]: !!className
            });
            return <i className={classes} style={{ fontSize: `${scale}rem`, color }}/>;
        }

        return (
            <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} size={`${scale}x`} color={color} className={className}/>
        );
    }
}
