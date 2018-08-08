import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ScrollViewHelper from './ScrollViewHelper';

export default class ScrollView extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        style: PropTypes.object,
        className: PropTypes.string,
        showScrollbar: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        style: undefined,
        className: undefined,
        showScrollbar: false,
    };

    componentDidMount() {
        this.scrollView = new ScrollViewHelper(this.node, {
            wrapper: this.wrapper,
            content: this.content,
            bar: this.bar,
        });
    }

    componentDidUpdate() {
        if (this.scrollView) {
            this.scrollView.refresh();
        }
    }

    render() {
        const {
            style,
            showScrollbar,
            className,
            children,
        } = this.props;

        const classNames = classnames('cc__scroll-view', {
            'cc__scroll-view--hide': !showScrollbar,
            'cc__scroll-view--mobile': chayns.env.isMobile,
            [className]: className,
        });

        return (
            <div
                ref={(ref) => { this.node = ref; }}
                style={style}
                className={classNames}
            >
                <div
                    className="cc__scroll-view__wrapper"
                    ref={(ref) => { this.wrapper = ref; }}
                >
                    <div
                        style={{
                            maxHeight: (style && style.maxHeight) ? style.maxHeight : undefined,
                            height: (style && style.height) ? style.height : undefined,
                            overflowY: 'scroll',
                        }}
                        className="cc__scroll-view__content"
                        ref={(ref) => { this.content = ref; }}
                    >
                        {children}
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
