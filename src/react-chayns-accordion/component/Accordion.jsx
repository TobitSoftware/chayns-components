import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Accordion extends React.Component {
    static propTypes = {
        head: PropTypes.any.isRequired,
        badge: PropTypes.string,
        right: PropTypes.node,
        children: PropTypes.any.isRequired,
        renderClosed: PropTypes.bool,
        isOpened: PropTypes.bool,
        isWrapped: PropTypes.bool,
        dataGroup: PropTypes.string,
        classNames: PropTypes.string,
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

    componentWillReceiveProps() {
        // if(this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1) {
        //     this.setState({
        //         isOpened: true,
        //         isClosed: false,
        //         isOpen: false,
        //         isClose: false
        //     });
        // }
    }

    componentWillMount() {
        if ((this.props.isOpened != null && this.props.isOpened) || (this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1)) {
            this.setState({
                isOpened: true
            });
        }
    }

    componentDidUpdate() {
        if (this.accordion && this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1) {
            //this.accordion.classList.add('accordion--open');
            //this.props.defaultOpened = true;
        }
    }

    render() {
        let dataGroup;
        if (this.props.dataGroup && this.props.dataGroup != '') {
            dataGroup = this.props.dataGroup;
        }

        let others = {};
        if (this.props.id && this.props.id != '') {
            others.id = this.props.id;
        }

        if (this.props.style) {
            others.style = this.props.style;
        }

        if (this.props.isOpened != null && !this.props.isOpened && this.accordion != null) {
            this.accordion.classList.remove('accordion--open');
        }

        let classNames = classnames({
            'accordion': true,
            'accordion--wrapped': (this.props.isWrapped === true),
            [this.props.classNames]: this.props.classNames
        });


        let classNamesHead = classnames({
            "accordion__head": true,
            ellipsis: this.props.ellipsis
        });

        let othersBody = {};
        if (this.props.styleBody) othersBody.style = this.props.styleBody;


        return (
            <div
                className={classNames}
                data-group={dataGroup}
                ref={(ref) => {
                    this.accordion = ref;
                    if (this.props.reference) this.props.reference(ref);
                }} {...others}
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

    componentDidMount() {
        this.accordion.addEventListener('closed', this._accordionClosedListener.bind(this));
        this.accordion.addEventListener('close', this._accordionCloseListener.bind(this));
        this.accordion.addEventListener('open', this._accordionOpenListener.bind(this));
        this.accordion.addEventListener('opened', this._accordionOpenedListener.bind(this));

        if (this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1) {
            this.accordion.classList.add('accordion--open');
        }

        if (this.props.defaultOpened) {
            this.accordion.classList.add('accordion--open');
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
            head,
            <div className="right" style={{ display: 'flex', flexDirection: 'row' }}>
                {right}
                {badge && <div key="badge" className="badge accordion--trigger">
                    {badge}
                </div>}
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
}