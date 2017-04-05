import React from 'react';

import {Button, ChooseButton} from '../src/index';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Button
                    disabled={true}
                    onClick={(event) => {
                        window.chayns.dialog.alert(JSON.stringify(event));
                    }}
                >
                    Test
                </Button>


                <div style={{textAlign: 'center'}}>
                    <ChooseButton
                        onClick={(event) => {
                            console.log(event);
                        }}
                    >
                        Hallo
                    </ChooseButton>
                </div>

                <div style={{textAlign: 'center'}}>
                    <ChooseButton
                        style={{
                            marginTop: '15px'
                        }}
                        className="button--disabled"
                    >
                        Hallo
                    </ChooseButton>
                </div>
            </div>
        );
    }
}