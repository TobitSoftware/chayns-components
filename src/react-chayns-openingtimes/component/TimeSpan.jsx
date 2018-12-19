import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Icon, Input } from '../../index';

import Day from './Day';

class TimeSpan extends Component {
    static propTypes = {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        buttonType: PropTypes.number.isRequired,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onChange: PropTypes.func
    }

    static defaultProps = {
        disabled: false,
        onAdd: null,
        onRemove: null,
        onChange: null
    }

    constructor(props) {
        super(props);
        this.startTime = createRef();
        this.endTime = createRef();

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { buttonType, onAdd, onRemove } = this.props;
        if (buttonType === Day.ADD && onAdd) onAdd('08:00', '18:00');
        if (buttonType === Day.REMOVE && onRemove) onRemove();
    }

    onChange(_, valid) {
        const { onChange } = this.props;
        if (onChange && valid) {
            onChange(this.startTime.current.value, this.endTime.current.value);
        }
    }

    render() {
        const {
            start,
            end,
            disabled,
            buttonType
        } = this.props;

        return (
            <div className={`${disabled ? 'time--disabled' : 'time--active'} time__span`}>
                <div className="time__span--input">
                    <Input
                        inputRef={this.startTime}
                        placeholder="08:00"
                        value={start}
                        onChange={this.onChange}
                    />
                </div>
                <span>-</span>
                <div className="time__span--input">
                    <Input
                        inputRef={this.endTime}
                        placeholder="18:00"
                        value={end}
                        onChange={this.onChange}
                    />
                </div>
                <div className="time__span--button">
                    {
                        buttonType !== Day.OFF && (
                            <Button
                                className="choosebutton"
                                onClick={this.onClick}
                            >
                                <Icon icon={faPlus} className={`fa-xs openingTimesIcon ${buttonType === Day.ADD ? 'add' : 'remove'}`}/>
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default TimeSpan;
