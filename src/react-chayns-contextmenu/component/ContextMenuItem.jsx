import React from 'react';


const ContextMenuItem = ({iconClassName, onClick, text}) => {
    return (
        <li className="context-menu__item" onClick={onClick}>
            <i className={iconClassName}/>
            <span className="context-menu__item-text">{text}</span>
        </li>
    )
};

ContextMenuItem.defaultProps = {
    iconClassName: '',
    onClick: () => {},
    text: ''
};

ContextMenuItem.propTypes = {
    iconClassName: React.PropTypes.string,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string
};

export default ContextMenuItem;