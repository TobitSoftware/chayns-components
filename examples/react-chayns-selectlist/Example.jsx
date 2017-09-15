import React from 'react';

import ExampleContainer from '../ExampleContainer';
import { SelectList, SelectItem } from '../../src/index';
import '../../src/react-chayns-selectlist/index.scss';

export default class Example extends React.Component {
    render() {
        const elements = [];

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
            <ExampleContainer headline="SelectList">
                <SelectList selectFirst className="hello world">
                    {
                        elements.map((element, index) => {
                            if(!element) return null;

                            const others = {
                                disabled: index === 0
                            };

                            return (
                                <SelectItem name="Hi" id={index} key={index} {...others} className="Hi">
                                    {element}
                                </SelectItem>
                            );
                        })
                    }
                </SelectList>
            </ExampleContainer>
        );
    }
}
