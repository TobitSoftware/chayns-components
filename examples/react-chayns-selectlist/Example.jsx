/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import { SelectList, SelectListItem } from '../../src/index';

export default function SelectListExample() {
    const [selectedId, setSelectedId] = useState(1);

    const elements = [];

    elements.push(<div className="selectitem__content"> Intro </div>);

    elements.push(<div className="selectitem__content"> test </div>);

    elements.push(<div className="selectitem__content"> test2 </div>);

    elements.push(null);

    return (
        <div>
            SelectFirst
            <SelectList
                selectFirst
                key={0}
                className="hello world"
                onChange={(id, value) => {
                    console.log('change selectlist', {
                        id,
                        value,
                    });
                    setSelectedId(id);
                }}
            >
                {elements.map((element, index) => {
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
                })}
            </SelectList>
            value (number)
            <SelectList
                key={1}
                value={selectedId}
                className="hello world"
                onChange={(id, value) => {
                    console.log('change selectlist', {
                        id,
                        value,
                    });
                    setSelectedId(id);
                }}
            >
                {elements.map((element, index) => {
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
                })}
            </SelectList>
            value (string)
            <SelectList
                selectFirst
                key={2}
                value={selectedId.toString()}
                className="hello world"
                onChange={(id, value) => {
                    console.log('change selectlist', {
                        id,
                        value,
                    });
                    setSelectedId(parseInt(id, 10));
                }}
            >
                {elements.map((element, index) => {
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
                            id={index.toString()}
                            key={`SelectListItem${index}`}
                            value={{ doubleIndex: index * 2 }}
                            className="Hi"
                            {...others}
                        >
                            {element}
                        </SelectListItem>
                    );
                })}
            </SelectList>
        </div>
    );
}
