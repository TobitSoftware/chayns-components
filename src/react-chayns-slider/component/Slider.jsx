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
        showValue: PropTypes.bool,
        valueFormatter: PropTypes.func,
        sliderSize: PropTypes.number,
        onChangeStart: PropTypes.func,
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        thumbStyle: PropTypes.object,
        disabled: PropTypes.bool,
        vertical: PropTypes.bool,
        minRange: PropTypes.number,
        maxRange: PropTypes.number,
        defaultStartValue: PropTypes.number,
        defaultEndValue: PropTypes.number,
        startValue: PropTypes.number,
        endValue: PropTypes.number,
    };

    static defaultProps = {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,
        value: null,
        style: null,
        className: null,
        showValue: false,
        valueFormatter: value => value,
        sliderSize: null,
        onChangeStart: null,
        onChange: null,
        onChangeEnd: null,
        thumbStyle: null,
        disabled: false,
        vertical: false,
        minRange: 0,
        maxRange: 0,
        defaultStartValue: 0,
        defaultEndValue: 100,
        startValue: null,
        endValue: null,
    };

    constructor(props) {
        super(props);
        this.target = null;
        this.bar = React.createRef();
        this.innerTrack = React.createRef();
    }

    mouseDown = (e) => {
        this.target = e.target;
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('mouseleave', this.mouseUp);
        e.stopPropagation();
    };

    mouseMove = (e) => {
        const leftPercent = parseFloat(this.target.style.left.replace('%', '')) || 0;
        console.log(e.clientX, this.bar)
        const newPercent = ((e.clientX - this.bar.current.clientX) / this.bar.current.clientWidth) * 100;
        // const movementPercent = (e.movementX / this.bar.current.clientWidth) * 100;
        // const newPercent = leftPercent + movementPercent;
        if (newPercent >= 0 && newPercent <= 100) {
            this.target.style.left = `${newPercent}%`;
            this.innerTrack.current.style.left = `${newPercent}%`;
        }

        e.stopPropagation();
    };

    mouseUp = () => {
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseleave', this.mouseMove);
        this.target = null;
    };

    render() {
        const { className, style, disabled } = this.props;

        return (
            <div className={classNames('cc__slider', { 'cc__slider--disabled': disabled }, className)} style={style}>
                <div className="cc__slider__text">


                    33%
                </div>
                <div className="cc__slider__bar" ref={this.bar}>
                    <div className="cc__slider__bar__track">
                        <div
                            className="cc__slider__bar__track__inner"
                            style={{ left: '40%', width: '40%' }}
                            ref={this.innerTrack}
                        />
                    </div>
                    <div
                        className="cc__slider__bar__thumb"
                        style={{ left: '40%' }}
                        onMouseDown={this.mouseDown}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                    <div
                        className="cc__slider__bar__thumb"
                        style={{ left: '80%' }}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                </div>
            </div>
        );
    }
}
