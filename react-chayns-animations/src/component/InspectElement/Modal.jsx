import React from 'react';
import classnames from 'classnames';

export default class Modal extends React.Component {

    static PropTypes = {
        top: React.PropTypes.number,
        left: React.PropTypes.number,
        right: React.PropTypes.number,
        renderComponent: React.PropTypes.func.isRequired,
        closeOverlay: React.PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {

        };
    }

    componentWillEnter(callback) {

        window.chayns.showOverlay().then(() => {
            if(this.props.closeOverlay)
                this.props.closeOverlay()
        });

        this.setState({
            willEnter: true,
            willEnterActive: false,
            didEnter: false,
            willLeave: false,
            willLeaveActive: false,
            didLeave: false
        });

        window.setTimeout(() => {
            this.setState({
                willEnter: true,
                willEnterActive: true,
                didEnter: false,
                willLeave: false,
                willLeaveActive: false,
                didLeave: false
            });
        }, 100);

        window.setTimeout(() => {
            callback();
        }, 650);
    }

    componentDidEnter() {
        this.setState({
            willEnter: false,
            willEnterActive: false,
            didEnter: true,
            willLeave: false,
            willLeaveActive: false,
            didLeave: false
        });


        if(this._content) {
            const bottom = this._content.getBoundingClientRect().bottom;
            const height = document.body.getBoundingClientRect().height;
            const newPadding = bottom-height+25;

            if(bottom > height && document.body.style.paddingBottom < newPadding)
                document.body.style.paddingBottom = newPadding + 'px';
        }

    }

    componentWillLeave(callback) {
        this.setState({
            willEnter: false,
            willEnterActive: false,
            didEnter: false,
            willLeave: true,
            willLeaveActive: false,
            didLeave: false
        });

        window.setTimeout(() => {
            this.setState({
                willEnter: false,
                willEnterActive: false,
                didEnter: false,
                willLeave: false,
                willLeaveActive: true,
                didLeave: false
            });
        }, 100);

        window.setTimeout(() => {
            window.chayns.hideOverlay();
            callback();
        }, 650);
    }

    render() {

        const {top, left, right, renderComponent, closeOverlay} = this.props;
        const {willEnter, willEnterActive, willLeave, willLeaveActive, didEnter} = this.state;

        return (
            <span className={classnames('modal', {
                'modal--visible': didEnter,
                'modal--enter': willEnter,
                'modal--enter--active': willEnterActive,
                'modal--leave': willLeave,
                'modal--leave--active': willLeaveActive,
                'modal--left': (left > right),
                'modal--right': (left <= right)
            })}>
                <div className="modal--overlay"
                     onClick={closeOverlay} />
                <div className="modal--content" style={{
                    top: top,
                    left: (left > right) ? left : null,
                    right: (left <= right) ? right : null
                }} ref={(ref) => this._content = ref}>
                    {renderComponent({
                        visible: didEnter,
                        enter: willEnter,
                        enterActive: willEnterActive,
                        leave: willLeave,
                        leaveActive: willLeaveActive
                    })}
                </div>
            </span>
        );
    }
}