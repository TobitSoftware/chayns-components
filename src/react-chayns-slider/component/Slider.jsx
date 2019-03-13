import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function preventDefault(e) {
    e.preventDefault();
}

export default class Slider extends PureComponent {
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
        min: 0,
        max: 100,
        step: null,
        defaultValue: 0,
        value: null,
        style: null,
        className: null,
        showLabel: false,
        valueFormatter: (value1, value2) => (value2 ? `${Math.round(value1)} - ${Math.round(value2)}` : Math.round(value1)),
        labelStyle: { minWidth: '50px' },
        onChangeStart: null,
        onChange: null,
        onChangeEnd: null,
        thumbStyle: null,
        disabled: false,
        vertical: false,
        interval: false,
        minInterval: null,
        maxInterval: null,
        defaultStartValue: 0,
        defaultEndValue: 0,
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
            this.leftPercent = (((props.startValue || typeof props.startValue === 'number' ? props.startValue : props.defaultStartValue) - props.min) / (props.max - props.min)) * 100;
            this.rightPercent = (((props.endValue || typeof props.endValue === 'number' ? props.endValue : props.defaultEndValue) - props.min) / (props.max - props.min)) * 100;
            if (props.vertical) {
                const left = this.leftPercent;
                this.leftPercent = 100 - this.rightPercent;
                this.rightPercent = 100 - left;
            }
        } else {
            this.percent = (((props.value || typeof props.value === 'number' ? props.value : props.defaultValue) - props.min) / (props.max - props.min)) * 100;
            if (props.vertical) {
                this.percent = 100 - this.percent;
            }
        }

        this.setDirection();
    }

    componentDidMount() {
        const stepped = this.getSteppedPercents(this);
        this.setElements(stepped);
    }

    componentDidUpdate() {
        const {
            interval, min, max, vertical, startValue, endValue, value
        } = this.props;

        if (value || (startValue && endValue)) {
            if (interval) {
                this.leftPercent = ((startValue - min) / (max - min)) * 100;
                this.rightPercent = ((endValue - min) / (max - min)) * 100;
                if (vertical) {
                    const left = this.leftPercent;
                    this.leftPercent = 100 - this.rightPercent;
                    this.rightPercent = 100 - left;
                }
            } else {
                this.percent = ((value - min) / (max - min)) * 100;
                if (vertical) {
                    this.percent = 100 - this.percent;
                }
            }
            const stepped = this.getSteppedPercents(this);
            this.setElements(stepped);
        }
        this.setDirection();
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

        this.setScrolling(false);

        e.stopPropagation();
    };

    thumbMove = (e) => {
        const {
            minInterval, maxInterval, min, max, onChange, interval, value, startValue, endValue
        } = this.props;

        const width = max - min;
        const minPercent = 0;
        const maxPercent = 100;
        const minIntervalPercent = minInterval ? (minInterval / width) * 100 : 0;
        const maxIntervalPercent = maxInterval ? (maxInterval / width) * 100 : 100;
        const clientX = e.changedTouches ? e.changedTouches[0][this.clientX] : e[this.clientX];

        const newPercent = (((clientX - this.bar.current[this.offsetLeft]) / this.bar.current[this.offsetWidth]) * 100);
        if (interval) {
            if (this.target.classList.contains('cc__slider__bar__thumb--interval-left')) {
                this.leftPercent = newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.rightPercent = this.leftPercent + minIntervalPercent;
                }
                if (maxInterval && this.leftPercent + maxIntervalPercent < this.rightPercent) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (this.target.classList.contains('cc__slider__bar__thumb--interval-right')) {
                this.rightPercent = newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.leftPercent = this.rightPercent - minIntervalPercent;
                }
                if (maxInterval && this.leftPercent + maxIntervalPercent < this.rightPercent) {
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

        this.setScrolling(true);

        this.onChange([onChangeEnd], stepped);
    };

    innerTrackDown = (e) => {
        const { onChangeStart, interval } = this.props;

        if (!interval) return;

        document.addEventListener('mousemove', this.innerTrackMove);
        document.addEventListener('mouseup', this.innerTrackUp);
        document.addEventListener('mouseleave', this.innerTrackUp);

        const stepped = this.getSteppedPercents(this);

        this.setScrolling(false);

        this.onChange([onChangeStart], stepped);

        e.stopPropagation();
    };

    innerTrackMove = (e) => {
        const {
            onChange, value, startValue, endValue
        } = this.props;

        const minPercent = 0;
        const maxPercent = 100;

        let newPercent = this.leftPercent + ((e[this.movementX] / this.bar.current[this.clientWidth]) * 100);

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

        const stepped = this.getSteppedPercents(this);

        this.setScrolling(true);

        this.onChange([onChangeEnd], stepped);
    };

    trackDown = (e) => {
        const {
            maxInterval, min, max, onChange, onChangeStart, onChangeEnd, interval, value, startValue, endValue
        } = this.props;

        const clickPercent = ((e[this.clientX] - this.bar.current[this.offsetLeft]) / this.bar.current[this.clientWidth]) * 100;

        if (interval) {
            const width = max - min;
            const maxIntervalPercent = (maxInterval / width) * 100;
            if (this.leftPercent > clickPercent || (chayns.env.isMobile && this.rightPercent > clickPercent && clickPercent - this.leftPercent < this.rightPercent - clickPercent)) {
                this.leftPercent = clickPercent;
                if (maxInterval && this.rightPercent - this.leftPercent > maxIntervalPercent) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (this.rightPercent < clickPercent || (chayns.env.isMobile && this.leftPercent < clickPercent && clickPercent - this.leftPercent > this.rightPercent - clickPercent)) {
                this.rightPercent = clickPercent;
                if (maxInterval && this.rightPercent - this.leftPercent > maxIntervalPercent) {
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
            valueFormatter, min, max, showLabel, interval, vertical
        } = this.props;
        const { leftPercent, rightPercent, percent } = percents;
        // set elements
        if (vertical) {
            if (interval) {
                this.leftThumb.current.style[this.left] = `${leftPercent}%`;
                this.rightThumb.current.style[this.left] = `${rightPercent}%`;
                this.innerTrack.current.style[this.left] = `${leftPercent}%`;
                this.innerTrack.current.style[this.width] = `${rightPercent - leftPercent}%`;

                // Prevent scrolling on touch-devices
                this.leftThumb.current.addEventListener('touchstart', preventDefault);
                this.rightThumb.current.addEventListener('touchstart', preventDefault);
            } else {
                this.thumb.current.style[this.left] = `${percent}%`;
                this.innerTrack.current.style[this.width] = `${100 - percent}%`;

                // Prevent scrolling on touch-devices
                this.thumb.current.addEventListener('touchstart', preventDefault);
            }
        } else if (interval) {
            this.leftThumb.current.style[this.left] = `${leftPercent}%`;
            this.rightThumb.current.style[this.left] = `${rightPercent}%`;
            this.innerTrack.current.style[this.left] = `${leftPercent}%`;
            this.innerTrack.current.style[this.width] = `${rightPercent - leftPercent}%`;
        } else {
            this.thumb.current.style[this.left] = `${percent}%`;
            this.innerTrack.current.style[this.width] = `${percent}%`;
        }

        if (showLabel && !vertical) {
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
        const {
            min, max, interval, vertical
        } = this.props;
        let { leftPercent, rightPercent, percent } = percents;
        if (vertical) {
            const left = leftPercent;
            leftPercent = 100 - rightPercent;
            rightPercent = 100 - left;
            percent = 100 - percent;
        }
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

    setDirection = () => {
        const { vertical } = this.props;
        if (vertical) {
            this.clientX = 'clientY';
            this.clientWidth = 'clientHeight';
            this.offsetLeft = 'offsetTop';
            this.offsetWidth = 'offsetHeight';
            this.movementX = 'movementY';
            this.left = 'top';
            this.width = 'height';
        } else {
            this.clientX = 'clientX';
            this.clientWidth = 'clientWidth';
            this.offsetLeft = 'offsetLeft';
            this.offsetWidth = 'offsetWidth';
            this.movementX = 'movementX';
            this.left = 'left';
            this.width = 'width';
        }
    };

    setScrolling = (enabled) => {
        chayns.invokeCall({
            action: 204,
            value: {
                enabled
            }
        });
        if (enabled) {
            chayns.allowRefreshScroll();
        } else {
            chayns.disallowRefreshScroll();
        }
    };

    render() {
        const {
            className, style, disabled, labelStyle, thumbStyle, showLabel, interval, trackStyle, innerTrackStyle, vertical
        } = this.props;

        return (
            <div
                className={classNames('cc__slider', {
                    'cc__slider--disabled': disabled,
                    'cc__slider--vertical': vertical
                }, className)}
                style={style}
            >
                {
                    showLabel && !vertical
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
