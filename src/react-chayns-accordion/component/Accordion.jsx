import React from 'react';
import classnames from 'classnames';

export default class Accordion extends React.Component {
    static propTypes = {
        head: React.PropTypes.any.isRequired,
        badge: React.PropTypes.string,
        children: React.PropTypes.any.isRequired,
        renderClosed: React.PropTypes.bool,
        isOpened: React.PropTypes.bool,
        isWrapped: React.PropTypes.bool,
        dataGroup: React.PropTypes.string,
        classNames: React.PropTypes.string,
        id: React.PropTypes.string,
        style: React.PropTypes.object,
        styleBody: React.PropTypes.object,
        onOpen: React.PropTypes.func,
        onOpened: React.PropTypes.func,
        onClose: React.PropTypes.func,
        onClosed: React.PropTypes.func,
        ellipsis: React.PropTypes.bool,
        defaultOpened: React.PropTypes.bool,
        reference: React.PropTypes.func
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
        if((this.props.isOpened != null && this.props.isOpened) || (this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1)) {
            this.setState({
                isOpened: true
            });
        }
    }

    componentDidUpdate() {
        if(this.accordion && this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1) {
            //this.accordion.classList.add('accordion--open');
            //this.props.defaultOpened = true;
        }
    }

    render() {
        let dataGroup;
        if(this.props.dataGroup && this.props.dataGroup != '') {
            dataGroup = this.props.dataGroup;
        }

        let others = {};
        if(this.props.id && this.props.id != '') {
            others.id = this.props.id;
        }

        if(this.props.style) {
            others.style = this.props.style;
        }

        if(this.props.isOpened != null && !this.props.isOpened && this.accordion != null) {
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
        if(this.props.styleBody) othersBody.style = this.props.styleBody;


            return (
                <div className={classNames} data-group={dataGroup}
                     ref={(ref) => { this.accordion = ref; if(this.props.reference) this.props.reference(ref); }} {...others}>
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

        if(this.props.classNames && this.props.classNames.indexOf('accordion--open') != -1) {
            this.accordion.classList.add('accordion--open');
        }

        if(this.props.defaultOpened) {
            this.accordion.classList.add('accordion--open');
        }
    }

    _getBody() {
        if(this.state.isOpen || this.state.isOpened || this.state.isClose || this.props.renderClosed) {
            return this.props.children;
        }

        if(this.props.defaultOpened && this.firstRender) {
            return this.props.children;
        }

        return null;
    }

    _renderHead() {

        if(this.props.badge) {
            let array = [];

            array.push(this.props.head);
            array.push(<div className="right badge accordion--trigger" key="badge">{this.props.badge}</div>);

            return array;
        }

        return this.props.head;
    }

    _accordionClosedListener(event) {
        this.setState({
            isOpened: false,
            isClosed: true,
            isOpen: false,
            isClose: false
        });

        if(this.props.onClosed != null) {
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

        if(this.props.onClose != null) {
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

        if(this.props.onOpen != null) {
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

        if(this.props.onOpened != null) {
            this.props.onOpened(event);
        }
    }
}