/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import requestAnimationFrame from '../../utils/requestAnimationFrame';
import Icon from '../../react-chayns-icon/component/Icon';

const CLOSE = 1;

const OPEN = 2;

export default class Accordion extends Component {
    static propTypes = {
        head: PropTypes.node.isRequired,
        children: PropTypes.node.isRequired,
        badge: PropTypes.node,
        right: PropTypes.node,
        renderClosed: PropTypes.bool,
        isWrapped: PropTypes.bool,
        dataGroup: PropTypes.string,
        className: PropTypes.string,
        id: PropTypes.string,
        style: PropTypes.object,
        styleBody: PropTypes.object,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        defaultOpened: PropTypes.bool,
        reference: PropTypes.func,
        autogrow: PropTypes.bool,
        badgeStyle: PropTypes.object,
        open: PropTypes.bool,
        icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
        noRotate: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        dataGroup: null,
        id: null,
        style: null,
        styleBody: null,
        onOpen: null,
        onClose: null,
        defaultOpened: null,
        reference: null,
        isWrapped: false,
        renderClosed: false,
        badge: null,
        right: null,
        autogrow: false,
        badgeStyle: null,
        open: undefined,
        icon: 'ts-angle-right',
        noRotate: false,
    };

    constructor(props) {
        super();

        this.state = {
            currentState: (props && props.defaultOpened) ? OPEN : CLOSE,
        };
    }

    componentWillMount() {
        const { open, className } = this.props;

        if (open || (className && className.indexOf('accordion--open') !== -1)) {
            this.setState({
                currentState: OPEN
            });
        }
    }

    componentDidMount() {
        const { className, autogrow } = this.props;
        const { currentState } = this.state;

        if (className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (currentState === OPEN) {
            if (autogrow && this._body) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== undefined) {
            const { open } = this.props;
            const { currentState } = this.state;

            if (open !== nextProps.open) {
                this.setState({
                    currentState: nextProps.open ? OPEN : CLOSE
                });
            }

            if (nextProps.open && !currentState === OPEN) {
                this.setState({
                    currentState: OPEN
                });
            }

            if (!nextProps.open && !currentState === CLOSE) {
                this.setState({
                    currentState: CLOSE
                });
            }
        }
    }

    componentDidUpdate() {
        const { autogrow } = this.props;
        const { currentState } = this.state;

        if (autogrow && this._body) {
            if (currentState === OPEN) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            } else if (currentState === CLOSE) {
                this._body.style.maxHeight = null;
            }
        }
    }

    handleAccordionClick = (event) => {
        const { currentState } = this.state;
        if (currentState === OPEN) {
            this.accordionCloseListener(event);
        } else {
            this.accordionOpenListener(event);
        }
    };

    _getBody() {
        const { renderClosed, children } = this.props;
        const { currentState } = this.state;

        if (currentState === OPEN || renderClosed) {
            return children;
        }

        return null;
    }

    accordionCloseListener(event) {
        const { onClose, autogrow } = this.props;

        if (autogrow && this._body) {
            this._body.style.setProperty('max-height', '9999px', 'important');
        }

        requestAnimationFrame(() => {
            this.setState({
                currentState: CLOSE
            });

            this._body.style.removeProperty('max-height');
        });

        if (onClose) {
            onClose(event);
        }
    }

    accordionOpenListener(event) {
        const { onOpen } = this.props;

        this.setState({
            currentState: OPEN
        });

        if (onOpen) {
            onOpen(event);
        }
    }

    render() {
        const {
            dataGroup,
            id,
            style,
            isWrapped,
            className,
            styleBody,
            reference,
            icon,
            badge,
            badgeStyle,
            head,
            right,
            noRotate,
        } = this.props;

        const { currentState } = this.state;

        return (
            <div
                className={classNames({
                    accordion: true,
                    'accordion--wrapped': (isWrapped === true),
                    'accordion--open': currentState === OPEN,
                    [className]: className
                })}
                data-group={dataGroup}
                ref={(ref) => {
                    this.accordion = ref;
                    if (reference) reference(ref);
                }}
                id={id}
                style={style}
            >
                <div className="accordion__head" onClick={this.handleAccordionClick}>
                    <div className={classNames('accordion__head__icon', { 'accordion__head__icon--no-rotate': noRotate })}>
                        {
                            chayns.utils.isString(icon) || icon.iconName
                                ? <Icon icon={icon}/>
                                : icon
                        }
                    </div>
                    <div className="accordion__head__title">
                        {head}
                    </div>
                    {
                        right || badge
                            ? (
                                <div className="accordion__head__right">
                                    {
                                        badge
                                            ? (
                                                <div className="badge" style={badgeStyle}>
                                                    {badge}
                                                </div>
                                            )
                                            : right
                                    }
                                </div>
                            )
                            : null
                    }
                </div>
                <div
                    className="accordion__body"
                    ref={(ref) => {
                        this._body = ref;
                    }}
                    style={styleBody}
                >
                    {this._getBody()}
                </div>
            </div>
        );
    }
}
