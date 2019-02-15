import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import ReceiverInput from '../../src/react-chayns-receiverinput/component/ReceiverInput';

export default class ReceiverInputExample extends PureComponent {
    render() {
        return (
            <ExampleContainer
                headline="ReceiverInput"
                id="react-chayns-receiverinput"
            >
                <ReceiverInput
                    onChosenReceiverChange={(chosenReceivers) => {
                        console.log(chosenReceivers);
                    }}
                    onGroupNameChange={(groupName) => {
                        console.log(groupName);
                    }}
                    groupNameEnabled
                    placeholder="Test me!"
                    maxReceiverCount={3}
                    canFindOwn
                />
            </ExampleContainer>
        );
    }
}
