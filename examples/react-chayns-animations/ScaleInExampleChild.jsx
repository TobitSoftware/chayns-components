import React, { Component } from 'react';
import PropTypes from 'prop-types';

import animate, { SCALE_IN } from '../../src/react-chayns-animations/component/animate';

class ScaleInExampleChild extends Component {
    static propTypes = {
        showOverlay: PropTypes.func.isRequired,
        hideOverlay: PropTypes.func.isRequired,
        animationClone: PropTypes.bool.isRequired,
    };

    render() {
        const { showOverlay, hideOverlay, animationClone } = this.props;

        if(animationClone) {
            return (
                <div
                    style={{
                        background: '#00FF00',
                    }}
                >
                    <button onClick={hideOverlay}>Hide</button>
                </div>
            );
        }

        return (
            <div
                style={{
                    width: '200px',
                    background: '#FF0000',
                }}
            >
                <button onClick={showOverlay}>Show</button>
            </div>
        );
    }
}

export default animate(SCALE_IN)(ScaleInExampleChild);
