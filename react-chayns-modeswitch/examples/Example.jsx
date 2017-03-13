import React from 'react';

import {ModeSwitch, Mode} from '../src/index';

import ExampleDecorator from './ExampleDecorator';

export default class Example extends React.Component {
    constructor() {
        super();

        window.setTimeout(() => {
            ModeSwitch.init({
                groups: [{
                    id: 1,
                    uacIds: [1, 34542],
                    name: 'Chayns Manager'
                }],
                save: true,
                onChange: (data) => {
                    console.log('mode', data);
                }
            });
        }, 1000);
    }

    render() {
        return(
            <div>
                <Mode mode={0}>
                    <div>
                        Hello world
                    </div>
                </Mode>

                <Mode mode={1}>
                    <div>
                        Administration
                    </div>

                    <div>
                        Test
                    </div>

                    <div>
                        Hi
                    </div>
                </Mode>

                <Mode modes={[0,1]}>
                    <div>
                        <button onClick={this.getModeSwitchStatus}>ModeSwitch Status</button>
                    </div>
                </Mode>

                <ExampleDecorator test="1" hallo="hi" />
            </div>
        );
    }

    getModeSwitchStatus = () => {
        window.chayns.dialog.alert(JSON.stringify(ModeSwitch.getCurrentMode(), null, 3));
    };
}