/* eslint-disable react/no-redundant-should-component-update,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isFunction, isString } from '../../utils/is';

let displayedIconWarning = false;
export default class Icon extends Component {
    constructor(props) {
        super(props);
        const { icon } = props;
        if (!isString(icon) && icon && icon.prefix && icon.iconName) {
            library.add(icon);
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const { icon } = this.props;
        if (!displayedIconWarning && icon && !isString(icon)) {
            displayedIconWarning = true;

            // eslint-disable-next-line no-console,max-len
            console.warn(
                '[chayns components] Icon: You are still using fortawesome SVG-icons. Consider changing to fontawesome-font-icons. https://github.com/TobitSoftware/chayns-components/blob/master/src/react-chayns-icon/README.md#deprecated'
            );
        }
    }

    shouldComponentUpdate(nextProps) {
        const { icon } = this.props;
        if (
            icon !== nextProps.icon &&
            nextProps.icon &&
            !isString(nextProps.icon) &&
            nextProps.icon.prefix &&
            nextProps.icon.iconName
        ) {
            library.add(nextProps.icon);
        }
        return true;
    }

    onClick(e) {
        const { onClick, disabled, stopPropagation } = this.props;

        if (onClick && !disabled) onClick(e);
        if (stopPropagation) e.stopPropagation();
    }

    render() {
        const {
            icon,
            className,
            onClick,
            disabled,
            stopPropagation,
            ...other
        } = this.props;

        const classes = classNames('react-chayns-icon', className, {
            [icon]: isString(icon),
            'react-chayns-icon--clickable': onClick,
            'react-chayns-icon--disabled': disabled,
        });

        if (isString(icon)) {
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            return <i className={classes} onClick={this.onClick} {...other} />;
        }

        if (!icon) {
            return null;
        }

        if (isFunction(onClick)) {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <span className={classes} onClick={this.onClick}>
                    <FontAwesomeIcon
                        icon={[icon.prefix, icon.iconName]}
                        {...other}
                    />
                </span>
            );
        }

        return (
            <FontAwesomeIcon
                icon={[icon.prefix, icon.iconName]}
                className={classes}
                {...other}
            />
        );
    }
}

Icon.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
    ]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    stopPropagation: PropTypes.bool,
};

Icon.defaultProps = {
    className: '',
    style: undefined,
    onClick: undefined,
    disabled: false,
    stopPropagation: false,
};

Icon.displayName = 'Icon';
