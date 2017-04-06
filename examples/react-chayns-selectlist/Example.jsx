import React from 'react';

import {SelectList, SelectItem} from '../../src/react-chayns-selectlist/index';
import '../../src/react-chayns-selectlist/index.scss';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {

        let elements = [];

        elements.push(<div className="selectitem__content">
            Intro
        </div>);

        elements.push(<div className="selectitem__content">
            test
        </div>);

        elements.push(<div className="selectitem__content">
                test2
            </div>);

        elements.push(null);

        return(

            <SelectList selectFirst={true} className="hello world">
                {
                    elements.map((element, index) => {
                        if(!element) return null;

                        let others = {
                            disabled: index===0
                        };

                        return (
                            <SelectItem name="Hi" id={index} key={index} {...others} className="Hi">
                                {element}
                            </SelectItem>
                        )
                    })
                }
            </SelectList>
        );
    }
}