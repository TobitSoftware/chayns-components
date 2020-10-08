import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import isDescendant from '../../utils/isDescendant';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import { isFunction } from '../../utils/is';
import Input from '../../react-chayns-input/component/Input';

export default class InputBox extends Component {
    references = {
        box: null,
        wrapper: null,
    };

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setRef.bind(this, 'wrapper');
        this.setBoxRef = this.setBoxRef.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.blur = this.blur.bind(this);
        this.focus = this.focus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            hidden: true,
            position: null,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleBlur);
        document.addEventListener('touchstart', this.handleBlur);

        window.addEventListener('blur', this.blur);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleBlur);
        document.removeEventListener('touchstart', this.handleBlur);

        window.removeEventListener('blur', this.blur);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    setRef(name, ref) {
        this.references[name] = ref;
    }

    setBoxRef(ref) {
        const { overlayProps } = this.props;

        this.references.box = ref;

        if (overlayProps && overlayProps.ref) {
            overlayProps.ref(ref);
        }
    }

    handleBlur(e) {
        const { hidden } = this.state;
        const { onBlur } = this.props;
        if (hidden) {
            return;
        }

        if (
            e.target === this.references.wrapper ||
            e.target === this.references.box
        ) {
            return;
        }

        if (
            isDescendant(this.references.wrapper, e.target) ||
            isDescendant(this.references.box, e.target)
        ) {
            return;
        }

        this.setState({
            hidden: true,
        });

        if (onBlur && isFunction(onBlur)) {
            onBlur(e);
        }
    }

    blur() {
        this.setState({
            hidden: true,
        });
    }

    async handleFocus(e) {
        const { onFocus } = this.props;

        await this.updatePosition();

        this.setState({
            hidden: false,
        });

        if (onFocus) {
            return onFocus(e);
        }

        return null;
    }

    focus() {
        this.setState({
            hidden: false,
        });
    }

    handleKeyDown({ keyCode, target }) {
        if (keyCode === 9 && isDescendant(this.references.wrapper, target)) {
            this.blur();
        }
    }

    async updatePosition() {
        let { parent } = this.props;
        parent =
            parent ||
            document.getElementsByClassName('tapp')[0] ||
            document.body;
        const parentRect = parent.getBoundingClientRect();

        if (!this.references.wrapper) {
            this.setState({
                position: null,
            });
            return;
        }

        const rect = this.references.wrapper.getBoundingClientRect();
        let { bottom } = rect;

        if (chayns.env.isApp) {
            const { pageYOffset } = await chayns.getWindowMetrics();
            bottom += pageYOffset;
        } else {
            bottom -= parentRect.top;
        }

        this.setState({
            position: {
                width: rect.width,
                left: rect.left - parentRect.left,
                bottom,
            },
        });
    }

    render() {
        const {
            inputComponent: InputComponent,
            children,
            parent,
            inputRef,
            onFocus,
            className,
            overlayProps,
            boxClassName,
            style,
            ...props
        } = this.props;
        const { hidden, position } = this.state;

        if (!InputComponent) {
            return null;
        }

        return (
            <div
                style={{
                    display: 'inline-block',
                    ...style,
                }}
                className={classnames('cc__input-box', className)}
                ref={this.setWrapperRef}
            >
                <InputComponent
                    {...props}
                    ref={inputRef}
                    onFocus={this.handleFocus}
                />
                <TappPortal parent={parent}>
                    {!!(position && !hidden && children) && (
                        <div
                            onClick={(e) => e.preventDefault()}
                            className={classnames(
                                'cc__input-box__overlay',
                                'scrollbar',
                                boxClassName
                            )}
                            style={
                                position
                                    ? {
                                          width: `${position.width}px`,
                                          top: `${position.bottom}px`,
                                          left: `${position.left}px`,
                                      }
                                    : null
                            }
                            {...overlayProps}
                            ref={this.setBoxRef}
                        >
                            {children}
                        </div>
                    )}
                </TappPortal>
            </div>
        );
    }
}

InputBox.propTypes = {
    onBlur: PropTypes.func,
    inputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},
    onFocus: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    className: PropTypes.string,
    boxClassName: PropTypes.string,
    inputRef: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    overlayProps: PropTypes.object,
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
};

InputBox.defaultProps = {
    onBlur: null,
    inputComponent: Input,
    parent: null,
    onFocus: null,
    children: null,
    className: null,
    boxClassName: null,
    inputRef: null,
    overlayProps: null,
    style: null,
};

InputBox.displayName = 'InputBox';
