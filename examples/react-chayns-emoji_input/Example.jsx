import React from 'react';

import { EmojiInput } from '../../src/index';
import '../../src/react-chayns-emoji_input/index.scss';
import ExampleContainer from '../ExampleContainer';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            text: ''
        };
    }

    handleInput = (event) => {
        this.setState({
            text: event.target.pureInnerText
        });
    };

    render() {
        const { text } = this.state;

        return(
            <ExampleContainer headline="EmojiInput">
                <EmojiInput
                    onInput={this.handleInput}
                    placeholder="Test me!"
                    id="emojiInput_1"
                    value={text}
                />
            </ExampleContainer>
        );
    }
}
