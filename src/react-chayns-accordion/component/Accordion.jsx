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
        if (this.props.isOpened || (this.props.className && this.props.className.indexOf('accordion--open') !== -1)) {
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

    componentDidUpdate() {
        if (this.props.autogrow && this.state.isOpened && this._body) {
            this._body.style.setProperty('max-height', 'initial', 'important');
        }

        if (this.accordion && this.props.className && this.props.className.indexOf('accordion--open') !== -1) {
            // this.accordion.classList.add('accordion--open');
            // this.props.defaultOpened = true;
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
        const { badge, right, head } = this.props;

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
                {badge && <div key="badge" className="badge accordion--trigger">{badge}</div>}
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

        if (this.props.autogrow && this._body) {
            this._body.style.maxHeight = null;
        }

        if (this.props.onClose) {
            this.props.onClose(event);
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
            isOpened,
            isWrapped,
            className,
            ellipsis,
            styleBody,
            reference,
            badge,
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

        if (isOpened && !isOpened && this.accordion) {
            this.accordion.classList.remove('accordion--open');
        }

        const classNames = classnames({
            accordion: true,
            'accordion--wrapped': (isWrapped === true),
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
    isOpened: PropTypes.bool,
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
};

Accordion.defaultProps = {
    isOpened: false,
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
};

export default Accordion;
