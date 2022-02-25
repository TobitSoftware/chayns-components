import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const ComboBoxItem = ({ id, value, onSelect, setShowOverlay, shouldStopPropagation }) => {
    const handleClick = useCallback((ev) => {
        onSelect(id);
        setShowOverlay(false);
        if (shouldStopPropagation) {
            ev.stopPropagation();
        }
    }, [id, onSelect, setShowOverlay, shouldStopPropagation]);

    return (
        <div
            key={id}
            id={id}
            className="cc__combo-box__overlay__item ellipsis"
            onClick={handleClick}
        >
            {value}
        </div>
    );
}

ComboBoxItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    onSelect: PropTypes.func.isRequired,
    setShowOverlay: PropTypes.func.isRequired,
    shouldStopPropagation: PropTypes.bool,
};

ComboBoxItem.defaultProps = {
    shouldStopPropagation: false,
};

export default ComboBoxItem;
