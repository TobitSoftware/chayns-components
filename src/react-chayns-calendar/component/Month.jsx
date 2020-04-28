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
    onDateSelect: PropTypes.func,
    activateAll: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    activated: PropTypes.arrayOf(Date),
    highlighted: PropTypes.oneOfType([
        PropTypes.shape({
            dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
            style: PropTypes.shape({
                color: PropTypes.string,
                backgroundColor: PropTypes.string,
            }),
        }),
        PropTypes.arrayOf(PropTypes.shape({
            dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
            style: PropTypes.shape({
                color: PropTypes.string,
                backgroundColor: PropTypes.string,
            }),
        })),
    ]),
};

Month.defaultProps = {
    title: '',
    className: '',
    selected: null,
    activated: null,
    startDate: null,
    endDate: null,
    highlighted: false,
    activateAll: true,
    onDateSelect: null,
};

Month.displayName = 'Month';

export default Month;
