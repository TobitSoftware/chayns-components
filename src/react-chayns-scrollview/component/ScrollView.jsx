import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ScrollViewContent from './internal/ScrollViewContent';
import ScrollViewBar from './internal/ScrollViewBar';

export default class ScrollView extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        style: PropTypes.object,
        className: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        style: undefined,
        className: undefined,
    };

    constructor() {
        super();

        this.onScrollStart = this.updateScroll.bind(this, true);
        this.onScrollEnd = this.updateScroll.bind(this, false);
    }

    state = {
        scrollBarTop: 0,
        scrollBarHeight: 0,
        scrollBarHidden: true,
        scrollBarScrollRatio: 0,
        scrollViewTop: 0,
    };

    updateScrollBarHeight = ({ height, hide, top, scrollRatio }) => {
        const { scrollBarHeight, scrollBarHidden, scrollBarTop, scrollBarScrollRatio } = this.state;

        this.setState({
            scrollBarHeight: height || scrollBarHeight,
            scrollBarHidden: (hide !== undefined) ? hide : scrollBarHidden,
            scrollBarTop: top || scrollBarTop,
            scrollBarScrollRatio: scrollRatio || scrollBarScrollRatio,
        });
    };

    updateScrollTop = (scrollTop) => {
        this.setState({
            scrollViewTop: scrollTop,
        });
    };

    updateScroll(enabled) {
        this.setState({
            scrolling: enabled,
        });
    }

    render() {
        const { children, style, className } = this.props;

        const wrapperClassNames = classNames('cc__scroll-view', {
            [className]: className,
            'cc__scroll-view--scroll': this.state.scrolling,
        });

        return(
            <div
                style={style}
                className={wrapperClassNames}
            >
                <ScrollViewContent
                    style={style}
                    scrollTop={this.state.scrollViewTop}
                    onUpdateScrollBar={this.updateScrollBarHeight}
                    onScrollTopChange={this.updateScrollTop}
                >
                    {children}
                </ScrollViewContent>

                <ScrollViewBar
                    top={this.state.scrollBarTop}
                    height={this.state.scrollBarHeight}
                    hidden={this.state.scrollBarHidden}
                    scrollTop={this.state.scrollViewTop}
                    scrollRatio={this.state.scrollBarScrollRatio}
                    onScrollTopChange={this.updateScrollTop}
                    onScrollStart={this.onScrollStart}
                    onScrollEnd={this.onScrollEnd}
                />
            </div>
        );
    }
}
