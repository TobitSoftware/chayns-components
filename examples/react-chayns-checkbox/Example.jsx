import React from 'react';

import { Checkbox } from '../../src/index';
import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';

export default function CheckboxExample() {
    return (
        <div>
            <div>
                <Checkbox
                    label="testlabel"
                    onChange={(value) => {
                        console.log(value);
                    }}
                    toggleButton
                    defaultChecked={false}
                    stopPropagation
                    id="chechboxId"
                />
            </div>

            <Checkbox
                onChange={(value) => {
                    console.log(value);
                }}
                checked
                disabled
                labelStyle={{ marginRight: '10px' }}
            >
                Enable xyz
            </Checkbox>

            <Tooltip
                content={{ text: 'Description' }}
                bindListeners
                position={3}
                minWidth={100}
            >
                <Checkbox
                    onChange={(value) => {
                        console.log(value);
                    }}
                    defaultChecked
                    dangerouslySetLabel={{ __html: '<b>Test</b>' }}
                />
            </Tooltip>
        </div>
    );
}
