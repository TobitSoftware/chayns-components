/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const ContextMenuItem = ({ iconClassName, onClick, text }) => {
    return (
        <li className="context-menu__item" onClick={onClick}>
            <i className={iconClassName}/>
            <span className="context-menu__item-text">
                {text}
            </span>
        </li>
    );
};

ContextMenuItem.defaultProps = {
    iconClassName: '',
    onClick: () => {},
    text: ''
};

ContextMenuItem.propTypes = {
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};

export default ContextMenuItem;
