import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requestAnimationFrame from '../../utils/requestAnimationFrame';

const CLOSE = 1;

const OPEN = 2;

function hasFlag(value, flag) {
    return !!(value & flag); // eslint-disable-line no-bitwise
}

class Accordion extends Component {
    constructor(props) {
        super();

        this.firstRender = true;

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
            if(autogrow && this._body) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.open !== undefined) {
            const { open } = this.props;
            const { currentState } = this.state;

            if (open !== nextProps.open) {
                this.setState({
                    currentState: nextProps.open ? OPEN : CLOSE
                });
            }

            if (nextProps.open && !hasFlag(currentState, OPEN)) {
                this.setState({
                    currentState: OPEN
                });
            }

            if (!nextProps.open && !hasFlag(currentState, CLOSE)) {
                this.setState({
                    currentState: CLOSE
                });
            }
        }
    }

    componentDidUpdate() {
        const { autogrow } = this.props;
        const { currentState } = this.state;

        if(autogrow && this._body) {
            if(currentState === OPEN) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            } else if(hasFlag(currentState, CLOSE)) {
                this._body.style.maxHeight = null;
            }
        }
    }

    _getBody() {
        const { renderClosed, children } = this.props;
        const { currentState } = this.state;

        if (hasFlag(currentState, OPEN) || currentState === CLOSE || renderClosed) {
            return children;
        }

        return null;
    }

    _renderHead() {
        const {
            badge,
            badgeStyle,
            right,
            head,
        } = this.props;

        if (!badge && !right) {
            return head;
        }

        return [
            <span
                key="head"
                className="accordion--trigger"
            >
                { head }
            </span>,
            <div
                key="right"
                className="right"
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {right}
                {badge && (
                    <div
                        key="badge"
                        className="badge accordion--trigger"
                        style={badgeStyle}
                    >
                        {badge}
                    </div>
                )}
            </div>
        ];
    }

    handleAccordionClick = (event) => {
        if (this.state.currentState === OPEN) {
            this.accordionCloseListener(event);
        } else {
            this.accordionOpenListener(event);
        }
    };

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

        this.firstRender = false;
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
            ellipsis,
            styleBody,
            reference,
            open,
            badge,
            badgeStyle,
            right,
            head,
            defaultOpened,
            children,
            autogrow,
            renderClosed,
            onOpen,
            onOpened,
            onClose,
            onClosed,
            ...customProps
        } = this.props;

        const { currentState } = this.state;

        const others = {};

        if (id !== '') {
            others.id = id;
        }

        if (style) {
            others.style = style;
        }

        const classNames = classnames({
            accordion: true,
            'accordion--wrapped': (isWrapped === true),
            'accordion--open': hasFlag(currentState, OPEN),
            [className]: className
        });


        const classNamesHead = classnames({
            accordion__head: true,
            ellipsis
        });

        const othersBody = {
            style: {}
        };

        if (styleBody) {
            othersBody.style = styleBody;
        }

        return (
            <div
                className={classNames}
                data-group={dataGroup}
                ref={(ref) => {
                    this.accordion = ref;
                    if (reference) reference(ref);
                }}
                {...others}
                {...customProps}
            >
                <div className={classNamesHead}
                     onClick={this.handleAccordionClick}
                >
                    {this._renderHead()}
                </div>
                <div
                    className="accordion__body"
                    ref={(ref) => { this._body = ref; }}
                    {...othersBody}
                >
                    {this._getBody()}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
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
    onOpened: PropTypes.func,
    onClose: PropTypes.func,
    onClosed: PropTypes.func,
    ellipsis: PropTypes.bool,
    defaultOpened: PropTypes.bool,
    reference: PropTypes.func,
    autogrow: PropTypes.bool,
    badgeStyle: PropTypes.object,
    open: PropTypes.bool,
};

Accordion.defaultProps = {
    className: '',
    dataGroup: null,
    id: null,
    style: null,
    styleBody: null,
    onOpen: null,
    onOpened: null,
    onClose: null,
    onClosed: null,
    ellipsis: false,
    defaultOpened: null,
    reference: null,
    isWrapped: false,
    renderClosed: false,
    badge: null,
    right: null,
    autogrow: false,
    badgeStyle: null,
    open: undefined,
};

export default Accordion;
