import React, { Component } from 'react';

import { Button, ChooseButton } from '../../src/index';
import ExampleContainer from "../ExampleContainer";

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="Button">
                <Button
                    disabled
                    onClick={(event) => {
                        window.chayns.dialog.alert(JSON.stringify(event));
                    }}
                >
                    Test
                </Button>


                <div style={{ textAlign: 'center' }}>
                    <ChooseButton
                        onClick={(event) => {
                            console.log(event);
                        }}
                    >
                        Hallo
                    </ChooseButton>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <ChooseButton
                        style={{
                            marginTop: '15px'
                        }}
                        className="button--disabled"
                    >
                        Hallo
                    </ChooseButton>
                </div>
            </ExampleContainer>
        );
    }
}
