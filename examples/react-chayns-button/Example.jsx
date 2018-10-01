import React, { PureComponent } from 'react';

import { Button, ChooseButton } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import './example.scss';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="Button">
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        onClick={console.log}
                    >
                        Button
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        disabled
                    >
                        Disabled Button
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        style={{ backgroundColor: '#4c993d' }}
                    >

                        Green Button
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        disabled
                        style={{ backgroundColor: '#4c993d' }}
                    >
                        Green disabled Button
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        secondary
                    >
                        SecondaryButton
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        disabled
                        secondary
                    >
                        Disabled SecondaryButton
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        icon="fa-rocket"
                        onClick={console.log}
                    >
                        IconButton
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        disabled
                        icon="fa-rocket"
                    >
                        Disabled IconButton
                    </Button>
                </div>

                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <ChooseButton
                        onClick={(event) => {
                            console.log(event);
                        }}
                    >
                        ChooseButton
                    </ChooseButton>
                </div>

                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <ChooseButton
                        className="button--disabled"
                    >
                        Disabled ChooseButton
                    </ChooseButton>
                </div>

                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <ChooseButton
                        icon="ts-chayns"
                        onClick={console.log}
                    >
                        ChooseButton with icon
                    </ChooseButton>
                </div>

                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <ChooseButton
                        disabled
                        icon="ts-chayns"
                    >
                        Disabled ChooseButton with icon
                    </ChooseButton>
                </div>
            </ExampleContainer>
        );
    }
}
