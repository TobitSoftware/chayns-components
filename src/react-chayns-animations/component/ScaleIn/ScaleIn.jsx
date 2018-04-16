import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Portal from '../../../react-chayns-portal/component/Portal';

const POSITION_LEFT = 0;
const POSITION_RIGHT = 1;
const POSITION_UNKNOWN = POSITION_LEFT;

const ANIMATION_CSS_TIMEOUT = 10;
const ANIMATION_TIME = 300;

class ScaleIn extends Component {
    static propTypes = {
        props: PropTypes.object.isRequired,
        component: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]).isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        animate: PropTypes.any.isRequired,
        in: PropTypes.bool.isRequired,
    };

    static getTappMargin() {
        const tapp = document.querySelector('.tapp') || document.body;

        if (tapp) {
            const { marginLeft, paddingLeft } = window.getComputedStyle(tapp);

            return (parseInt(marginLeft, 10) || 0) + (parseInt(paddingLeft, 10) || 0);
        }

        return 0;
    }

    state = {
        position: POSITION_UNKNOWN,
        show: false,
        animationActive: false,
    };

    componentDidMount() {
        this.props.animate.setAnimationListener(this);

        if (this.props.in) {
            this.show();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.in !== this.props.in) {
            if(nextProps.in) {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    setWrapperReference(ref) {
        this.updateClasses(ref);
    }

    show() {
        this.setState({
            render: true,
        });

        window.setTimeout(() => {
            this.setState({
                show: true,
                animationActive: true
            });

            window.setTimeout(() => {
                this.setState({
                    animationActive: false,
                });
            }, ANIMATION_TIME);
        }, ANIMATION_CSS_TIMEOUT);
    }

    hide() {
        window.setTimeout(() => {
            this.setState({
                show: false,
                animationActive: true,
            });

            window.setTimeout(() => {
                this.setState({
                    render: false,
                    animationActive: false,
                });
            }, ANIMATION_TIME);
        }, ANIMATION_CSS_TIMEOUT);
    }

    updateClasses(wrapper) {
        const bodyWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const { left, right, top: wrapperTop } = wrapper.getBoundingClientRect();

        const diffRight = bodyWidth - right;

        let top = wrapperTop;
        if (chayns.env.isApp) {
            const { body, documentElement } = document;

            if (body.scrollTop) {
                top += body.scrollTop;
            } else if (documentElement.scrollTop) {
                top += documentElement.scrollTop;
            }
        }

        this.setState({
            position: (left < diffRight) ? POSITION_LEFT : POSITION_RIGHT,
            top,
        });
    }

    render() {
        const { props, component: BaseComponent } = this.props;
        const {
            animationActive,
            top,
            render,
            show,
            position,
        } = this.state;

        const classNames = classnames('cc__animation__scale-in', {
            'cc__animation__scale-in--left': position === POSITION_LEFT,
            'cc__animation__scale-in--right': position === POSITION_RIGHT,
            'cc__animation__scale-in--show': show,
        });

        if (!render) {
            return null;
        }

        const tappMargin = ScaleIn.getTappMargin();

        return (
            <Portal name="scale-in">
                <div
                    className={classNames}
                    style={{
                        top: `${top}px`,
                        left: `${tappMargin}px`,
                        width: `calc(100% - ${2 * tappMargin}px)`
                    }}
                >
                    <BaseComponent
                        {...props}
                        animationActive={animationActive}
                    />
                </div>
            </Portal>
        );
    }
}

ScaleIn.duplicate = true;
ScaleIn.wrapperClassName = 'cc__animate--scale-in';

export default ScaleIn;
