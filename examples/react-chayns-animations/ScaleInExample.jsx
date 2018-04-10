import React, { Component } from 'react';
import animate, { SCALE_IN } from '../../src/react-chayns-animations/component/animate';

@animate(SCALE_IN)
export default class ScaleInExample extends Component {
    static propTypes = {};

    render() {
        console.log(this.props);

        return (
            <div
                style={(this.props.animationClone) ? this.props.style : {
                    width: '200px',
                    background: '#FF0000',
                }}
            >
                Test
            </div>
        );
    }
}
