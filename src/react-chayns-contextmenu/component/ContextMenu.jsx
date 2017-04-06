import React from 'react';
import ContextMenuItem from './ContextMenuItem';


const ContextMenu = ({hide, onLayerClick, x, y, items}) => {
    const contextMenuClass = hide ? "context-menu" : "context-menu context-menu--active";
    return (
        <div className={contextMenuClass}>
            <div className="context-menu__page-block" onClick={onLayerClick}></div>
            <div className="context-menu__body" style={{
                position: 'absolute',
                left: x,
                top: y
            }}>
                <ul className="context-menu__item-list">
                    {items.map((item, index) => {
                        return (
                            <ContextMenuItem
                                key={index}
                                iconClassName={item.className}
                                text={item.text}
                                onClick={item.onClick}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
};

ContextMenu.defaultProps = {
    hide: true,
    onLayerClick: () => {},
};

ContextMenu.propTypes = {
    hide: React.PropTypes.bool,
    onLayerClick: React.PropTypes.func,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            className: React.PropTypes.string,
            onClick: React.PropTypes.func,
            text: React.PropTypes.string
        })
    )
};

export default ContextMenu;