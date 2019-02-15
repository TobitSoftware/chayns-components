import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import TagInput from '../../src/react-chayns-tag_input/component/TagInput';


export default class TagInputExample extends PureComponent {
    render() {
        return (
            <ExampleContainer
                headline="TagInput"
                id="react-chayns-tag_input"
            >
                <TagInput />
            </ExampleContainer>
        );
    }
}
