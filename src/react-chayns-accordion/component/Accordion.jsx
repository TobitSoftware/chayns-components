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
        if (this.props.isOpened || this.props.className.indexOf('accordion--open') !== -1) {
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
        }
    }

    componentDidUpdate() {
        if (this.accordion && this.props.className.indexOf('accordion--open') !== -1) {
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

        if (this.props.onClosed != null) {
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

        if (this.props.onClose != null) {
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

        if (this.props.onOpen != null) {
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

        if (this.props.onOpened != null) {
            this.props.onOpened(event);
        }
    }

    render() {
        let dataGroup;
        if (this.props.dataGroup !== '') {
            dataGroup = this.props.dataGroup;
        }

        const others = {};
        if (this.props.id !== '') {
            others.id = this.props.id;
        }

        if (this.props.style) {
            others.style = this.props.style;
        }

        if (this.props.isOpened != null && !this.props.isOpened && this.accordion != null) {
            this.accordion.classList.remove('accordion--open');
        }

        const classNames = classnames({
            accordion: true,
            'accordion--wrapped': (this.props.isWrapped === true),
            [this.props.className]: this.props.className
        });


        const classNamesHead = classnames({
            accordion__head: true,
            ellipsis: this.props.ellipsis
        });

        const othersBody = {};
        if (this.props.styleBody) othersBody.style = this.props.styleBody;


        return (
            <div
                className={classNames}
                data-group={dataGroup}
                ref={(ref) => {
                    this.accordion = ref;
                    if (this.props.reference) this.props.reference(ref);
                }}
                {...others}
            >
                <div className={classNamesHead}>
                    {this._renderHead()}
                </div>
                <div className="accordion__body" {...othersBody}>
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
    reference: PropTypes.func
};

Accordion.defaultProps = {
    isOpened: false,
    className: '',
    dataGroup: '',
    id: '',
    style: null,
    styleBody: null,
    onOpen: null,
    onOpened: null,
    onClose: null,
    onClosed: null,
    ellipsis: false,
    defaultOpened: false,
    reference: null,
    isWrapped: false,
    renderClosed: false,
    badge: null,
    right: null,
};

export default Accordion;
