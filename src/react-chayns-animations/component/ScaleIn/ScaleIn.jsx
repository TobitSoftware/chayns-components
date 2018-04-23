import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Portal from '../../../react-chayns-portal/component/Portal';

const POSITION_LEFT = 0;
const POSITION_MIDDLE = 1;
const POSITION_RIGHT = 2;
const POSITION_UNKNOWN = POSITION_LEFT;

const ANIMATION_CSS_TIMEOUT = 10;
const ANIMATION_TIME = 300;

let TAPP_MARGIN = 0;

window.onresize = () => {
    TAPP_MARGIN = 0;
    ScaleIn.getTappMargin();
};

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
        if (TAPP_MARGIN) {
            return TAPP_MARGIN;
        }

        const tapp = document.querySelector('.tapp') || document.body;

        if (tapp) {
            const { marginLeft, paddingLeft } = window.getComputedStyle(tapp);

            TAPP_MARGIN = (parseInt(marginLeft, 10) || 0) + (parseInt(paddingLeft, 10) || 0);
        }

        return TAPP_MARGIN || 0;
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

        let position = (left > diffRight) ? POSITION_RIGHT : POSITION_LEFT;

        if (right < (3 / 4) * bodyWidth) {
            const partWidth = (1 / 3) * bodyWidth;
            position = Math.floor(left / partWidth);
        }

        this.setState({
            position,
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
            'cc__animation__scale-in--middle': position === POSITION_MIDDLE,
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
