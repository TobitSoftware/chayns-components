/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isString } from '../../utils/is';

let displayedIconWarning = false;

/**
 * Displays a FontAwesome icon.
 */
export default class Icon extends Component {
    constructor(props) {
        super(props);
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
            style,
            ...other
        } = this.props;

        if (Array.isArray(icon)) {
            return (
                <span
                    className={`fa-stack ${className}`}
                    style={{
                        height: '1em',
                        width: '1.4em',
                        lineHeight: '1em',
                        ...style,
                    }}
                >
                    {icon.map((s) => (
                        <i
                            key={s}
                            className={`${s} fa-stack-1x`}
                            onClick={this.onClick}
                            {...other}
                        />
                    ))}
                </span>
            );
        }

        let iconName = icon;
        if (typeof icon === 'object') {
            iconName = `${icon.prefix} fa-${icon.iconName}`;
        }
        if (!isString(iconName)) return null;

        const classes = classNames('react-chayns-icon', iconName, className, {
            'react-chayns-icon--clickable': onClick,
            'react-chayns-icon--disabled': disabled,
        });

        return (
            <i
                className={classes}
                style={style}
                onClick={this.onClick}
                {...other}
            />
        );
    }
}

Icon.propTypes = {
    /**
     * The icon to display. Supply a string or an array of strings like this:
     * `fa fa-plane`. Search for icons and their strings on
     * https://fontawesome.com/icons/. For backwards compatibility you can also
     * specify an icon object from the `@fortawesome`-packages, but this should
     * not be used going forward.
     */
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired),
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
