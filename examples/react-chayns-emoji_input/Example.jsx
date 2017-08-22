import React from 'react';

import { EmojiInput } from '../../src/index';
import '../../src/react-chayns-emoji_input/style.scss';

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
            <div>
                <EmojiInput
                    onInput={this.handleInput}
                    placeholder="Test me!"
                    id="emojiInput_1"
                    value={text}
                />
            </div>
        );
    }
}
