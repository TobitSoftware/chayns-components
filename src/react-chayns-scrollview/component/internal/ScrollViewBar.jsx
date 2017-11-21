import React from 'react';
import PropTypes from 'prop-types';

export default class ScrollViewBar extends React.Component {
    onMouseDown = (event) => {
        this.lastPageY = event.pageY;

        this.props.onScrollStart();

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        return false;
    };

    onMouseMove = (event) => {
        const delta = event.pageY - this.lastPageY;
        this.lastPageY = event.pageY;

        const scrollTop = this.props.scrollTop + (delta / this.props.scrollRatio);

        this.props.onScrollTopChange(scrollTop);
    };

    onMouseUp = () => {
        this.props.onScrollEnd();

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    };

    render() {
        const { height, hidden, top } = this.props;

        return(
            <div
                className="cc__scroll-view__bar"
                style={{
                    height,
                    display: hidden ? 'none' : 'block',
                    top: `${top}px` || 0,
                }}
                onMouseDown={this.onMouseDown}
            />
        );
    }
}

ScrollViewBar.propTypes = {
    height: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hidden: PropTypes.bool.isRequired,
    scrollRatio: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
    onScrollStart: PropTypes.func.isRequired,
    onScrollEnd: PropTypes.func.isRequired,
    onScrollTopChange: PropTypes.func.isRequired,
};
