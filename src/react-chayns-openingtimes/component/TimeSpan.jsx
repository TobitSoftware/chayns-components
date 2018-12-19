import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Icon, Input } from '../../index';

class TimeSpan extends Component {
    constructor(props) {
        super(props);
        this.startTime = createRef();
        this.endTime = createRef();
    }

    render() {
        const {
            start,
            end,
            disabled,
            buttonType,
            onAdd,
            onRemove,
            onChange
        } = this.props;

        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
                <div className="time__span--input">
                    <Input
                        inputRef={this.startTime}
                        placeholder="08:00"
                        value={start}
                        onChange={(val, valid) => {
                            onChange(val, this.endTime.current.value);
                        }}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        inputRef={this.endTime}
                        placeholder="18:00"
                        value={end}
                        onChange={(val, valid) => {
                            onChange(this.startTime.current.value, val);
                        }}
                    />
                </div>
                <div className="time__span--button">
                    {
                        buttonType !== 0 && (
                            <Button
                                className="choosebutton"
                                onClick={() => {
                                    if (buttonType === 1) onAdd('08:00', '18:00');
                                    if (buttonType === 2) onRemove();
                                }}
                            >
                                <Icon icon={faPlus} className={`fa-xs openingTimesIcon ${buttonType === 1 ? 'add' : 'remove'}`}/>
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default TimeSpan;
