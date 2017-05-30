import React from 'react';

import {EmojiInput} from '../../src/react-chayns-emojiInput/index';
import '../../src/react-chayns-emojiInput/style.scss';

export default class Example extends React.Component {

    constructor(){
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
        const {text} = this.state;

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