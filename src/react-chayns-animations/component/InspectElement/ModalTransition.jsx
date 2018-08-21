import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Modal from './Modal';

class ModalTransition extends Component {
    state = {};

    render() {
        return (
            <Transition
                timeout={650}
                mountOnEnter
                unmountOnExit
                appear
                {...this.props}
            >
                {status => (
                    <Modal
                        status={status}
                        {...this.props}
                    />
                )}
            </Transition>
        );
    }
}

export default ModalTransition;
