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
        className: PropTypes.string,
        style: PropTypes.object()
    };

    static defaultProps = {
        className: '',
        style: undefined
    };

    constructor(props) {
        super(props);
        const { icon } = props;
        if (!chayns.utils.isString(icon) && icon && icon.prefix && icon.iconName) {
            library.add(icon);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { icon } = this.props;
        if (icon !== nextProps.icon && !chayns.utils.isString(nextProps.icon) && nextProps.icon && nextProps.icon.prefix && nextProps.icon.iconName) {
            library.add(nextProps.icon);
        }
    }

    render() {
        const { icon, className, ...rest } = this.props;

        if (chayns.utils.isString(icon)) {
            const classes = classNames(icon, {
                [className]: !!className
            });
            return <i className={classes} {...rest}/>;
        }
        if (!icon) {
            return null;
        }
        return (
            <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} className={className} {...rest}/>
        );
    }
}
