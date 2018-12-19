import React from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import './styles.scss';

const weekdays = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
];

const OpeningTimes = ({ times, onDayActivation, onAdd, onRemove, onChange }) => (
    <div style={{
        margin: '10px 25px 15px 25px'
    }}
    >
        {
            weekdays.map((day, index) => (
                <Day
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    weekday={{
                        name: day,
                        number: index
                    }}
                    times={times.filter(t => t.weekDay === index)}
                    onDayActivation={onDayActivation}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onChange={onChange}
                />
            ))
        }
    </div>
);

OpeningTimes.propTypes = {
    times: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    })).isRequired,
    onDayActivation: PropTypes.func.isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onChange: PropTypes.func
};

OpeningTimes.defaultProps = {
    onAdd: null,
    onRemove: null,
    onChange: null
};

export default OpeningTimes;
