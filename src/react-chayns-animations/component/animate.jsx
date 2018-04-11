import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ScaleIn from './ScaleIn/ScaleIn';

const animate = (AnimationComponent, config) => (BaseComponent) => {
    return class AnimateComponent extends Component {
        static propTypes = {
            in: PropTypes.bool,
        };

        static defaultProps = {
            in: true,
        };

        componentDidMount() {
            this.updateRefs();
        }

        componentDidUpdate() {
            this.updateRefs();
        }

        setAnimationListener(animation) {
            this._animation = animation;

            this.updateRefs();
        }

        updateRefs() {
            if (!this._wrapper || !this._animation) {
                return;
            }

            if (this._animation.setWrapperReference) {
                this._animation.setWrapperReference(this._wrapper);
            }
        }

        render() {
            if (AnimationComponent.duplicate) {
                const classNames = classnames('cc__animate', {
                    [AnimationComponent.wrapperClassName]: AnimationComponent.wrapperClassName
                });

                return (
                    <div
                        className={classNames}
                        ref={(ref) => {
                            this._wrapper = ref;
                        }}
                    >
                        <AnimationComponent
                            key="shadow"
                            component={BaseComponent}
                            config={config}
                            in={this.props.in}
                            props={Object.assign({
                                animationClone: true,
                            }, this.props)}
                            animate={this}
                        />
                        <BaseComponent
                            key="base"
                            {...this.props}
                        />
                    </div>
                );
            }

            return (
                <AnimationComponent
                    key="shadow"
                    component={BaseComponent}
                    config={config}
                    in={this.props.in}
                    props={this.props}
                    animate={this}
                />
            );
        }
    };
};


export {
    ScaleIn as SCALE_IN,
};

export default animate;
