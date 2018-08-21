import React from 'react';
import PropTypes from 'prop-types';

import MonthTable from './MonthTable';

const Month = ({
    title,
    className,
    onDateSelect,
    startDate,
    endDate,
    selected,
    activated,
    highlighted,
    activateAll,
}) => (
    <div className={`month__item ${className || ''}`}>
        <div className="month__title">
            {title || ''}
        </div>
        <MonthTable
            onDateSelect={onDateSelect}
            startDate={startDate}
            endDate={endDate}
            selected={selected}
            activated={activated}
            highlighted={highlighted}
            activateAll={activateAll}
        />
    </div>
);

Month.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    onDateSelect: PropTypes.func.isRequired,
    activateAll: PropTypes.func,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    activated: PropTypes.bool,
    highlighted: PropTypes.bool,
};

Month.defaultProps = {
    title: '',
    className: '',
    selected: null,
    activated: false,
    highlighted: false,
    activateAll: null,
};

export default Month;
