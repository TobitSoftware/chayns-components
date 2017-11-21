import React from 'react';
import PropTypes from 'prop-types';

export default class ScrollViewContent extends React.Component {
    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    onScroll = () => {
        this.updateScrollBarPosition();

        this.isScrolling = true;
        window.clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    };

    update() {
        const { scrollTop: propScrollTop, onScrollTopChange } = this.props;

        const lastOffsetHeight = this.dim.offsetHeight;
        const lastScrollHeight = this.dim.scrollHeight;
        const lastOffsetWidth = this.dim.offsetWidth;
        const lastClientWidth = this.dim.clientWidth;

        this.dim.offsetHeight = this.scrollView.offsetHeight;
        this.dim.scrollHeight = this.scrollView.scrollHeight;
        this.dim.offsetWidth = this.scrollView.offsetWidth;
        this.dim.clientWidth = this.scrollView.clientWidth;

        if(!this.isScrolling) {
            if (propScrollTop < 0) {
                onScrollTopChange(0);
            } else if (propScrollTop > this.dim.scrollHeight - this.dim.offsetHeight) {
                onScrollTopChange(this.dim.scrollHeight - this.dim.offsetHeight);
            } else {
                this.scrollView.scrollTop = this.props.scrollTop || 0;
            }
        }

        if(lastOffsetHeight !== this.dim.offsetHeight || lastScrollHeight !== this.dim.scrollHeight) {
            this.updateScrollBarHeight();
        }

        if(lastOffsetWidth !== this.dim.offsetWidth || lastClientWidth !== this.dim.clientWidth) {
            this.updateScrollBarWidth();
        }
    }

    updateScrollBarWidth() {
        const scrollBarWidth = this.scrollView.offsetWidth - this.scrollView.clientWidth;
        this.scrollView.style.width = `calc(100% + ${scrollBarWidth + 2}px)`;
    }

    updateScrollBarHeight() {
        const { onUpdateScrollBar } = this.props;
        const { offsetHeight, scrollHeight } = this.dim;

        const scrollBarHeight =
            (offsetHeight ** 2) / scrollHeight;

        onUpdateScrollBar({
            height: scrollBarHeight,
            hide: (scrollBarHeight === offsetHeight),
            scrollRatio: (offsetHeight / scrollHeight)
        });
    }

    updateScrollBarPosition() {
        const { onUpdateScrollBar, onScrollTopChange } = this.props;

        const scrollTopPosition = this.scrollView.scrollTop / this.scrollView.scrollHeight;
        const scrollArea = this.scrollView.offsetHeight;

        onScrollTopChange(this.scrollView.scrollTop);

        onUpdateScrollBar({
            top: Math.round(scrollTopPosition * scrollArea),
        });
    }

    dim = {};

    render() {
        const { style = {}, children = null } = this.props;

        return(
            <div
                style={{
                    maxHeight: style.maxHeight,
                    height: style.height,
                }}
                className="cc__scroll-view__content"
                onScroll={this.onScroll}
                ref={(ref) => { this.scrollView = ref; }}
            >
                {children}
            </div>
        );
    }
}

ScrollViewContent.propTypes = {
    onScrollTopChange: PropTypes.func.isRequired,
    onUpdateScrollBar: PropTypes.func.isRequired,
    scrollTop: PropTypes.number.isRequired,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ])
};

ScrollViewContent.defaultProps = {
    style: {},
    children: null,
};
