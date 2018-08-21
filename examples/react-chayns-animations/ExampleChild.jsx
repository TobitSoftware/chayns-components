import React, { Component } from 'react';
import classnames from 'classnames';
import './ExampleChild.scss';

let id = 0;

export default class ExampleChild extends Component {
    constructor() {
        super();

        this.id = id;

        id += 1;
    }

    render() {
        // console.log(this.id, this.props.enter, this.props.enterActive, this.props.leave, this.props.leaveActive, this.props.visible);

        return(
            <span
                style={{
                    display: 'inline-block',
                    minHeight: '250px',
                    backgroundColor: 'white'
                }}
                onClick={this.props.openOverlay}
                className={classnames('example-child', {
                    enter: this.props.enter,
                    enterActive: this.props.enterActive,
                    visible: this.props.visible,
                    leave: this.props.leave,
                    leaveActive: this.props.leaveActive
                })}
            >
                {this.props.visible ? (
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                ) : (
                    <p>
                        <img
                            src="https://iisfs-shop.tobit.com/0/1e4e8073-7576-438a-8d2e-1fd2d8972e71.jpg"
                            style={{ maxWidth: '100%' }}
                        />
                        {this.props.name}
                    </p>
                )}
            </span>
        );
    }
}