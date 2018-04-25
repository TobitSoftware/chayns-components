import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import requestAnimationFrame from '../../utils/requestAnimationFrame';

const CLOSED = 5;
const CLOSE = 1;

const OPENED = 6;
const OPEN = 2;

function hasFlag(value, flag) {
    return !!(value & flag); // eslint-disable-line no-bitwise
}

class Accordion extends React.Component {
    constructor() {
        super();

        this.firstRender = true;

        this.state = {
            currentState: CLOSED
        };
    }

    componentWillMount() {
        const { open, className } = this.props;

        if (open || (className && className.indexOf('accordion--open') !== -1)) {
            this.setState({
                currentState: OPENED
            });
        }
    }

    componentDidMount() {
        const { className, defaultOpened, autogrow } = this.props;

        this.accordion.addEventListener('closed', this.accordionClosedListener.bind(this));
        this.accordion.addEventListener('close', this.accordionCloseListener.bind(this));
        this.accordion.addEventListener('open', this.accordionOpenListener.bind(this));
        this.accordion.addEventListener('opened', this.accordionOpenedListener.bind(this));

        if (className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (defaultOpened) {
            this.accordion.classList.add('accordion--open');

            if(autogrow && this._body) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.open !== undefined) {
            if (this.props.open !== nextProps.open) {
                this.setState({
                    currentState: nextProps.open ? OPENED : CLOSED
                });
            }

            if (nextProps.open && !hasFlag(this.state.currentState, OPEN)) {
                this.setState({
                    currentState: OPENED
                });
            }

            if (!nextProps.open && !hasFlag(this.state.currentState, CLOSE)) {
                this.setState({
                    currentState: CLOSED
                });
            }
        }
    }

    componentDidUpdate() {
        const { autogrow } = this.props;
        const { currentState } = this.state;

        if(autogrow && this._body) {
            if(currentState === OPENED) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            } else if(hasFlag(currentState, CLOSE)) {
                this._body.style.maxHeight = null;
            }
        }
    }

    _getBody() {
        const { renderClosed, defaultOpened, children } = this.props;
        const { currentState } = this.state;

        if (hasFlag(currentState, OPEN) || currentState === CLOSE || renderClosed) {
            return children;
        }

        if (defaultOpened && this.firstRender) {
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

    accordionClosedListener(event) {
        const { onClosed } = this.props;

        this.setState({
            currentState: CLOSED
        });

        if (onClosed) {
            onClosed(event);
        }
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

    accordionOpenedListener(event) {
        const { onOpened } = this.props;

        this.setState({
            currentState: OPENED
        });

        if (onOpened) {
            onOpened(event);
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
            'accordion--open': hasFlag(this.state.currentState, OPEN),
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
                    if (reference) this.props.reference(ref);
                }}
                {...others}
                {...customProps}
            >
                <div className={classNamesHead}>
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
