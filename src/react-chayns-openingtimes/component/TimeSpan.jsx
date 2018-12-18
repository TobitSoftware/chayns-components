import React from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Icon, Input } from '../../index';

const TimeSpan = ({ start, end, disabled, buttonType }) => (
    <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
        <div className="time__span--input">
            <Input
                placeholder="08:00"
                value={start}
                onChange={(val, valid) => {}}
            />
        </div>
        <span>-</span>
        <div className="time__span--input">
            <Input
                placeholder="18:00"
                value={end}
                onChange={(val, valid) => {}}
            />
        </div>
        <div className="time__span--button">
            {
                buttonType !== 0 && (
                    <Button
                        className="choosebutton"
                        onClick={() => {}}
                    >
                        <Icon icon={faPlus} className={`fa-xs openingTimesIcon ${buttonType === 1 ? 'add' : 'remove'}`}/>
                    </Button>
                )
            }
        </div>

    </div>
);

export default TimeSpan;
