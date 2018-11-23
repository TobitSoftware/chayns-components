import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Icon = ({ icon, highlightEffect, isTsIcon, rotation, title, disabled, fadeLeft, hidden, classes, textAlign, onClick, bright, width, height, float, fontSize, isStatic, isMobile, isActive, noPointer, color }) => {
    const className = classNames(`icon ${isTsIcon ? `icon-ts icon-ts-${icon}` : `icon-${icon}`} ${classes ? classes : ''}`, {
        'icon--highlight-pulse': highlightEffect === 'pulse',
        'icon--highlight-shake': highlightEffect === 'shake',
        'icon--float-right': float === 'right',
        'icon--float-left': float === 'left',
        'icon--no-pointer': noPointer,
        'icon--fade-left': fadeLeft,
        'icon--disabled': disabled,
        'icon--mobile': isMobile,
        'icon--static': isStatic,
        'icon--active': isActive,
        'icon--hidden': hidden,
        'icon--bright': bright
    });

    const style = {};

    if (width) style.width = `${width}px`;

    if (height) style.height = `${height}px`;

    if (fontSize) style.fontSize = fontSize;

    if (textAlign) style.textAlign = textAlign;

    if (color) style.color = color;

    if (rotation) style.transform = `rotate(${rotation}deg)`;

    if (fadeLeft) {
        if (width) {
            style.marginLeft = `-${width}px`;
        } else {
            style.marginLeft = '-100%';
        }
    }

    return (
        <i
            onClick={!disabled ? onClick : null}
            className={className}
            style={style}
            title={title}
        />
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    highlightEffect: PropTypes.string,
    textAlign: PropTypes.string,
    fontSize: PropTypes.string,
    rotation: PropTypes.number,
    noPointer: PropTypes.bool,
    classes: PropTypes.string,
    isTsIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    fadeLeft: PropTypes.bool,
    isStatic: PropTypes.bool,
    isMobile: PropTypes.bool,
    isActive: PropTypes.bool,
    height: PropTypes.number,
    color: PropTypes.string,
    width: PropTypes.number,
    float: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    bright: PropTypes.bool,
    hidden: PropTypes.bool
};

export default Icon;
