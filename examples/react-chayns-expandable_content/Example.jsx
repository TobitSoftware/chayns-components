import React, { Component } from 'react';

import ExampleContainer from '../ExampleContainer';
import ExpandableContent from '../../src/react-chayns-expandable_content/component/ExpandableContent';
import { Button } from '../../src';

export default class Example extends Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);

        this.open = this.setOpen.bind(this, true);
        this.close = this.setOpen.bind(this, false);
        this.toggle = this.toggle.bind(this);
    }

    setOpen(open) {
        this.setState({
            open,
        });
    }

    toggle() {
        const { open } = this.state;

        this.setOpen(!open);
    }

    render() {
        const { open } = this.state;

        return(
            <ExampleContainer headline="ExpandableContent">
                <div>
                    <Button onClick={this.toggle}>Toggle</Button>
                    {' '}
                    <Button onClick={this.open}>Open</Button>
                    {' '}
                    <Button onClick={this.close}>Close</Button>
                </div>
                <ExpandableContent
                    open={open}
                >
                    {'Test opened'}
                </ExpandableContent>
            </ExampleContainer>
        );
    }
}
