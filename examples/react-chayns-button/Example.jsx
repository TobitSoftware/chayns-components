import React, { PureComponent } from 'react';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

import { Button, ChooseButton } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import './example.scss';

export default class ButtonExample extends PureComponent {
    render() {
        return (
            <ExampleContainer
                headline="Button"
                id="react-chayns-button"
            >
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        onClick={console.log}
                        stopPropagation
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
                        icon={faRocket}
                        onClick={console.log}
                    >
                        IconButton
                    </Button>
                </div>
                <div style={{ textAlign: 'center', margin: '5px' }}>
                    <Button
                        disabled
                        icon={faRocket}
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
