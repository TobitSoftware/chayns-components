/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ScrollViewHelper from './ScrollViewHelper';

export default class ScrollView extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        style: PropTypes.object,
        className: PropTypes.string,
        showScrollbar: PropTypes.bool,
        scrollElementRef: PropTypes.func,
    };

    static defaultProps = {
        children: null,
        style: undefined,
        className: undefined,
        showScrollbar: false,
        scrollElementRef: null,
    };

    constructor() {
        super();
        this.state = { contentWidth: 0 };
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
        if (this.scrollView) {
            this.scrollView.refresh();
        }
    }

    setContentWidth() {
        this.setState({ contentWidth: this.content.getBoundingClientRect().width - this.children.getBoundingClientRect().width });
    }

    render() {
        const {
            style,
            showScrollbar,
            className,
            children,
            scrollElementRef
        } = this.props;

        const { contentWidth } = this.state;

        const classNames = classnames('cc__scroll-view', {
            'cc__scroll-view--hide': !showScrollbar,
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
                            if(scrollElementRef) {
                                scrollElementRef(ref);
                            }
                        }}
                    >
                        <div className="cc__scroll-view__children" ref={ref => this.children = ref}>
                            {children}
                        </div>
                    </div>
                </div>
                <div
                    className="cc__scroll-view__scrollbar"
                    ref={(ref) => {
                        this.bar = ref;
                    }}
                />
            </div>
        );
    }
}
