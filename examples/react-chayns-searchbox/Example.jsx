import React, { useState } from 'react';
import SearchBox from '../../src/react-chayns-searchbox/component/SearchBox';
import Input from '../../src/react-chayns-input/component/Input';
import pizza from '../utils/exampleData/pizza';
import countries from '../utils/exampleData/countries';
import { fontSizes, fontSizesPx } from '../utils/exampleData/fontSizes';

const SearchBoxExample = () => {
    const [pizzaValue, setPizzaValue] = useState(null);
    const [fontSizeNumber, setFontSizeNumber] = useState(20);
    const [fontSizeString, setFontSizeString] = useState('20px');

    return (
        <div style={{ marginBottom: '500px' }}>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    placeholder="Select Pizza"
                    list={pizza}
                    onSelect={(value) => {
                        setPizzaValue(value.id);
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
                    stopPropagation
                    value={pizzaValue}
                    style={{ width: '100%' }}
                    dynamic
                    showListWithoutInput
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    list={pizza}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
                    defaultValue="2"
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    list={pizza}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    placeholder="Disabled"
                    list={pizza}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="id"
                    listValue="name"
                    disabled
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    placeholder="Land"
                    list={countries}
                    onSelect={(value) => {
                        console.log(value);
                    }}
                    listKey="code"
                    listValue="name"
                    design={Input.BORDER_DESIGN}
                    dynamic
                    style={{ width: '100%' }}
                    autoSelectFirst
                    showListWithoutInput
                    addInputToList
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    list={fontSizes}
                    onSelect={(value) => {
                        console.log(value);
                        setFontSizeNumber(value);
                        setFontSizeString(value + 'px');
                    }}
                    value={fontSizeNumber}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    style={{ width: '100%' }}
                    autoSelectFirst
                    highlightInputInResult={false}
                    showListWithoutInput
                    addInputToList
                    right={
                        <i
                            style={{ padding: '8px' }}
                            className="fa fa-chevron-down"
                        />
                    }
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <SearchBox
                    placeholder="Schriftgröße"
                    list={fontSizesPx}
                    onSelect={(value) => {
                        console.log(value);
                        setFontSizeNumber(value.substring(0, value.length - 2));
                        setFontSizeString(value);
                    }}
                    value={fontSizeString}
                    design={Input.BORDER_DESIGN}
                    dynamic
                    style={{ width: '100%' }}
                    autoSelectFirst
                    highlightInputInResult={false}
                    showListWithoutInput
                    addInputToList
                />
            </div>
        </div>
    );
};

export default SearchBoxExample;
