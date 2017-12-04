import React from 'react';
import PropTypes from 'prop-types';

import ContextMenuItem from './ContextMenuItem';

const ContextMenu = ({ hide, onLayerClick, x, y, items }) => {
    const contextMenuClass = hide ? 'context-menu' : 'context-menu context-menu--active';

    return (
        <div className={contextMenuClass}>
            <div
                className="context-menu__page-block"
                onClick={onLayerClick}
            />
            <div
                className="context-menu__body"
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    overflowY: 'scroll'
                }}
            >
                <ul className="context-menu__item-list">
                    {items.map((item, index) => {
                        return (
                            <ContextMenuItem
                                key={`${item.className}-${index.text}`}
                                iconClassName={item.className}
                                text={item.text}
                                onClick={item.onClick}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

ContextMenu.defaultProps = {
    hide: true,
    onLayerClick: () => {},
    x: undefined,
    y: undefined,
    items: [],
};

ContextMenu.propTypes = {
    hide: PropTypes.bool,
    onLayerClick: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.string
        })
    )
};

export default ContextMenu;
