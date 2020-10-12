/**
 * @component
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isFunction, isString } from '../../utils/is';

let displayedIconWarning = false;

/**
 * Displays a FontAwesome icon.
 */
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
    /**
     * The icon to display. Supply a string like this: `fa fa-plane`. Search for
     * icons and their strings on https://fontawesome.com/icons/. For backwards
     * compatibility you can also specify an icon object from the
     * `@fortawesome`-packages, but this should not be used going forward.
     */
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
    ]).isRequired,

    /**
     * A classname string that will be applied to the HTML element of the icon.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied ot the `<i>`-element of the
     * icon.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * A callback that is called for the `onclick`-event on the icon.
     */
    onClick: PropTypes.func,

    /**
     * Disables any user interaction on the icon and renders it in a disabled
     * style.
     */
    disabled: PropTypes.bool,

    /**
     * Wether to stop propagation of click events to parent elements.
     */
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
