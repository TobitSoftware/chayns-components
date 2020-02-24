/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SelectList, SelectListItem } from '../../src/index';

export default function SelectListExample() {
    const elements = [];

    elements.push(<div className="selectitem__content"> Intro </div>);

    elements.push(<div className="selectitem__content"> test </div>);

    elements.push(<div className="selectitem__content"> test2 </div>);

    elements.push(null);

    return (
        <div>
            <SelectList
                selectFirst
                key={1}
                // value={this.state.selectedId}
                className="hello world"
                onChange={(id, value) => {
                    console.log('change selectlist', {
                        id,
                        value,
                    });
                }}
            >
                {
                    elements.map((element, index) => {
                        if (!element) return null;

                        const others = {
                            disabled: index === 0,
                        };

                        // div to test if component is still working with other components between SelectList and SelectListItem
                        return (
                            <div>
                                <SelectListItem
                                    name="Hi"
                                    id={index}
                                    key={`SelectListItem${index}`}
                                    value={{ doubleIndex: index * 2 }}
                                    className="Hi"
                                    {...others}
                                >
                                    {element}
                                </SelectListItem>
                            </div>
                        );
                    })
                }
            </SelectList>
            <SelectList
                selectFirst
                key={2}
                // value={this.state.selectedId}
                className="hello world"
                onChange={(id, value) => {
                    console.log('change selectlist', {
                        id,
                        value,
                    });
                }}
            >
                {
                    elements.map((element, index) => {
                        if (!element) return null;

                        const others = {
                            disabled: index === 0,
                        };

                        return (
                            <SelectListItem
                                tooltipProps={{
                                    content: { text: 'TooltipText' },
                                    bindListeners: true,
                                }}
                                name="Hi"
                                id={index}
                                key={`SelectListItem${index}`}
                                value={{ doubleIndex: index * 2 }}
                                className="Hi"
                                {...others}
                            >
                                {element}
                            </SelectListItem>
                        );
                    })
                }
            </SelectList>
        </div>
    );
}
