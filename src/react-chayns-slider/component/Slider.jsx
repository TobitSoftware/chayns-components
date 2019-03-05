import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Slider extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
        showLabel: PropTypes.bool,
        valueFormatter: PropTypes.func,
        labelStyle: PropTypes.object,
        onChangeStart: PropTypes.func,
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        thumbStyle: PropTypes.object,
        disabled: PropTypes.bool,
        vertical: PropTypes.bool,
        interval: PropTypes.bool,
        minInterval: PropTypes.number,
        maxInterval: PropTypes.number,
        defaultStartValue: PropTypes.number,
        defaultEndValue: PropTypes.number,
        startValue: PropTypes.number,
        endValue: PropTypes.number,
        trackStyle: PropTypes.object,
        innerTrackStyle: PropTypes.object,
    };

    static defaultProps = {
        min: 100,
        max: 1000,
        step: 20,
        defaultValue: 100,
        value: null,
        style: null,
        className: null,
        showLabel: false,
        valueFormatter: (value1, value2) => (value2 ? `${Math.round(value1)} - ${Math.round(value2)}` : Math.round(value1)),
        labelStyle: { minWidth: '60px' },
        onChangeStart: null,
        onChange: null,
        onChangeEnd: null,
        thumbStyle: null,
        disabled: false,
        vertical: false,
        interval: false,
        minInterval: 50,
        maxInterval: 500,
        defaultStartValue: 250,
        defaultEndValue: 750,
        startValue: null,
        endValue: null,
        trackStyle: null,
        innerTrackStyle: null,
    };

    constructor(props) {
        super(props);

        this.bar = React.createRef();
        this.innerTrack = React.createRef();
        this.leftThumb = React.createRef();
        this.rightThumb = React.createRef();
        this.label = React.createRef();
        this.thumb = React.createRef();

        this.target = null;
        if (props.interval) {
            this.leftPercent = ((props.defaultStartValue - props.min) / (props.max - props.min)) * 100;
            this.rightPercent = ((props.defaultEndValue - props.min) / (props.max - props.min)) * 100;
        } else {
            this.percent = ((props.defaultValue - props.min) / (props.max - props.min)) * 100;
        }
    }

    componentDidMount() {
        const stepped = this.getSteppedPercents(this);
        this.setElements(stepped);
    }

    componentDidUpdate() {
        const {
            value, startValue, endValue, interval, min, max
        } = this.props;

        if (value || (startValue && endValue)) {
            if (interval) {
                this.leftPercent = ((startValue - min) / (max - min)) * 100;
                this.rightPercent = ((endValue - min) / (max - min)) * 100;
            } else {
                this.percent = ((value - min) / (max - min)) * 100;
            }
            const stepped = this.getSteppedPercents(this);
            this.setElements(stepped);
        }
    }

    thumbDown = (e) => {
        const { onChangeStart } = this.props;
        this.target = e.target;
        const stepped = this.getSteppedPercents(this);
        this.onChange([onChangeStart], stepped);

        document.addEventListener('mousemove', this.thumbMove);
        document.addEventListener('mouseup', this.thumbUp);
        document.addEventListener('mouseleave', this.thumbUp);
        document.addEventListener('touchmove', this.thumbMove);
        document.addEventListener('touchend', this.thumbUp);
        document.addEventListener('touchcancel', this.thumbUp);

        e.stopPropagation();
    };

    thumbMove = (e) => {
        const {
            minInterval, maxInterval, min, max, onChange, interval, value, startValue, endValue
        } = this.props;

        const width = max - min;
        const minPercent = 0;
        const maxPercent = 100;
        const minIntervalPercent = (minInterval / width) * 100;
        const maxIntervalPercent = (maxInterval / width) * 100;
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

        const newPercent = (((clientX - this.bar.current.offsetLeft) / this.bar.current.offsetWidth) * 100);
        if (interval) {
            if (this.target.classList.contains('cc__slider__bar__thumb--interval-left')) {
                this.leftPercent = newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.rightPercent = this.leftPercent + minIntervalPercent;
                }
                if (this.leftPercent + maxIntervalPercent < this.rightPercent) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (this.target.classList.contains('cc__slider__bar__thumb--interval-right')) {
                this.rightPercent = newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.leftPercent = this.rightPercent - minIntervalPercent;
                }
                if (this.leftPercent + maxIntervalPercent < this.rightPercent) {
                    this.leftPercent = this.rightPercent - maxIntervalPercent;
                }
            }
            // prevent out of range
            if (this.leftPercent < minPercent) {
                // this.rightPercent = this.rightPercent + (minPercent - this.leftPercent); // TODO
                this.leftPercent = minPercent;
            }
            if (this.leftPercent > maxPercent - minIntervalPercent) {
                this.leftPercent = maxPercent - minIntervalPercent;
            }
            if (this.rightPercent < minPercent + minIntervalPercent) {
                this.rightPercent = minPercent + minIntervalPercent;
            }
            if (this.rightPercent > maxPercent) {
                // this.leftPercent = this.leftPercent - (this.rightPercent - maxPercent);// TODO
                this.rightPercent = maxPercent;
            }
        } else {
            this.percent = newPercent;
            if (newPercent < minPercent) {
                this.percent = minPercent;
            } else if (newPercent > maxPercent) {
                this.percent = maxPercent;
            }
        }

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange], stepped);
        e.stopPropagation();
    };

    thumbUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.thumbMove);
        document.removeEventListener('mouseup', this.thumbUp);
        document.removeEventListener('mouseleave', this.thumbUp);
        document.removeEventListener('touchmove', this.thumbMove);
        document.removeEventListener('touchend', this.thumbUp);
        document.removeEventListener('touchcancel', this.thumbUp);
        this.target = null;
        const stepped = this.getSteppedPercents(this);
        this.onChange([onChangeEnd], stepped);
    };

    innerTrackDown = (e) => {
        const { onChangeStart, interval } = this.props;

        if (!interval) return;

        document.addEventListener('mousemove', this.innerTrackMove);
        document.addEventListener('mouseup', this.innerTrackUp);
        document.addEventListener('mouseleave', this.innerTrackUp);
        document.addEventListener('touchmove', this.innerTrackMove);
        document.addEventListener('touchend', this.innerTrackUp);
        document.addEventListener('touchcancel', this.innerTrackUp);

        const stepped = this.getSteppedPercents(this);
        this.onChange([onChangeStart], stepped);

        e.stopPropagation();
    };

    innerTrackMove = (e) => {
        const {
            onChange, value, startValue, endValue
        } = this.props;

        const minPercent = 0;
        const maxPercent = 100;

        let newPercent = this.leftPercent + ((e.movementX / this.bar.current.clientWidth) * 100);

        if (newPercent < minPercent) {
            newPercent = minPercent;
        }
        if (newPercent > maxPercent - (this.rightPercent - this.leftPercent)) {
            newPercent = maxPercent - (this.rightPercent - this.leftPercent);
        }
        this.rightPercent = this.rightPercent - this.leftPercent + newPercent;
        this.leftPercent = newPercent;

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange], stepped);
        
        e.stopPropagation();
    };

    innerTrackUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.innerTrackMove);
        document.removeEventListener('mouseup', this.innerTrackUp);
        document.removeEventListener('mouseleave', this.innerTrackUp);
        document.removeEventListener('touchmove', this.innerTrackMove);
        document.removeEventListener('touchend', this.innerTrackUp);
        document.removeEventListener('touchcancel', this.innerTrackUp);

        const stepped = this.getSteppedPercents(this);

        this.onChange([onChangeEnd], stepped);
    };

    trackDown = (e) => {
        const {
            maxInterval, min, max, onChange, onChangeStart, onChangeEnd, interval, value, startValue, endValue
        } = this.props;

        const clickPercent = ((e.clientX - this.bar.current.offsetLeft) / this.bar.current.clientWidth) * 100;

        if (interval) {
            const width = max - min;
            const maxIntervalPercent = (maxInterval / width) * 100;
            if (this.leftPercent > clickPercent) {
                this.leftPercent = clickPercent;
                if (this.rightPercent - this.leftPercent > maxIntervalPercent) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (this.rightPercent < clickPercent) {
                this.rightPercent = clickPercent;
                if (this.rightPercent - this.leftPercent > maxIntervalPercent) {
                    this.leftPercent = this.rightPercent - maxIntervalPercent;
                }
            }
        } else {
            this.percent = clickPercent;
        }

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange, onChangeStart, onChangeEnd], stepped);

        e.stopPropagation();
    };

    setElements = (percents) => {
        const {
            valueFormatter, min, max, showLabel, interval
        } = this.props;
        const { leftPercent, rightPercent, percent } = percents;
        // set elements
        if (interval) {
            this.leftThumb.current.style.left = `${leftPercent}%`;
            this.rightThumb.current.style.left = `${rightPercent}%`;
            this.innerTrack.current.style.left = `${leftPercent}%`;
            this.innerTrack.current.style.width = `${rightPercent - leftPercent}%`;
        } else {
            this.thumb.current.style.left = `${percent}%`;
            this.innerTrack.current.style.width = `${percent}%`;
        }

        if (showLabel) {
            const realInterval = max - min;
            if (interval) {
                const left = min + (realInterval * leftPercent / 100);
                const right = min + (realInterval * rightPercent / 100);
                this.label.current.innerText = valueFormatter(left, right);
            } else {
                const value = min + (realInterval * percent / 100);
                this.label.current.innerText = valueFormatter(value);
            }
        }
    };

    getSteppedPercents = (percents) => {
        const {
            min, max, step, interval
        } = this.props;
        let { leftPercent, rightPercent, percent } = percents;
        // set to steps
        if (step) {
            const width = max - min;
            const stepPercent = 100 / (width / step);
            if (interval) {
                const left = leftPercent % stepPercent;
                leftPercent -= (left < stepPercent / 2) ? left : left - stepPercent;
                const right = rightPercent % stepPercent;
                rightPercent -= (right < stepPercent / 2) ? right : right - stepPercent;
                return { leftPercent, rightPercent };
            }
            const thumb = percent % stepPercent;
            percent -= (thumb < stepPercent / 2) ? thumb : thumb - stepPercent;
            return { percent };
        }
        return percents;
    };

    onChange = (listeners, percents) => {
        const { min, max, interval } = this.props;
        const { leftPercent, rightPercent, percent } = percents;
        const realInterval = max - min;
        if (interval) {
            const left = min + (realInterval * leftPercent / 100);
            const right = min + (realInterval * rightPercent / 100);
            listeners.forEach((l) => {
                if (l) l(left, right);
            });
        } else {
            const value = min + (realInterval * percent / 100);
            listeners.forEach((l) => {
                if (l) l(value);
            });
        }
    };

    render() {
        const {
            className, style, disabled, labelStyle, thumbStyle, showLabel, interval, trackStyle, innerTrackStyle
        } = this.props;

        return (
            <div className={classNames('cc__slider', { 'cc__slider--disabled': disabled }, className)} style={style}>
                {
                    showLabel
                        ? <div className="cc__slider__label" ref={this.label} style={labelStyle}/>
                        : null
                }
                <div
                    className="cc__slider__bar"
                    ref={this.bar}
                >
                    <div className="cc__slider__bar__track" onClick={this.trackDown} style={trackStyle}>
                        <div
                            className="cc__slider__bar__track__inner"
                            onMouseDown={this.innerTrackDown}
                            onTouchStart={this.innerTrackDown}
                            ref={this.innerTrack}
                            style={{ ...innerTrackStyle, ...(interval ? { left: 0 } : null) }}
                        />
                    </div>
                    {
                        interval
                            ? [
                                <div
                                    key="left"
                                    className="cc__slider__bar__thumb cc__slider__bar__thumb--interval-left"
                                    onMouseDown={this.thumbDown}
                                    onTouchStart={this.thumbDown}
                                    ref={this.leftThumb}
                                    style={thumbStyle && thumbStyle.left}
                                >
                                    <div className="cc__slider__bar__thumb__dot"/>
                                </div>,
                                <div
                                    key="right"
                                    className="cc__slider__bar__thumb cc__slider__bar__thumb--interval-right"
                                    onMouseDown={this.thumbDown}
                                    onTouchStart={this.thumbDown}
                                    ref={this.rightThumb}
                                    style={thumbStyle && thumbStyle.right}
                                >
                                    <div className="cc__slider__bar__thumb__dot"/>
                                </div>
                            ]
                            : (
                                <div
                                    className="cc__slider__bar__thumb cc__slider__bar__thumb--interval-left"
                                    onMouseDown={this.thumbDown}
                                    onTouchStart={this.thumbDown}
                                    ref={this.thumb}
                                    style={thumbStyle}
                                >
                                    <div className="cc__slider__bar__thumb__dot"/>
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}
