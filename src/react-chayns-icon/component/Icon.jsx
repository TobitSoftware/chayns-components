/* eslint-disable react/no-redundant-should-component-update,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isString } from '../../utils/is';

let displayedIconWarning = false;
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

        return <i className={classes} onClick={this.onClick} {...other} />;
    }
}

Icon.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            prefix: PropTypes.string.isRequired,
        }).isRequired,
        PropTypes.arrayOf(PropTypes.string.isRequired),
    ]),
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
    icon: null,
};

Icon.displayName = 'Icon';
