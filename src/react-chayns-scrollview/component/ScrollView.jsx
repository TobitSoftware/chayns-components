/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ReactResizeDetector from 'react-resize-detector';

import ScrollViewHelper from './ScrollViewHelper';

export default class ScrollView extends Component {
    constructor(props) {
        super(props);

        this.state = { contentWidth: 0 };
        this.scrollTo = this.scrollTo.bind(this);
        this.setContentWidth = this.setContentWidth.bind(this);
    }

    componentDidMount() {
        const { contentWidth } = this.state;
        this.scrollView = new ScrollViewHelper(this.node, {
            wrapper: this.wrapper,
            content: this.content,
            bar: this.bar,
        });
        if (contentWidth === 0) {
            this.setContentWidth();
        }
    }

    componentDidUpdate() {
        this.handleRefreshScrollView();
    }

    setContentWidth() {
        this.setState({ contentWidth: this.content.getBoundingClientRect().width - this.children.getBoundingClientRect().width + 1 });
    }

    handleRefreshScrollView = () => {
        if (this.scrollView) {
            this.scrollView.refresh();
        }
    };

    scrollTo(...args) {
        if (this.content) {
            this.content.scrollTo(...args);
        }
    }

    render() {
        const {
            style,
            className,
            children,
            scrollElementId,
            scrollElementRef,
            onScroll,
        } = this.props;

        const { contentWidth } = this.state;

        const classNames = classnames('cc__scroll-view', {
            'cc__scroll-view--mobile': chayns.env.isMobile,
            [className]: className,
        });

        return (
            <div
                ref={(ref) => {
                    this.node = ref;
                }}
                style={style}
                className={classNames}
            >
                <div
                    className="cc__scroll-view__wrapper"
                    ref={(ref) => {
                        this.wrapper = ref;
                    }}
                >
                    <div
                        style={{
                            width: `calc( 100% + ${contentWidth}px)`,
                            maxHeight: (style && style.maxHeight) ? style.maxHeight : undefined,
                            height: (style && style.height) ? style.height : undefined,
                            overflowY: 'scroll',
                        }}
                        className="cc__scroll-view__content"
                        ref={(ref) => {
                            this.content = ref;
                            if (scrollElementRef) {
                                scrollElementRef(ref);
                            }
                        }}
                        onScroll={onScroll}
                        id={scrollElementId}
                    >
                        <div className="cc__scroll-view__children" ref={(ref) => { this.children = ref; }}>
                            {children}
                            <ReactResizeDetector handleHeight onResize={this.handleRefreshScrollView}/>
                        </div>
                    </div>
                </div>
                <div
                    className="cc__scroll-view__scrollbar"
                    ref={(ref) => { this.bar = ref; }}
                />
            </div>
        );
    }
}

ScrollView.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    className: PropTypes.string,
    scrollElementId: PropTypes.string,
    scrollElementRef: PropTypes.func,
    onScroll: PropTypes.func,
};

ScrollView.defaultProps = {
    children: null,
    style: undefined,
    className: undefined,
    scrollElementId: undefined,
    scrollElementRef: null,
    onScroll: null,
};
