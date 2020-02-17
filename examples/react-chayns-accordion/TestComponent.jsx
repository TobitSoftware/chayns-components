import React, { Component } from 'react';

export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ value: 1 });
        }, 100);
    }

    render() {
        const { value } = this.state;
        return (<div>{value}</div>);
    }
}
