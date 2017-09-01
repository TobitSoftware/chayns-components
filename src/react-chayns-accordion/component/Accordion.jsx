import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Accordion extends React.Component {
    constructor() {
        super();

        this.firstRender = true;

        this.state = {
            isOpened: false,
            isClosed: true,
            isOpen: false,
            isClose: false
        };
    }

    componentWillMount() {
        if (this.props.open || (this.props.className && this.props.className.indexOf('accordion--open') !== -1)) {
            this.setState({
                isOpened: true
            });
        }
    }

    componentDidMount() {
        this.accordion.addEventListener('closed', this._accordionClosedListener.bind(this));
        this.accordion.addEventListener('close', this._accordionCloseListener.bind(this));
        this.accordion.addEventListener('open', this._accordionOpenListener.bind(this));
        this.accordion.addEventListener('opened', this._accordionOpenedListener.bind(this));

        if (this.props.className.indexOf('accordion--open') !== -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (this.props.defaultOpened) {
            this.accordion.classList.add('accordion--open');

            if(this.props.autogrow && this._body) {
                this._body.style.setProperty('max-height', 'initial', 'important');
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.open !== nextProps.open || (nextProps.open && (!this.state.isOpened || !this.state.isOpen)) || (!nextProps.open && (!this.state.isClose || !this.state.isClosed))) {
            this.setState({
                isOpened: nextProps.open,
                isClosed: !nextProps.open,
                isClose: false,
                isOpen: false
            });
        }
    }

    componentDidUpdate() {
        if (this.props.autogrow && this.state.isOpened && this._body) {
            this._body.style.setProperty('max-height', 'initial', 'important');
        }

        if (this.props.autogrow && this.state.isClose && this._body) {
            this._body.style.maxHeight = null;
        }
    }

    _getBody() {
        if (this.state.isOpen || this.state.isOpened || this.state.isClose || this.props.renderClosed) {
            return this.props.children;
        }

        if (this.props.defaultOpened && this.firstRender) {
            return this.props.children;
        }

        return null;
    }

    _renderHead() {
        const { badge, badgeStyle, right, head } = this.props;

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
                {badge && <div key="badge" className="badge accordion--trigger" style={badgeStyle}>{badge}</div>}
            </div>
        ];
    }

    _accordionClosedListener(event) {
        this.setState({
            isOpened: false,
            isClosed: true,
            isOpen: false,
            isClose: false
        });

        if (this.props.onClosed) {
            this.props.onClosed(event);
        }
    }

    _accordionCloseListener(event) {
        this.setState({
            isOpened: false,
            isClosed: false,
            isOpen: false,
            isClose: true
        });

        if (this.props.onClose) {
            this.props.onClose(event);
        }

        if (this.props.autogrow && this._body) {
            this._body.style.maxHeight = null;
        }

        this.firstRender = false;
    }

    _accordionOpenListener(event) {
        this.setState({
            isOpened: false,
            isClosed: false,
            isOpen: true,
            isClose: false
        });

        if (this.props.onOpen) {
            this.props.onOpen(event);
        }
    }

    _accordionOpenedListener(event) {
        this.setState({
            isOpened: true,
            isClosed: false,
            isOpen: false,
            isClose: false
        });

        if (this.props.onOpened) {
            this.props.onOpened(event);
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
            'accordion--open': this.state.isOpen || this.state.isOpened,
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
    head: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
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
    open: false,
};

export default Accordion;
